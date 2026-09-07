"use client";

import { useState, type KeyboardEvent } from "react";

export function useTabSelection(
  count: number,
  orientation: "horizontal" | "vertical" = "horizontal",
) {
  const [selected, setSelected] = useState(0);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    const backward = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
    let next = index;
    if (event.key === forward) next = (index + 1) % count;
    else if (event.key === backward) next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  }
  return { selected, setSelected, onKeyDown };
}
