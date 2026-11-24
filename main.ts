// Funniest Autocorrect Fail — make.fun entry (program/v1).
//
// Writes one autocorrect fail, a single line, to /output/entry.txt.
// The text is fixed and deterministic: no input, no network, no
// environment and no randomness, so every run writes the exact same file.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// One line, 64 characters, no trailing newline: the gate counts the
// characters in the file, so the file must hold exactly this text.
const ENTRY =
  "Mom, don't forget to bring the condoms to the barbecue on Sunday";

function fail(message: string): never {
  throw new Error(message);
}

// The gate accepts UTF-8 text of 1 to 199 characters, not only whitespace.
// Refuse to write anything outside it instead of shipping a bad entry.
if (ENTRY.length < 1 || ENTRY.length > 199) {
  fail(`entry is ${ENTRY.length} characters, outside the 1-199 gate`);
}
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");
// The grader may collect the output as another user, so the file has to be
// readable by everyone, not just the user running this program.
chmodSync(OUT_FILE, 0o644);
