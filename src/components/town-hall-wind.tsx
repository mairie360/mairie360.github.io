"use client";

import { useEffect, useRef, useState } from "react";
import { createSpriteMesh } from "./sprite-mesh";
import styles from "./town-hall-scene.module.css";

// Coordinates refer to the original 1536 × 1024 illustration. Sampling one
// displaced plate avoids the doubled silhouettes of moving cutouts over trees.
// Compute wind on a fine grid, then interpolate it instead of repeating the
// trigonometry for every pixel in the canvas.
const vertexSource = `
  precision highp float;
  attribute vec2 point;
  uniform float time;
  varying vec2 uv;
  varying vec2 windUv;

  vec2 foliage(vec2 p, vec2 centre, vec2 radius, float root, float phase) {
    float edge = 1.0 - smoothstep(0.78, 1.08, length((p - centre) / radius));
    float tip = clamp((root - p.y) / (root - centre.y + radius.y), 0.0, 1.0);
    float gust = sin(time * 1.35 + phase) + 0.35 * sin(time * 2.7 + phase);
    float flutter = sin(p.y * 0.055 + time * 3.0 + phase);
    return edge * tip * vec2(8.0 * gust + 1.5 * flutter, 1.4 * flutter);
  }

  void main() {
    vec2 p = point;
    uv = point / vec2(1536.0, 1024.0);
    gl_Position = vec4(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, 0.0, 1.0);
    if (p.y > 700.0 || p.y < 96.0 || p.x < 180.0 || p.x > 1340.0
      || (p.x > 596.0 && p.x < 1046.0 && p.y > 224.0 && p.y < 700.0)) {
      windUv = uv;
      return;
    }
    vec2 drift = vec2(0.0);
    // Fade to zero before the rooflines, trunks and masonry.
    float leftRoof = 1.0 - smoothstep(418.0 - (p.x - 440.0) * 0.24, 429.0 - (p.x - 440.0) * 0.24, p.y);
    drift += foliage(p, vec2(407.0, 302.0), vec2(112.0, 150.0), 455.0, 0.0) * leftRoof;
    drift += foliage(p, vec2(280.0, 413.0), vec2(61.0, 69.0), 495.0, 0.7);
    drift += foliage(p, vec2(554.0, 320.0), vec2(62.0, 68.0), 390.0, 1.4) * (1.0 - smoothstep(590.0, 601.0, p.x));
    float rightWall = max(1.0 - smoothstep(279.0, 293.0, p.y), smoothstep(1040.0, 1052.0, p.x));
    drift += foliage(p, vec2(1082.0, 310.0), vec2(84.0, 125.0), 445.0, 1.1) * rightWall;
    float rightRoof = 1.0 - smoothstep(446.0 + (p.x - 1110.0) * 0.33, 460.0 + (p.x - 1110.0) * 0.33, p.y);
    drift += foliage(p, vec2(1210.0, 366.0), vec2(112.0, 130.0), 494.0, 1.9) * rightRoof;
    drift += foliage(p, vec2(1270.0, 549.0), vec2(61.0, 84.0), 657.0, 2.4) * smoothstep(1220.0, 1242.0, p.x);
    if (p.x > 596.0 && p.x < 1046.0 && p.y > 224.0 && p.y < 700.0) drift = vec2(0.0);
    if (p.x > 280.0 && p.x < 596.0 && p.y > 485.0 && p.y < 660.0) drift = vec2(0.0);
    if (p.x > 928.0 && p.x < 1224.0 && p.y > 495.0 && p.y < 710.0) drift = vec2(0.0);

    windUv = (p + drift) / vec2(1536.0, 1024.0);
  }
`;

const fragmentSource = `
  precision highp float;
  uniform sampler2D illustration;
  uniform float time;
  varying vec2 uv;
  varying vec2 windUv;
  void main() {
    vec2 p = uv * vec2(1536.0, 1024.0);
    // Only the small flag needs per-pixel ripples; its mast stays fixed.
    if (p.x > 794.0 && p.x < 864.0 && p.y > 102.0 && p.y < 183.0) {
      float flag = smoothstep(794.0, 800.0, p.x) * (1.0 - smoothstep(855.0, 864.0, p.x));
      flag *= smoothstep(102.0, 110.0, p.y) * (1.0 - smoothstep(172.0, 183.0, p.y));
      float freeEdge = clamp((p.x - 793.0) / 60.0, 0.0, 1.0);
      float ripple = sin(time * 3.7 - (p.x - 793.0) * 0.095);
      vec2 drift = flag * freeEdge * vec2(1.6 * sin(time * 2.5), 6.0 * ripple);
      gl_FragColor = texture2D(illustration, (p + drift) / vec2(1536.0, 1024.0));
      return;
    }
    // Keep the architecture fixed even where a grid cell straddles its outline.
    bool masonry = (p.x > 596.0 && p.x < 1046.0 && p.y > 224.0 && p.y < 700.0)
      || (p.x > 280.0 && p.x < 596.0 && p.y > 485.0 && p.y < 660.0)
      || (p.x > 928.0 && p.x < 1224.0 && p.y > 495.0 && p.y < 710.0);
    gl_FragColor = texture2D(illustration, masonry ? uv : windUv);
  }
`;

type Renderer = { draw: (time: number) => void; dispose: () => void };

function createRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement): Renderer | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
  if (!gl) return null;
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const texture = gl.createTexture();
  const shaders: WebGLShader[] = [];
  const dispose = () => {
    shaders.forEach((shader) => gl.deleteShader(shader));
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteBuffer(indexBuffer);
    gl.deleteProgram(program);
  };
  if (!program || !buffer || !indexBuffer || !texture) { dispose(); return null; }

  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
    const shader = gl.createShader(type);
    if (!shader) { dispose(); return null; }
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  gl.useProgram(program);
  const { points, indices } = createSpriteMesh(1536, 1024, undefined, 16);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "point");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 12, 0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(gl.getUniformLocation(program, "illustration"), 0);
  const timeLocation = gl.getUniformLocation(program, "time");
  return {
    draw: (time) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    },
    dispose,
  };
}

export function TownHallWind({ src, paused }: { src: string; paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<Renderer | null>(null);
  const elapsed = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const element = canvas.current;
    const handleContextLost = () => setReady(false);
    element?.addEventListener("webglcontextlost", handleContextLost);
    const resize = () => {
      if (!element) return;
      const width = Math.min(1536, Math.max(384, Math.round(element.clientWidth * Math.min(window.devicePixelRatio, 2))));
      if (element.width === width) return;
      element.width = width;
      element.height = Math.round(width / 1.5);
      renderer.current?.draw(elapsed.current);
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (element) observer.observe(element);
    const image = new window.Image();
    image.src = src;
    image.decode().then(() => {
      if (!active || !canvas.current) return;
      renderer.current = createRenderer(canvas.current, image);
      if (renderer.current) {
        renderer.current.draw(elapsed.current);
        setReady(true);
      }
    }).catch(() => { /* The image beneath the canvas remains the fallback. */ });
    return () => {
      active = false;
      observer.disconnect();
      element?.removeEventListener("webglcontextlost", handleContextLost);
      renderer.current?.dispose();
      renderer.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (!ready || paused) return;
    let frame: number;
    let previous: number | undefined;
    const tick = (now: number) => {
      if (previous === undefined) previous = now;
      if (now - previous >= 1000 / 30) {
        elapsed.current += Math.min(now - previous, 100) / 1000;
        previous = now;
        renderer.current?.draw(elapsed.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, ready]);

  return (
    <canvas
      ref={canvas}
      width={1536}
      height={1024}
      className={styles.wind}
      style={{ visibility: ready ? "visible" : "hidden" }}
      aria-hidden="true"
    />
  );
}
