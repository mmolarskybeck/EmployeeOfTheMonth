#!/usr/bin/env bash
set -e

SRC=tests/PowerHourPrototype/src
OUT=tests/PowerHourPrototype

# 1) make sure output dir exists
mkdir -p "$OUT"

# 3) compile, inlining head.html into <head>
tweego \
  -f sugarcube-2 \
  -m tests/PowerHourPrototype/src/story.css \
  -o tests/PowerHourPrototype/index.html \
  tests/PowerHourPrototype/src/story.twee


echo "✅ Built $OUT/index.html"
