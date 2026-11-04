#!/usr/bin/env sh

PREV_COMMIT="$1"
if [ -z "$PREV_COMMIT" ]; then
  PREV_COMMIT="HEAD@{1}"
fi

if ! git rev-parse --verify "$PREV_COMMIT" >/dev/null 2>&1; then
  exit 0
fi

CHANGED_FILES=$(git diff --name-only "$PREV_COMMIT" HEAD)

if echo "$CHANGED_FILES" | grep -qE '^package(-lock)?\.json$'; then
  npm install
fi

if echo "$CHANGED_FILES" | grep -qE '^src/routes/'; then
  npx tsr generate
fi
