"use client";

import { useEffect, useRef, useState } from "react";
import { createWalkingRenderer, type WalkingRenderer } from "./walking-citizen-renderer";
import styles from "./walking-citizen.module.css";

export const walkingCharactersAsset = "/images/mairie-personnages.webp";

export function WalkingCitizen({ variant, paused, stride, delay }: {
  variant: "arriving" | "woman" | "man";
  paused: boolean;
  stride: number;
  delay: number;
}) {
  const character = variant === "arriving" ? 0 : variant === "woman" ? 1 : 2;
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<WalkingRenderer | null>(null);
  const elapsed = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const element = canvas.current;
    const lost = (event: Event) => { event.preventDefault(); setReady(false); };
    element?.addEventListener("webglcontextlost", lost);
    const image = new window.Image();
    image.src = walkingCharactersAsset;
    image.decode().then(() => {
      if (!active || !element) return;
      renderer.current = createWalkingRenderer(element, image, character);
      if (renderer.current) {
        renderer.current.draw(0);
        setReady(true);
      }
    }).catch(() => { /* Keep the static character if the atlas cannot decode. */ });
    return () => {
      active = false;
      element?.removeEventListener("webglcontextlost", lost);
      renderer.current?.dispose();
      renderer.current = null;
    };
  }, [character]);

  useEffect(() => {
    if (!ready || paused) return;
    let frame: number;
    let previous: number | undefined;
    const tick = (now: number) => {
      if (previous !== undefined) elapsed.current += (now - previous) / 1000;
      previous = now;
      if (elapsed.current >= delay) {
        const phase = ((elapsed.current - delay) % stride) / stride * Math.PI * 2;
        renderer.current?.draw(phase);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ready, paused, stride, delay]);

  return (
    <span className={styles.walkingSprite} data-character={variant}>
      <svg viewBox="0 0 128 192" aria-hidden="true" focusable="false" style={{ visibility: ready ? "hidden" : "visible" }}>
        <image href={walkingCharactersAsset} x={-character * 128} width="384" height="192" />
      </svg>
      <canvas ref={canvas} width={256} height={384} aria-hidden="true" style={{ visibility: ready ? "visible" : "hidden" }} />
    </span>
  );
}
