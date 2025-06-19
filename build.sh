#!/usr/bin/env bash
set -e                # stop on first error
mkdir -p docs         # create docs/ if missing

tweego \
  -o docs/index.html \
  -f sugarcube-2 \
  twine/story.twee    # <— last line **NO back-slash**

echo "✅ Built docs/index.html"
