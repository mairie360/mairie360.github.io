export function createSpriteMesh(width: number, height: number, splitAt?: number, step = 4) {
  const points: number[] = [];
  const indices: number[] = [];
  const edges = splitAt === undefined ? [0, width] : [0, splitAt, width];

  for (let part = 0; part < edges.length - 1; part++) {
    const left = edges[part], right = edges[part + 1];
    const columns = Math.ceil((right - left) / step) + 1;
    const rows = Math.ceil(height / step) + 1;
    const first = points.length / 3;
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        points.push(Math.min(left + column * step, right), Math.min(row * step, height), part);
      }
    }
    for (let row = 0; row < rows - 1; row++) {
      for (let column = 0; column < columns - 1; column++) {
        const top = first + row * columns + column;
        indices.push(top, top + 1, top + columns, top + 1, top + columns + 1, top + columns);
      }
    }
  }

  return { points: new Float32Array(points), indices: new Uint16Array(indices) };
}
