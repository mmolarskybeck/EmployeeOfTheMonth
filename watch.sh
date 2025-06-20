#!/usr/bin/env bash
set -e

echo "🔁 Watching for changes…"
tweego -w \
  -f sugarcube-2 \
  -o tests/PowerHourPrototype/index.html \
  tests/PowerHourPrototype/src/story.twee \
  -m tests/PowerHourPrototype/src/story.js \
  -m tests/PowerHourPrototype/src/story.css
