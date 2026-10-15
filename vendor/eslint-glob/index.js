import { globSync as tinyGlobSync } from "tinyglobby";
import { resolve } from "node:path";

// Next lint only uses globSync to discover project roots. Match fast-glob's
// treatment of literal directories instead of expanding all their descendants.
// Canonical absolute paths also keep App Router route discovery independent of
// the current working directory and the backend's directory suffix format.
export const globSync = (patterns, options = {}) => tinyGlobSync(patterns, {
  ...options,
  absolute: true,
  expandDirectories: false,
}).map((directory) => resolve(directory));
