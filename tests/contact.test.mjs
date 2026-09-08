import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Module from "node:module";
import ts from "typescript";

// Exercise the same TypeScript module used by the form, without a mail service.
const filename = fileURLToPath(new URL("../src/lib/contact.ts", import.meta.url));
const loaded = new Module(filename);
loaded._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { sendContact, validateContact, contactEndpoint } = loaded.exports;
const fields = { name: "  Léa Martin  ", email: "  lea@example.com  ", message: "  Bonjour, je souhaite découvrir le projet.  " };

test("invalid or whitespace-only fields cannot trigger a request", async () => {
  const invalid = { name: "  ", email: "lea\r\n@example.com", message: "   " };
  assert.deepEqual(Object.keys(validateContact(invalid)), ["name", "email", "message"]);
  let called = false;
  await assert.rejects(sendContact(invalid, async () => { called = true; }));
  assert.equal(called, false);
  assert.ok(validateContact({ ...fields, message: "x".repeat(5001) }).message);
});

test("a confirmed request uses the project destination and preserves the reply address", async () => {
  for (const success of [true, "true"]) {
    await sendContact(fields, async (url, options) => {
      assert.equal(url, contactEndpoint);
      assert.equal(url, "https://formsubmit.co/ajax/mairie360@gmail.com");
      assert.equal(options.method, "POST");
      assert.equal(options.credentials, "omit");
      const body = JSON.parse(options.body);
      assert.equal(body.email, "lea@example.com");
      assert.equal(body.name, "Léa Martin");
      assert.equal(body.message, fields.message.trim());
      assert.equal(body._cc, undefined);
      return Response.json({ success });
    });
  }
});

test("provider refusals and network errors never report a successful send", async () => {
  const failures = [
    async () => Response.json({ success: true }, { status: 503 }),
    async () => Response.json({ success: false }),
    async () => Response.json({ success: "false" }),
    async () => Response.json({ message: "Activation required" }),
    async () => new Response("not JSON"),
    async () => { throw new TypeError("Failed to fetch"); },
  ];
  for (const transport of failures) await assert.rejects(sendContact(fields, transport));
});

test("a stalled request is aborted after twenty seconds", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  let signal;
  const result = sendContact(fields, async (_url, options) => {
    signal = options.signal;
    return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(new Error("timeout")), { once: true }));
  });
  const rejected = assert.rejects(result, /timeout/);
  context.mock.timers.tick(20_000);
  await rejected;
  assert.equal(signal.aborted, true);
});
