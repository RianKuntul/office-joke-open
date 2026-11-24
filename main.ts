// Make the AI Judge Laugh: the Office Joke Open — make.fun entry (v2)
// Writes one original one-line office joke: a single line of at most
// 200 characters, about office life, with the payoff in the last words.
// v2 replaces the out-of-office gag with a calendar gag: the meeting
// about meetings — a more specific office detail, tighter payoff.
// Output: <MAKEFUN_OUTPUT_DIR or /output>/entry.txt
// Run: node main.ts (Node 22, type stripping — no enums, no namespaces)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My calendar is so full the only free slot is a meeting called 'Quick Sync to Discuss Why We Have So Many Meetings'.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");

  // Read-back gate: single line, 1-200 characters, not only whitespace.
  if (JOKE.length < MIN_CHARS || JOKE.length > MAX_CHARS) {
    throw new Error(
      `joke is ${JOKE.length} chars, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (/\r|\n/.test(JOKE) || JOKE.trim().length === 0) {
    throw new Error("joke must be a single non-blank line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, JOKE, "utf8");

  // Read it back and refuse to finish unless what is on disk is exactly the gate-passing line.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== JOKE) {
    throw new Error("read-back mismatch: entry.txt does not match the joke");
  }
  if (onDisk.length < MIN_CHARS || onDisk.length > MAX_CHARS) {
    throw new Error(`entry.txt is ${onDisk.length} chars, must be ${MIN_CHARS}-${MAX_CHARS}`);
  }

  console.log(`wrote ${outPath} (${onDisk.length} chars)`);
}

main();
