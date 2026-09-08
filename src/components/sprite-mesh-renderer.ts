export type SpriteMeshRenderer = { draw: (phase: number) => void; dispose: () => void };

type SpriteMeshOptions = {
  vertexSource: string;
  fragmentSource: string;
  width: number;
  height: number;
  configure?: (gl: WebGLRenderingContext, program: WebGLProgram) => void;
};

export function createSpriteMeshRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement, options: SpriteMeshOptions): SpriteMeshRenderer | null {
  const { vertexSource, fragmentSource, width, height } = options;
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, depth: false });
  if (!gl) return null;
  const program = gl.createProgram(), buffer = gl.createBuffer(), texture = gl.createTexture();
  const shaders: WebGLShader[] = [];
  const dispose = () => {
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
  if (!program || !buffer || !texture) { dispose(); return null; }
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
    const shader = gl.createShader(type);
    if (!shader) { dispose(); return null; }
    shaders.push(shader);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  gl.useProgram(program);
  const points: number[] = [];
  for (let y = 0; y < height; y += 2) for (let x = 0; x < width; x += 2) {
    points.push(x,y, x+2,y, x,y+2, x+2,y, x+2,y+2, x,y+2);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  const point = gl.getAttribLocation(program, "point");
  gl.enableVertexAttribArray(point); gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(gl.getUniformLocation(program, "characters"), 0);
  options.configure?.(gl, program);
  gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const phaseLocation = gl.getUniformLocation(program, "phase");
  const vertexCount = points.length / 2;
  return {
    draw: phase => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(phaseLocation, phase);
      gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    },
    dispose,
  };
}
