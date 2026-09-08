"use client";

import { useEffect, useRef, useState } from "react";
import { createConversationRenderer } from "./conversation-renderer";
import type { SpriteMeshRenderer } from "./sprite-mesh-renderer";
import styles from "./town-hall-scene.module.css";

export const conversationAsset = "/images/mairie-conversation-alpha.webp";
const conversationDuration = 8;

export function TownHallConversation({ paused, offset, pace }: { paused: boolean; offset: number; pace: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<SpriteMeshRenderer | null>(null);
  const elapsed = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const element = canvas.current;
    const lost = (event: Event) => { event.preventDefault(); setReady(false); };
    element?.addEventListener("webglcontextlost", lost);
    const image = new window.Image();
    image.src = conversationAsset;
    image.decode().then(() => {
      if (!active || !element) return;
      renderer.current = createConversationRenderer(element, image);
      if (renderer.current) {
        renderer.current.draw(offset / conversationDuration * Math.PI * 2);
        setReady(true);
      }
    }).catch(() => { /* Keep the original pair visible when rendering is unavailable. */ });
    return () => {
      active = false;
      element?.removeEventListener("webglcontextlost", lost);
      renderer.current?.dispose();
      renderer.current = null;
    };
  }, [offset]);

  useEffect(() => {
    if (!ready || paused) return;
    let frame: number;
    let previous: number | undefined;
    const tick = (now: number) => {
      if (previous !== undefined) elapsed.current += (now - previous) / 1000;
      previous = now;
      const phase = ((elapsed.current * pace + offset) % conversationDuration) / conversationDuration * Math.PI * 2;
      renderer.current?.draw(phase);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ready, paused, offset, pace]);

  return (
    <span className={styles.conversation} data-conversation={offset} style={{ backgroundImage: ready ? "none" : undefined }}>
      <canvas ref={canvas} width={512} height={384} aria-hidden="true" style={{ visibility: ready ? "visible" : "hidden" }} />
    </span>
  );
}
