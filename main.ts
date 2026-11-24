// Funniest Autocorrect Fail — make.fun entry (program/v2).
//
// Writes one autocorrect fail, a single line, to /output/entry.txt.
// The text is fixed and deterministic: no input, no network, no
// environment and no randomness, so every run writes the exact same file.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// The gate counts the characters in the file, so it must hold exactly
// this text: one line, 64 characters, no trailing newline.
const AUTOCORRECT_FAIL =
  "Mom, don't forget to bring the condoms to the barbecue on Sunday";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The gate accepts UTF-8 text of 1 to 199 characters, not only whitespace.
// Refuse to write anything outside it instead of shipping a bad entry.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 199) {
    throw new Error(`entry is ${text.length} characters, outside the 1-199 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
}

// Write the entry exactly as given, then make it world-readable: the
// grader may collect the output as another user.
function writeEntry(text: string): void {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, text, "utf8");
  chmodSync(OUT_FILE, 0o644);
}

function main(): void {
  validateEntry(AUTOCORRECT_FAIL);
  writeEntry(AUTOCORRECT_FAIL);
}

main();
