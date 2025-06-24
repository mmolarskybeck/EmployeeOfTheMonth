#!/usr/bin/env bash
set -e

SRC=tests/PowerHourPrototype/src
OUT=tests/PowerHourPrototype

echo "🔁 Watching for changes…"

# watch‐mode: same flags plus -w
tweego -w \
  -f sugarcube-2 \
  -m "$SRC"/story.css \
  -o "$OUT"/index.html \
  "$SRC"/story.twee
