#!/usr/bin/env bash
# Pre-commit hook: regenerate OG images when a non-draft blog post is added.
# Called by lefthook — expects staged files to already be in the index.

set -euo pipefail

new_posts=$(git diff --cached --diff-filter=A --name-only -- src/content/blog/)
if [ -z "$new_posts" ]; then exit 0; fi

for f in $new_posts; do
  if ! grep -q '^draft:\s*true' "$f"; then
    echo "New published blog post detected — regenerating OG images..."
    pnpm run generate:og
    git add public/og/
    echo "OG images regenerated and staged."
    exit 0
  fi
done
