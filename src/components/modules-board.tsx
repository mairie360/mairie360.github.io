"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import {
  boardCopy, boardHint, boardTools, moduleColors, moduleNames, phoneSpots, taskDelay, tilePositions, tint, toolDelay,
  toolOffset,
} from "@/lib/modules-board";
import styles from "./modules-board.module.css";

/** Frame of each module tile: [inner ring, icon background]. */
const tileTones = [
  ["#B1B9C8", "#E4E6EC"], ["#B2D7D1", "#E4F1EF"], ["#ECD0B7", "#F8EFE6"],
  ["#D2CAD9", "#EFEDF2"], ["#E6BFCA", "#F6E9EC"], ["#BFD2BD", "#E8EFE8"],
] as const;

/** Filled 64×64 module icons of the board, in module order. */
const tileIcons: ((color: string) => ReactNode)[] = [
  c => <><rect x="6" y="6" width="24" height="24" rx="6" fill={c} /><rect x="34" y="6" width="24" height="14" rx="5" fill={c} fillOpacity="0.5" /><rect x="34" y="24" width="24" height="34" rx="6" fill={c} fillOpacity="0.5" /><rect x="6" y="34" width="24" height="24" rx="6" fill={c} fillOpacity="0.5" /></>,
  c => <><rect x="6" y="8" width="52" height="12" rx="6" fill={c} /><rect x="6" y="26" width="38" height="12" rx="6" fill={c} fillOpacity="0.5" /><rect x="6" y="44" width="24" height="12" rx="6" fill={c} fillOpacity="0.5" /><path d="M40 50 l6 6 l12 -14" fill="none" stroke={c} strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></>,
  c => <><rect x="6" y="10" width="52" height="46" rx="9" fill={c} /><path d="M6 19 a9 9 0 0 1 9 -9 h34 a9 9 0 0 1 9 9 v5 h-52z" fill={c} fillOpacity="0.5" /><rect x="16" y="4" width="6" height="12" rx="3" fill={c} fillOpacity="0.5" /><rect x="42" y="4" width="6" height="12" rx="3" fill={c} fillOpacity="0.5" /><rect x="14" y="32" width="10" height="8" rx="2" fill="#FFFFFF" /><rect x="27" y="32" width="10" height="8" rx="2" fill="#FFFFFF" /><rect x="40" y="32" width="10" height="8" rx="2" fill={c} fillOpacity="0.5" /><rect x="14" y="43" width="10" height="8" rx="2" fill="#FFFFFF" /></>,
  c => <><path d="M6 14 a8 8 0 0 1 8 -8 h24 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-18 l-10 8 v-8 a8 8 0 0 1 -4 -7z" fill={c} /><path d="M24 30 a8 8 0 0 1 8 -8 h18 a8 8 0 0 1 8 8 v12 a8 8 0 0 1 -6 8 v8 l-10 -8 h-10 a8 8 0 0 1 -8 -8z" fill={c} fillOpacity="0.5" /></>,
  c => <><path d="M16 32 H32 M32 32 L46 16 M32 32 L46 48" fill="none" stroke={c} strokeWidth="4" strokeLinecap="round" /><circle cx="13" cy="32" r="9" fill={c} fillOpacity="0.5" /><circle cx="48" cy="14" r="8" fill={c} fillOpacity="0.5" /><circle cx="48" cy="50" r="8" fill={c} fillOpacity="0.5" /><circle cx="32" cy="32" r="5" fill={c} fillOpacity="0.5" /></>,
  c => <><path d="M32 16 C 24 10, 14 9, 6 11 V52 C 14 50, 24 51, 32 57z" fill={c} /><path d="M32 16 C 40 10, 50 9, 58 11 V52 C 50 50, 40 51, 32 57z" fill={c} fillOpacity="0.5" /><path d="M32 16 V57" stroke="#FFFFFF" strokeWidth="2" /><circle cx="46" cy="24" r="5" fill="#FFFFFF" /></>,
];

/** Dotted links between scattered tools (grey) and between the tools of one module (its color). */
const crossLinks = [
  "M335 11 Q447 75 555 41", "M125 41 Q149 192 145 251", "M385 231 Q532 278 685 191", "M775 21 Q741 148 685 191",
  "M385 231 Q461 410 505 471", "M505 471 Q637 544 765 501", "M685 191 Q745 416 765 501",
];
const moduleLinks = [
  ["M125 41 Q232 73 335 11"], ["M555 41 Q666 80 775 21"], ["M965 61 Q944 176 945 221", "M945 221 Q817 264 685 191"],
  ["M145 251 Q266 294 385 231"], ["M235 501 Q372 546 505 471"], ["M765 501 Q875 510 975 421"],
];

function Tick({ color, size }: { color: string; size: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={size === 14 ? 3 : 3.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

export function ModulesBoard() {
  const [withPlatform, setWithPlatform] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const [selected, setSelected] = useState(-1);

  const hov = withPlatform ? -1 : hovered;
  const sel = withPlatform ? selected : -1;
  const copy = boardCopy(withPlatform);
  const hint = boardHint(withPlatform, withPlatform ? sel : hov);
  const focused = withPlatform ? sel : hov;

  const tasks = moduleNames.map((_, module) => boardTools
    .map((tool, rank) => ({ tool, rank }))
    .filter(({ tool }) => tool.module === module));

  const taskStyle = (rank: number): CSSProperties => ({
    transitionDelay: `${taskDelay(rank, withPlatform).toFixed(2)}s`,
    ...(withPlatform ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(-6px)" }),
  });

  const toolStyle = (rank: number): CSSProperties => {
    const tool = boardTools[rank];
    const color = moduleColors[tool.module];
    const [dx, dy] = toolOffset(tool);
    const base: CSSProperties = {
      left: tool.x,
      top: tool.y,
      background: tint(color, 0.9),
      border: `1px solid ${tint(color, 0.7)}`,
      borderLeft: `5px solid ${color}`,
      transition: withPlatform
        ? "transform 1.05s cubic-bezier(.4,0,.2,1), opacity .98s ease-in"
        : "transform .5s cubic-bezier(.4,0,.2,1), opacity .4s ease",
      transitionDelay: `${toolDelay(rank, withPlatform).toFixed(2)}s`,
    };
    if (withPlatform) {
      return { ...base, opacity: 0, pointerEvents: "none", transform: `translate(${dx}px,${dy}px) scale(0.25)` };
    }
    if (hov === tool.module) {
      return { ...base, opacity: 1, zIndex: 6, transform: "rotate(0deg) scale(1.08)",
        boxShadow: "0 14px 28px rgba(56,63,81,0.16)", transitionDelay: "0s" };
    }
    if (hov >= 0) return { ...base, opacity: 0.35, transform: `rotate(${tool.rotate}deg) scale(0.97)`, transitionDelay: "0s" };
    return { ...base, opacity: 1, transform: `rotate(${tool.rotate}deg)` };
  };

  const tileStyle = (module: number): CSSProperties => {
    const [left, top] = tilePositions[module];
    const on = sel === module;
    const dim = sel >= 0 && !on;
    return {
      left,
      top,
      transitionDelay: withPlatform && sel < 0 ? `${(module * 0.03).toFixed(2)}s` : "0s",
      ...(withPlatform
        ? on ? { opacity: 1, transform: "translateY(-6px) scale(1.06)", filter: "drop-shadow(0 16px 22px rgba(56,63,81,0.18))" }
          : dim ? { opacity: 0.38, transform: "scale(0.97)", filter: "saturate(0.4)" }
            : { opacity: 1, transform: "none" }
        : { opacity: 0, transform: "translateY(12px) scale(0.85)" }),
    };
  };

  const linkOpacity = (module: number) => withPlatform ? 0 : hov === module ? 1 : hov >= 0 ? 0.12 : 0.55;

  return (
    <section className={styles.section} id="modules" aria-labelledby="board-title">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">Les modules</p>
          <h2 id="board-title">{copy.title}</h2>
          <p className={`section-lead ${styles.lead}`}>{copy.lead}</p>
          <div className={styles.switch} role="group" aria-label="Comparer">
            <button type="button" aria-pressed={!withPlatform}
              onClick={() => { setWithPlatform(false); setSelected(-1); }}>Sans Mairie360</button>
            <button type="button" aria-pressed={withPlatform}
              onClick={() => { setWithPlatform(true); setHovered(-1); }}>Avec Mairie360</button>
          </div>
        </div>

        {/* Desktop board, 1080×720, zoomed out on narrower screens. */}
        <div className={styles.boardWrap}>
          <div className={styles.board}>
            <div className={styles.frame}
              style={withPlatform ? { opacity: 1, transform: "scale(1)" } : { opacity: 0, transform: "scale(0.96)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, logo shown as is */}
              <img src="/images/mairie360-logo.png" alt="" width={57} height={44} />
            </div>

            <svg className={styles.links} aria-hidden="true" width="1080" height="720" viewBox="0 0 1080 720">
              <g style={{ opacity: withPlatform || hov >= 0 ? 0 : 0.8 }} stroke="#A5ABB8" strokeWidth="1.4" strokeDasharray="2 7">
                {crossLinks.map(d => <path key={d} d={d} />)}
              </g>
              {moduleLinks.map((paths, module) => (
                <g key={module} style={{ opacity: linkOpacity(module) }} stroke={moduleColors[module]} strokeWidth="2" strokeDasharray="4 7">
                  {paths.map(d => <path key={d} d={d} />)}
                </g>
              ))}
            </svg>

            {boardTools.map((tool, rank) => {
              const color = moduleColors[tool.module];
              return (
                <div key={tool.name} className={styles.tool} style={toolStyle(rank)}
                  onMouseEnter={() => { if (!withPlatform) setHovered(tool.module); }}
                  onMouseLeave={() => setHovered(-1)}>
                  <span aria-hidden="true" className={styles.pin} style={{ background: color }} />
                  <div className={styles.toolApp} style={{ color: tint(color, -0.3) }}>{tool.app}</div>
                  <div className={styles.toolBody}>
                    <div className={styles.toolName}>{tool.name}</div>
                    <div className={styles.toolSub}>{tool.sub}</div>
                  </div>
                </div>
              );
            })}

            {moduleNames.map((name, module) => {
              const [ring, soft] = tileTones[module];
              const color = moduleColors[module];
              return (
                <div key={name} className={styles.tile} style={tileStyle(module)}>
                  <button type="button" className={styles.tileButton} aria-pressed={sel === module}
                    aria-label={`Voir le module ${name}`} tabIndex={withPlatform ? 0 : -1}
                    onClick={() => setSelected(current => current === module ? -1 : module)}>
                    <span className={styles.tileBox} style={{ border: `2px solid ${color}`,
                      boxShadow: `inset 0 0 0 6px #FFFFFF, inset 0 0 0 7px ${ring}, 0 10px 24px rgba(56,63,81,0.08)` }}>
                      <span className={styles.tileIcon} style={{ background: soft }}>
                        <svg aria-hidden="true" width="44" height="44" viewBox="0 0 64 64">{tileIcons[module](color)}</svg>
                      </span>
                    </span>
                    <span className={styles.tileLabel}>{name}</span>
                  </button>
                  <ul className={styles.tasks} aria-hidden={!withPlatform}>
                    {tasks[module].map(({ tool, rank }) => (
                      <li key={tool.task} className={styles.task} style={taskStyle(rank)}>
                        <Tick color={color} size={14} /><span>{tool.task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className={styles.hint} aria-live="polite">
            <span className={styles.hintDot} style={{ background: focused >= 0 ? moduleColors[focused] : "#D8DCE2" }} />
            <p><strong>{hint.title}</strong> {hint.text}</p>
          </div>
        </div>

        {/* Phone board: the tools are stacked, then join the 2×3 grid of modules. */}
        <div className={styles.phone}>
          {boardTools.map((tool, rank) => {
            const color = moduleColors[tool.module];
            const [left, top, rotate] = phoneSpots[rank];
            return (
              <div key={tool.name} className={styles.phoneTool} aria-hidden={withPlatform}
                style={{
                  zIndex: rank % 4 + 1,
                  background: tint(color, 0.9),
                  border: `1px solid ${tint(color, 0.7)}`,
                  borderLeft: `4px solid ${color}`,
                  transitionDelay: `${(withPlatform ? rank * 0.03 : 0).toFixed(2)}s`,
                  ...(withPlatform
                    ? { left: `${tool.module % 2 ? 54 : 4}%`, top: 24 + Math.floor(tool.module / 2) * 140, opacity: 0,
                      transform: "scale(0.55) rotate(0deg)" }
                    : { left: `${left}%`, top: top + 14, opacity: 1, transform: `rotate(${rotate}deg)` }),
                }}>
                <span aria-hidden="true" className={styles.phonePin} style={{ background: color }} />
                <span className={styles.phoneApp} style={{ color: tint(color, -0.3) }}>{tool.app}</span>
                <span className={styles.phoneName}>{tool.name}</span>
              </div>
            );
          })}
          <ul className={styles.phoneGrid} aria-hidden={!withPlatform}>
            {moduleNames.map((name, module) => (
              <li key={name} className={styles.phoneModule}
                style={{
                  border: `1px solid ${tint(moduleColors[module], 0.65)}`,
                  borderTop: `4px solid ${moduleColors[module]}`,
                  transitionDelay: `${withPlatform ? (0.35 + module * 0.06).toFixed(2) : "0"}s`,
                  ...(withPlatform ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "scale(0.9)" }),
                }}>
                <span className={styles.phoneTitle} style={{ color: tint(moduleColors[module], -0.25) }}>{name}</span>
                {/* The prototype keeps only the first task of each module on phones. */}
                {tasks[module].slice(0, 1).map(({ tool }) => (
                  <span key={tool.task} className={styles.phoneTask}>
                    <Tick color={moduleColors[module]} size={12} /><span>{tool.task}</span>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.more}><a href="#plateforme">Voir chaque module en détail ↓</a></p>
      </div>
    </section>
  );
}
