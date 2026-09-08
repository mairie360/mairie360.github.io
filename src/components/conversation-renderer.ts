import { createSpriteMeshRenderer, type SpriteMeshRenderer } from "./sprite-mesh-renderer";

const vertexSource = `
  precision highp float;
  attribute vec2 point;
  uniform float phase;
  varying vec2 uv;

  vec2 rotateAround(vec2 p, vec2 pivot, float angle) {
    float c = cos(angle), s = sin(angle);
    vec2 v = p - pivot;
    return pivot + vec2(c * v.x - s * v.y, s * v.x + c * v.y);
  }

  void main() {
    uv = point / vec2(256.0, 192.0);
    float person = step(128.0, point.x);
    float turn = sin(phase);
    float speaking = smoothstep(0.1, 0.75, mix(turn, -turn, person));
    float listening = smoothstep(0.1, 0.75, mix(-turn, turn, person));
    float emphasis = speaking * (0.65 + 0.35 * sin(phase * 4.0 + person));
    float direction = mix(-1.0, 1.0, person);
    float deg = 0.01745329252;
    vec2 shoulder = mix(vec2(105.0, 54.0), vec2(156.0, 55.0), person);
    vec2 elbow = mix(vec2(108.0, 73.0), vec2(153.0, 74.0), person);
    float lowerWeight = mix(smoothstep(108.0, 118.0, point.x), 1.0 - smoothstep(142.0, 154.0, point.x), person);
    vec2 hand = rotateAround(point, elbow, direction * 20.0 * emphasis * deg);
    vec2 arm = rotateAround(mix(point, hand, lowerWeight), shoulder, direction * 10.0 * emphasis * deg);
    float sideWeight = mix(smoothstep(99.0, 107.0, point.x), 1.0 - smoothstep(154.0, 162.0, point.x), person);
    float armWeight = sideWeight * smoothstep(47.0, 57.0, point.y) * (1.0 - smoothstep(81.0, 94.0, point.y));
    vec2 position = mix(point, arm, armWeight);

    vec2 neck = mix(vec2(92.0, 45.0), vec2(168.0, 45.0), person);
    float nod = listening * sin(phase * 6.0 + person * 0.7);
    vec2 head = rotateAround(point, neck, (2.5 * nod + direction * speaking) * deg);
    head.y += 0.8 * listening * (1.0 - cos(phase * 6.0 + person * 0.7));
    position = mix(position, head, 1.0 - smoothstep(39.0, 50.0, point.y));

    // A small lean engages the upper body while both feet stay planted.
    vec2 support = mix(vec2(88.0, 163.0), vec2(168.0, 163.0), person);
    float lean = -direction * (0.8 * speaking + 0.25 * sin(phase * 2.0 + person)) * deg;
    vec2 body = rotateAround(position, support, lean);
    position = mix(position, body, 1.0 - smoothstep(95.0, 156.0, point.y));
    gl_Position = vec4(position.x / 128.0 - 1.0, 1.0 - position.y / 96.0, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform sampler2D characters;
  varying vec2 uv;
  void main() {
    // Use each speaker's open-hand pose from the existing four-cell atlas.
    float cell = step(0.5, uv.x) * 2.0;
    gl_FragColor = texture2D(characters, vec2((cell + uv.x) / 4.0, uv.y));
  }
`;

export function createConversationRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement): SpriteMeshRenderer | null {
  return createSpriteMeshRenderer(canvas, image, { vertexSource, fragmentSource, width: 256, height: 192 });
}
