// ── Solution 1: One loop ──────────────────────────────────────
for (let i = 1; i <= 6; i++) {
  console.log("* ".repeat(i).trimEnd());
}

// ── Solution 2: Nested for loops ─────────────────────────────
for (let i = 1; i <= 6; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += j < i ? "* " : "*";
  }
  console.log(row);
}
