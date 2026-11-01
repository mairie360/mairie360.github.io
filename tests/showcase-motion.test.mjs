import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Module from "node:module";
import ts from "typescript";

// Same loader as the other tests: transpile a self-contained module and run it.
function load(path) {
  const filename = fileURLToPath(new URL(path, import.meta.url));
  const loaded = new Module(filename);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return loaded.exports;
}

const board = load("../src/lib/modules-board.ts");
const { headerVisibility } = load("../src/lib/header-visibility.ts");
const { copyText } = load("../src/lib/copy-text.ts");

test("MAIR-742: the board starts from thirteen tools, each replaced by one of the six modules", () => {
  assert.equal(board.boardTools.length, 13);
  assert.equal(board.moduleNames.length, 6);
  const counts = board.moduleNames.map((_, module) => board.boardTools.filter(tool => tool.module === module).length);
  assert.deepEqual(counts, [2, 2, 3, 2, 2, 2]);
  assert.equal(new Set(board.boardTools.map(tool => tool.task)).size, 13);
});

test("MAIR-742: tools fly to the centre of their module with the prototype stagger", () => {
  // "Les post-it" (170×78 card at 40,40) lands on the dashboard tile centre (300,186).
  assert.deepEqual(board.toolOffset(board.boardTools[0]), [175, 107]);
  // Sans → Avec: 30 ms × rank. Avec → Sans: reversed and faster, 15 ms × (12 − rank).
  assert.equal(board.toolDelay(0, true), 0);
  assert.equal(board.toolDelay(12, true).toFixed(2), "0.36");
  assert.equal(board.toolDelay(0, false).toFixed(2), "0.18");
  assert.equal(board.toolDelay(12, false), 0);
  // Checked tasks wait for the tools: 400 ms + 30 ms × rank, and leave without delay.
  assert.equal(board.taskDelay(2, true).toFixed(2), "0.46");
  assert.equal(board.taskDelay(2, false), 0);
});

test("MAIR-742: the legend and the heading follow the board state", () => {
  assert.deepEqual(board.boardHint(false, -1), { title: "Survolez un outil", text: "pour voir quel module le remplace." });
  assert.equal(board.boardHint(false, 3).title, "WhatsApp perso, le fax → Messagerie.");
  assert.equal(board.boardHint(true, -1).title, "Cliquez sur un module");
  assert.equal(board.boardHint(true, 1).text,
    "Chaque projet suivi par toute l’équipe concernée. Remplace : le classeur bleu, la clé usb.");
  assert.equal(board.boardCopy(false).title, "Une journée en mairie, c’est souvent treize outils.");
  assert.equal(board.boardCopy(true).title, "Six modules qui se parlent, dans un seul espace.");
});

test("MAIR-742: card tints match the prototype colors", () => {
  assert.equal(board.tint("#3C4F76", 0.9), "rgb(236,237,241)");
  assert.equal(board.tint("#3C4F76", -0.3), "rgb(42,55,83)");
});

test("MAIR-742: the band stays at the top on desktop and only comes back on phones when scrolling up", () => {
  // Near the top of the page.
  assert.equal(headerVisibility({ y: 40, lastY: 0, phone: false, current: true }), true);
  assert.equal(headerVisibility({ y: 40, lastY: 0, phone: true, current: true }), false);
  // Scrolling down hides it, scrolling up shows it again, on both layouts.
  for (const phone of [false, true]) {
    assert.equal(headerVisibility({ y: 600, lastY: 500, phone, current: true }), false);
    assert.equal(headerVisibility({ y: 500, lastY: 600, phone, current: false }), true);
  }
  // Moves of 4 px or less keep the current state.
  assert.equal(headerVisibility({ y: 503, lastY: 500, phone: false, current: true }), true);
  assert.equal(headerVisibility({ y: 497, lastY: 500, phone: false, current: false }), false);
});

test("MAIR-742: copying the address uses the clipboard, then falls back without throwing", async () => {
  const written = [];
  await copyText("mairie360@gmail.com", { clipboard: { writeText: async text => { written.push(text); } } });
  assert.deepEqual(written, ["mairie360@gmail.com"]);

  const calls = [];
  const area = { style: {}, setAttribute: () => {}, select: () => calls.push("select") };
  const doc = {
    createElement: () => area,
    body: { appendChild: () => calls.push("append"), removeChild: () => calls.push("remove") },
    execCommand: command => calls.push(command),
  };
  await copyText("mairie360@gmail.com", { clipboard: { writeText: async () => { throw new Error("denied"); } }, document: doc });
  assert.equal(area.value, "mairie360@gmail.com");
  assert.deepEqual(calls, ["append", "select", "copy", "remove"]);

  await assert.doesNotReject(copyText("x", {}));
});
