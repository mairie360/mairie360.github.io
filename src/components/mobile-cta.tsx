"use client";

import { useEffect, useState } from "react";
import { Arrow } from "./icons";

export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const primaryAction = document.getElementById("hero-primary-cta");
    if (!primaryAction || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    });
    observer.observe(primaryAction);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mobile-cta" hidden={!visible}>
      <a className="button button-primary" href="#contact" data-contact-origin="mobile" data-contact-intention="beta">Participer à la bêta <Arrow /></a>
    </div>
  );
}
