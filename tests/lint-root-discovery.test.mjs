import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { ESLint } from "eslint";

const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("eslint-config-next"));
const { getRootDirs } = nextRequire("@next/eslint-plugin-next/dist/utils/get-root-dirs");

async function fixture(context) {
  const root = await mkdtemp(path.join(tmpdir(), "mairie360-lint-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const app = path.join(root, "packages", "mairie");
  const shared = path.join(root, "packages", "shared");
  await mkdir(path.join(app, "app", "projects", "[projectId]"), { recursive: true });
  await mkdir(shared, { recursive: true });
  await writeFile(path.join(app, "app", "projects", "[projectId]", "page.tsx"), "export default function Page() { return null; }");
  await writeFile(path.join(root, "packages", "README.md"), "Directory filtering fixture");
  return { root, app, shared };
}

test("Next lint root discovery preserves literal directories, glob patterns and directory filtering", async (context) => {
  const { root, app, shared } = await fixture(context);
  const resolve = (rootDir) => getRootDirs({ cwd: root, getCwd: () => root, settings: { next: { rootDir } } }).sort();
  assert.deepEqual(resolve(app), [app]);
  assert.deepEqual(resolve("./"), [process.cwd()]);
  assert.deepEqual(resolve(`${root}/packages/*`), [app, shared].sort());
  assert.deepEqual(resolve(`${path.relative(process.cwd(), root)}/packages/*`), [app, shared].sort());
  assert.deepEqual(resolve([app, shared]), [app, shared].sort());
  assert.deepEqual(resolve(app.replaceAll("/", "\\")), [app]);
});

test("Next lint still checks App Router dynamic links and ESLint 9 document violations", async (context) => {
  const { app } = await fixture(context);
  const eslint = new ESLint({ overrideConfig: { settings: { next: { rootDir: app } } } });
  const [navigation] = await eslint.lintText(
    'export default function Page() { return <a href="/projects/pilote">Projects</a>; }',
    { filePath: "src/app/lint-fixture.tsx" },
  );
  assert.ok(navigation.messages.some(({ ruleId }) => ruleId === "@next/next/no-html-link-for-pages"));
  const [document] = await eslint.lintText(
    'import Document, { Html, Head } from "next/document"; export default class Page extends Document { render() { return <Html><Head /><Head /></Html>; } }',
    { filePath: "src/pages/_document.tsx" },
  );
  assert.ok(document.messages.some(({ ruleId }) => ruleId === "@next/next/no-duplicate-head"));
  const [font] = await eslint.lintText(
    'export default function Page() { return <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />; }',
    { filePath: "src/pages/lint-fixture.tsx" },
  );
  assert.ok(font.messages.some(({ ruleId }) => ruleId === "@next/next/no-page-custom-font"));
});
