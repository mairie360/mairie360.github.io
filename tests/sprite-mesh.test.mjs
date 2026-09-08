import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Module from "node:module";
import ts from "typescript";

const filename = fileURLToPath(new URL("../src/components/sprite-mesh.ts", import.meta.url));
const loaded = new Module(filename);
loaded._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { createSpriteMesh } = loaded.exports;

test("indexed sprites cover the whole atlas cell without crossing the speakers' seam", () => {
  for (const [width, height, split] of [[128, 192], [256, 192, 132], [129, 193, 65]]) {
    const { points, indices } = createSpriteMesh(width, height, split);
    let area = 0;
    for (let i = 0; i < indices.length; i += 3) {
      const vertices = [...indices.slice(i, i + 3)].map(index => {
        assert.ok(index < points.length / 3);
        return [...points.slice(index * 3, index * 3 + 3)];
      });
      const [a, b, c] = vertices;
      const triangleArea = ((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
      assert.ok(triangleArea > 0, "triangles retain their winding and never collapse");
      area += triangleArea;
      for (const [x, y, part] of vertices) {
        assert.ok(x >= 0 && x <= width && y >= 0 && y <= height);
        assert.equal(part, a[2], "one triangle must only follow one character's pose");
        if (split !== undefined) assert.ok(part === 0 ? x <= split : x >= split);
      }
    }
    assert.equal(area, width * height);
    assert.ok(points.length / 3 < 4000, "each sprite stays within the vertex budget");
  }
});
