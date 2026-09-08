"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./town-hall-scene.module.css";
import { TownHallWind } from "./town-hall-wind";
import { WalkingCitizen, walkingCharactersAsset } from "./walking-citizen";
import { TownHallConversation, conversationAsset } from "./town-hall-conversation";
import { SceneImage, sceneImageSource, sceneImageWidths } from "./scene-image";

const motionQuery = "(prefers-reduced-motion: reduce)";
const plateAsset = "/images/mairie-parvis.webp";

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

function createJourney(first: boolean, exiting: boolean) {
  return {
    right: !exiting && Math.random() < 0.5,
    male: exiting && Math.random() < 0.5,
    delay: first ? (exiting ? 3 : 0.5) + Math.random() * 4 : 4 + Math.random() * 9,
    duration: 16 + Math.random() * 6,
    stride: 1.02 + Math.random() * 0.2,
    start: -18 + Math.random() * 36,
  };
}

function Visitor({ exiting = false, paused }: { exiting?: boolean; paused: boolean }) {
  const [journey, setJourney] = useState<ReturnType<typeof createJourney> | null>(null);
  const [visit, setVisit] = useState(0);

  useEffect(() => {
    setJourney(createJourney(true, exiting));
  }, [exiting]);

  if (!journey) return null;

  return (
    <div
      key={visit}
      className={`${styles.citizen} ${styles.walker} ${exiting ? styles.exitingWalker : journey.right ? styles.rightWalker : styles.centerWalker}`}
      style={{
        "--arrival-delay": `${journey.delay}s`,
        "--journey-duration": `${journey.duration}s`,
        "--stride-duration": `${journey.stride}s`,
        "--start-x": `${journey.start}%`,
      } as CSSProperties}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        setJourney(createJourney(false, exiting));
        setVisit((previous) => previous + 1);
      }}
    >
      <div className={styles.direction}>
        <WalkingCitizen
          variant={!exiting ? "arriving" : journey.male ? "man" : "woman"}
          paused={paused}
          stride={journey.stride}
          delay={journey.delay}
        />
      </div>
    </div>
  );
}

export function TownHallScene() {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const figure = useRef<HTMLElement>(null);
  const [plateSource, setPlateSource] = useState<string | null>(null);
  const [plateWidth, setPlateWidth] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setTabVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const element = figure.current;
    if (!element) return;
    const resize = () => {
      const crop = window.matchMedia("(max-width: 760px)").matches ? 1 : 1.171875;
      const pixels = element.clientWidth * crop * Math.min(window.devicePixelRatio, 2);
      setPlateWidth(sceneImageWidths.find(width => width >= pixels) ?? 1536);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !visible || !plateWidth) return;
    const source = sceneImageSource(plateAsset, plateWidth);
    if (source === plateSource) return;
    let active = true;
    Promise.all(
      [source, conversationAsset, walkingCharactersAsset].map(async (src) => {
        const image = new window.Image();
        image.fetchPriority = "low";
        image.src = src;
        await image.decode();
      }),
    ).then(
      () => {
        if (active) setPlateSource(source);
      },
      () => {
        // Keep the original illustration if an animation asset cannot load.
      },
    );
    return () => {
      active = false;
    };
  }, [reducedMotion, visible, plateWidth, plateSource]);

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

  const animated = plateSource !== null && !reducedMotion;
  const animationPaused = paused || !visible || !tabVisible;

  return (
    <figure
      ref={figure}
      className="hero-figure"
      data-animation-paused={animationPaused}
    >
      <div className={styles.scene}>
        <SceneImage />
        {animated && (
          <div className={styles.motion} aria-hidden="true">
            <div className={styles.artwork}>
              <Image
                className={styles.plate}
                src={plateSource}
                width={1536}
                height={1024}
                alt=""
                loading="eager"
              />
              <TownHallWind src={plateSource} paused={animationPaused} />
              <div className={`${styles.citizen} ${styles.services}`}>
                <TownHallConversation paused={animationPaused} offset={4.3} pace={0.93} />
              </div>
              <div className={`${styles.citizen} ${styles.plaza}`}>
                <TownHallConversation paused={animationPaused} offset={0} pace={1.07} />
              </div>
              <Visitor paused={animationPaused} />
              <Visitor exiting paused={animationPaused} />
              <Image
                className={`${styles.plate} ${styles.foreground}`}
                src={plateSource}
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
