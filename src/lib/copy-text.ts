/**
 * Copies a text to the clipboard: the async Clipboard API first, then a hidden textarea with
 * `execCommand("copy")` for browsers or contexts that refuse it. Never throws, so the caller can
 * always confirm the copy as the reference prototype does. Kept free of imports for the node tests.
 */
export async function copyText(
  text: string,
  env: { clipboard?: Pick<Clipboard, "writeText">; document?: Document } = {
    clipboard: typeof navigator === "undefined" ? undefined : navigator.clipboard,
    document: typeof document === "undefined" ? undefined : document,
  },
): Promise<void> {
  try {
    if (env.clipboard?.writeText) {
      await env.clipboard.writeText(text);
      return;
    }
  } catch {
    // Fall back below.
  }
  try {
    const doc = env.document;
    if (!doc) return;
    const area = doc.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "absolute";
    area.style.left = "-9999px";
    doc.body.appendChild(area);
    area.select();
    doc.execCommand("copy");
    doc.body.removeChild(area);
  } catch {
    // Nothing else to try.
  }
}
