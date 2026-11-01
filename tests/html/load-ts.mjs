import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Module from "node:module";
import ts from "typescript";

/** Transpiles a self-contained module of src/ and returns its exports (same loader as tests/*.test.mjs). */
export function loadTs(relativeToRepo) {
  const filename = fileURLToPath(new URL(`../../${relativeToRepo}`, import.meta.url));
  const loaded = new Module(filename);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return loaded.exports;
}
