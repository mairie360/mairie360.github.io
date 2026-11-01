// Helpers for the HTML tests: they read the static export in out/ (what GitHub Pages serves),
// so `npm run build` must run first. parse5 parses like a browser does.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";

export const outDir = fileURLToPath(new URL("../../out/", import.meta.url));
export const siteUrl = "https://mairie360.fr";

/** Every exported page, by public path. */
export const pages = {
  "/": "index.html",
  "/confidentialite/": "confidentialite/index.html",
  "/conditions-utilisation/": "conditions-utilisation/index.html",
  "/merci/": "merci/index.html",
  "/404": "404.html",
};
/** Pages that search engines should index. */
export const indexable = ["/", "/confidentialite/", "/conditions-utilisation/"];

if (!fs.existsSync(path.join(outDir, "index.html"))) {
  throw new Error("out/index.html is missing: run `npm run build` before `npm run test:html`.");
}

const cache = new Map();

/** Parsed page with flat element list and small query helpers. */
export function page(publicPath) {
  if (!cache.has(publicPath)) {
    const html = fs.readFileSync(path.join(outDir, pages[publicPath]), "utf8");
    const elements = [];
    const walk = (node, parent) => {
      if (node.tagName) {
        node.parentElement = parent;
        elements.push(node);
      }
      for (const child of node.childNodes ?? []) walk(child, node.tagName ? node : parent);
      if (node.content) walk(node.content, parent);
    };
    walk(parse(html), null);
    cache.set(publicPath, { html, elements });
  }
  const { html, elements } = cache.get(publicPath);
  const all = (predicate) => elements.filter(predicate);
  return {
    html,
    elements,
    all,
    tags: (name) => all(element => element.tagName === name),
    one: (predicate) => elements.find(predicate),
    byId: (id) => elements.find(element => attr(element, "id") === id),
  };
}

export function attr(element, name) {
  return element?.attrs?.find(item => item.name === name)?.value;
}

export function hasAttr(element, name) {
  return Boolean(element?.attrs?.some(item => item.name === name));
}

/** Text content, whitespace collapsed (like `textContent` then trimmed). */
export function text(node) {
  const raw = (item) => item.nodeName === "#text" ? item.value : (item.childNodes ?? []).map(raw).join("");
  return raw(node).replace(/\s+/g, " ").trim();
}

/** Visible text only: skips <script>, <style>, <template> and hidden subtrees. */
export function visibleText(node) {
  if (node.nodeName === "#text") return node.value;
  if (["script", "style", "template", "noscript"].includes(node.tagName)) return "";
  if (hasAttr(node, "hidden")) return "";
  return (node.childNodes ?? []).map(visibleText).join(" ").replace(/\s+/g, " ");
}

export function ancestors(element) {
  const list = [];
  for (let current = element.parentElement; current; current = current.parentElement) list.push(current);
  return list;
}

/** Accessible name approximation: aria-label, aria-labelledby, then text and img alt. */
export function accessibleName(element, doc) {
  const label = attr(element, "aria-label");
  if (label?.trim()) return label.trim();
  const labelledBy = attr(element, "aria-labelledby");
  if (labelledBy) return labelledBy.split(/\s+/).map(id => text(doc.byId(id) ?? { childNodes: [] })).join(" ").trim();
  const alts = [];
  const collect = (node) => {
    if (node.tagName === "img" && attr(node, "alt")) alts.push(attr(node, "alt"));
    for (const child of node.childNodes ?? []) collect(child);
  };
  collect(element);
  return `${text(element)} ${alts.join(" ")}`.trim();
}

export function exported(publicFile) {
  const clean = decodeURI(publicFile.split(/[?#]/)[0]);
  const target = path.join(outDir, clean);
  if (clean.endsWith("/")) return fs.existsSync(path.join(target, "index.html"));
  return fs.existsSync(target);
}

/** Same-transpile loader as the unit tests, for self-contained TS modules. */
export { loadTs } from "./load-ts.mjs";
