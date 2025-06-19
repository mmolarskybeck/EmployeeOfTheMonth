#!/usr/bin/env bash
set -e                       # stop if any command fails

# Make sure docs/ exists
mkdir -p docs

# Compile twine/story.twee → docs/index.html   (SugarCube 2 is the default)
tweego \
  -o docs/index.html \
  -f sugarcube-2 \
  twine/story.twee

echo "✅ Built docs/index.html"
