#!/usr/bin/env node
// reelyshorts CLI — thin wrapper around the vendored animate toolkit
// plus the thedigitalstag brand layer. Full implementation lands in Phase 4.
// Until then, this prints help and forwards known subcommands to the
// underlying animate tool.

import { existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ANIMATE = join(ROOT, "tools", "animate", "tools");

const COMMANDS = {
  brand: "Brand management (init / show / export). Run `reelyshorts brand` for help.",
  voice: "ElevenLabs voice clone (setup / test). Run `reelyshorts voice` for help.",
  new: "Generate a new piece. Run `reelyshorts new --help` for options.",
  export: "Render a piece to MP4. Run `reelyshorts export --help` for options.",
  gallery: "Open the local gallery at http://localhost:4317.",
  build: "Forward to tools/animate/tools/build.mjs.",
  storyboard: "Forward to tools/animate/tools/storyboard.mjs.",
  review: "Forward to tools/animate/tools/review.mjs.",
};

function printHelp() {
  console.log(`reelyshorts — short-form video for thedigitalstag

Usage:
  reelyshorts <command> [args]

Commands:
${Object.entries(COMMANDS)
  .map(([k, v]) => `  ${k.padEnd(12)} ${v}`)
  .join("\n")}

Quick start:
  reelyshorts new "Stake ADA in 3 taps" --brand thedigitalstag
  reelyshorts gallery

Docs:
  README.md                    Project overview
  brands/thedigitalstag/BRAND.md   Brand spec
  LEGAL.md                     Trademark + nominative-use notes
  tools/VENDORED.md            Vendored animate toolkit info
`);
}

function forwardTo(tool, args) {
  const script = join(ANIMATE, `${tool}.mjs`);
  if (!existsSync(script)) {
    console.error(`Tool not found: ${script}`);
    process.exit(1);
  }
  const child = spawn(process.execPath, [script, ...args], {
    stdio: "inherit",
    cwd: ROOT,
  });
  child.on("exit", (code) => process.exit(code ?? 0));
}

const [, , subcommand, ...rest] = process.argv;

if (!subcommand || subcommand === "--help" || subcommand === "-h") {
  printHelp();
  process.exit(0);
}

if (subcommand === "build" || subcommand === "storyboard" || subcommand === "review" || subcommand === "export" || subcommand === "voice" || subcommand === "render") {
  forwardTo(subcommand === "render" ? "export" : subcommand, rest);
  process.exit(0);
}

if (subcommand === "new") {
  console.log("reelyshorts new — full implementation lands in Phase 4.");
  console.log("Until then, run the animate intake manually via:");
  console.log("  node tools/animate/tools/build.mjs pieces/<slug>");
  console.log("\nArgs received:", rest.join(" "));
  process.exit(0);
}

if (subcommand === "gallery") {
  console.log("reelyshorts gallery — full implementation lands in Phase 6.");
  console.log("Until then, browse pieces/ directly.");
  process.exit(0);
}

if (subcommand === "brand") {
  console.log("reelyshorts brand — full implementation lands in Phase 4.");
  console.log("Until then, read brands/thedigitalstag/BRAND.md directly.");
  process.exit(0);
}

console.error(`Unknown command: ${subcommand}`);
console.error("Run `reelyshorts` with no args for help.");
process.exit(1);
