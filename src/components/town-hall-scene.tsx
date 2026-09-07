"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./town-hall-scene.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
const animationAssets = [
  "/images/mairie-parvis.webp",
  "/images/mairie-marche-alpha.webp",
  "/images/mairie-conversation-alpha.webp",
];

function subscribeToMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}

function getServerReducedMotion() {
  return true;
}

function Citizen({ conversation = false }: { conversation?: boolean }) {
  return (
    <span
      className={conversation ? `${styles.sprite} ${styles.conversation}` : styles.sprite}
    >

    </span>
  );
}

export function TownHallScene() {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const figure = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion || ready) return;
    let active = true;
    Promise.all(
      animationAssets.map(async (src) => {
        const image = new window.Image();
        image.src = src;
        await image.decode();
      }),
    ).then(
      () => {
        if (active) setReady(true);
      },
      () => {
        // Keep the original illustration if an animation asset cannot load.
      },
    );
    return () => {
      active = false;
    };
  }, [reducedMotion, ready]);

  useEffect(() => {
    const element = figure.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const animated = ready && !reducedMotion;

  return (
    <figure
      ref={figure}
      className="hero-figure"
      data-animation-paused={paused || !visible}
    >
      <div className={styles.scene}>
        <Image
          src="/images/mairie-collectif.webp"
          alt="Des personnes échangent sur le parvis de la mairie tandis que des visiteurs montent les marches et entrent dans le bâtiment."
          width={1536}
          height={1024}
          sizes="(max-width: 760px) 100vw, 65vw"
          priority
        />
        {animated && (
          <div className={styles.motion} aria-hidden="true">
            <div className={styles.artwork}>
              <Image
                className={styles.plate}
                src={animationAssets[0]}
                width={1536}
                height={1024}
                alt=""
                loading="eager"
              />
              <div className={`${styles.citizen} ${styles.services}`}>
                <Citizen conversation />
              </div>
              <div className={`${styles.citizen} ${styles.plaza}`}>
                <Citizen conversation />
              </div>
              <div className={`${styles.citizen} ${styles.walker} ${styles.centerWalker}`}>
                <div className={styles.direction}>
                  <Citizen />
                </div>
              </div>
              <div className={`${styles.citizen} ${styles.walker} ${styles.rightWalker}`}>
                <div className={styles.direction}>
                  <Citizen />
                </div>
              </div>
              <Image
                className={`${styles.plate} ${styles.foreground}`}
                src={animationAssets[0]}
                width={1536}
                height={1024}
                alt=""
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>
      <figcaption className={styles.caption}>
        <span>Le numérique au service du collectif.</span>
        {animated && (
          <button
            className={styles.toggle}
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Reprendre l’animation" : "Mettre l’animation en pause"}
            title={paused ? "Reprendre l’animation" : "Mettre l’animation en pause"}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              {paused ? (
                <path d="M4 2.5v11L13 8Z" />
              ) : (
                <path d="M4 3h3v10H4Zm5 0h3v10H9Z" />
              )}
            </svg>
          </button>
        )}
      </figcaption>
    </figure>
  );
}
