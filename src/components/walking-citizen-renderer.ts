export type WalkingRenderer = { draw: (phase: number) => void; dispose: () => void };

const vertexSource = `
  precision highp float;
  attribute vec2 point;
  uniform float phase;
  uniform float facing;
  uniform vec2 shoulders[2];
  uniform vec2 elbows[2];
  uniform vec2 hips[2];
  uniform vec2 knees[2];
  uniform float centre;
  varying vec2 uv;

  vec2 rotateAround(vec2 p, vec2 pivot, float angle) {
    float c = cos(angle), s = sin(angle);
    vec2 v = p - pivot;
    return pivot + vec2(c * v.x - s * v.y, s * v.x + c * v.y);
  }

  vec2 limb(vec2 p, vec2 root, vec2 joint, float upper, float lower) {
    float bend = smoothstep(joint.y - 7.0, joint.y + 7.0, p.y);
    vec2 flexed = mix(p, rotateAround(p, joint, lower), bend);
    return rotateAround(flexed, root, upper);
  }

  void main() {
    uv = point / vec2(128.0, 192.0);
    float stride = sin(phase);
    float deg = 0.01745329252;
    // Lift the returning foot as it passes the planted leg, a quarter cycle
    // after maximum stride. This follows a loop instead of retracing one pose.
    float leftLift = pow(max(0.0, -cos(phase) * facing), 2.0);
    float rightLift = pow(max(0.0, cos(phase) * facing), 2.0);
    vec2 leftLeg = limb(point, hips[0], knees[0], (-5.0 + 8.0 * stride) * deg, facing * 18.0 * leftLift * deg) + vec2(2.0, 0.0);
    vec2 rightLeg = limb(point, hips[1], knees[1], (5.0 - 8.0 * stride) * deg, facing * 18.0 * rightLift * deg) - vec2(2.0, 0.0);
    float legSide = smoothstep(centre - 3.0, centre + 3.0, point.x);
    float legs = smoothstep(100.0, 113.0, point.y);
    vec2 position = mix(point, mix(leftLeg, rightLeg, legSide), legs);

    vec2 leftArm = limb(point, shoulders[0], elbows[0], (-14.0 - 16.0 * stride) * deg, -5.0 * (1.0 + stride) * deg);
    vec2 rightArm = limb(point, shoulders[1], elbows[1], (14.0 + 16.0 * stride) * deg, 5.0 * (1.0 - stride) * deg);
    leftArm.y -= 4.0 * stride;
    rightArm.y += 4.0 * stride;
    float armHeight = smoothstep(46.0, 61.0, point.y) * (1.0 - smoothstep(103.0, 113.0, point.y));
    float leftWeight = (1.0 - smoothstep(43.0, 53.0, point.x)) * armHeight;
    float rightWeight = smoothstep(72.0, 82.0, point.x) * armHeight;
    position = mix(position, leftArm, leftWeight);
    position = mix(position, rightArm, rightWeight);
    position.y -= 0.55 * (1.0 + cos(phase * 2.0));
    gl_Position = vec4(position.x / 64.0 - 1.0, 1.0 - position.y / 96.0, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform sampler2D characters;
  uniform float character;
  varying vec2 uv;
  void main() {
    gl_FragColor = texture2D(characters, vec2((character + uv.x) / 3.0, uv.y));
  }
`;

// A connected mesh keeps skin and clothing joined as shoulders, elbows and
// knees flex. All variants share one atlas and the same continuous gait.
const rigs = [
  { shoulders: [47,54,77,54], elbows: [38,78,85,79], hips: [53,99,70,99], knees: [49,129,73,129], centre: 62 },
  { shoulders: [47,53,78,53], elbows: [37,76,85,76], hips: [53,100,72,100], knees: [50,133,75,133], centre: 63 },
  { shoulders: [49,52,79,52], elbows: [40,74,88,74], hips: [56,99,74,99], knees: [54,132,78,132], centre: 66 },
];

export function createWalkingRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement, character: number): WalkingRenderer | null {
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
  for (let y = 0; y < 192; y += 2) for (let x = 0; x < 128; x += 2) {
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
  gl.uniform1f(gl.getUniformLocation(program, "character"), character);
  gl.uniform1f(gl.getUniformLocation(program, "facing"), character === 0 ? 1 : -1);
  const rig = rigs[character];
  for (const joint of ["shoulders", "elbows", "hips", "knees"] as const) {
    gl.uniform2fv(gl.getUniformLocation(program, `${joint}[0]`), rig[joint]);
  }
  gl.uniform1f(gl.getUniformLocation(program, "centre"), rig.centre);
  gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const phaseLocation = gl.getUniformLocation(program, "phase");
  return {
    draw: phase => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(phaseLocation, phase);
      gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
    },
    dispose,
  };
}
