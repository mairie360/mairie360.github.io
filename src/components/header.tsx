"use client";

import { useState } from "react";
import { Arrow, Brand } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          document.getElementById("menu-toggle")?.focus();
        }
      }}
    >
      <div className="header-inner container">
        <a
          href="#solution"
          className="brand-link"
          aria-label="Mairie360, accueil"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </a>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fermer" : "Menu"}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            {open ? (
              <path d="m5 5 14 14M5 19 19 5" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <nav
          id="navigation"
          className={`navigation${open ? " is-open" : ""}`}
          aria-label="Navigation principale"
        >
          <a href="#solution" onClick={() => setOpen(false)}>
            La solution
          </a>
          <a href="#modules" onClick={() => setOpen(false)}>
            Les modules
          </a>
          <a href="#equipes" onClick={() => setOpen(false)}>
            Vos équipes
          </a>
          <a
            href="#projet"
            className="button button-outline"
            onClick={() => setOpen(false)}
          >
            Le projet <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}
