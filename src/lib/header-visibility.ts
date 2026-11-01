/**
 * Whether the top band is shown, from the scroll position (reference prototype, Figma
 * "Animations — à implémenter" › 3). Kept free of imports for the node tests.
 */
export function headerVisibility({ y, lastY, phone, current }: {
  /** Current scroll offset, in px. */
  y: number;
  /** Scroll offset at the previous update. */
  lastY: number;
  /** Phone layout (viewport ≤ 820 px). */
  phone: boolean;
  /** Visibility before this update. */
  current: boolean;
}): boolean {
  // Near the top: always visible on desktop, hidden on phones.
  if (y < 80) return !phone;
  // A 4 px threshold avoids flickering on small scroll jitters.
  if (y < lastY - 4) return true;
  if (y > lastY + 4) return false;
  return current;
}
