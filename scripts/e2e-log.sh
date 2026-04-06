#!/usr/bin/env bash
# Runs Playwright e2e tests and writes output to test-results/e2e.log
# while also streaming it to the terminal.
#
# Any extra arguments are forwarded to Playwright (e.g. --project, --grep).

exec node "$(dirname "$0")/e2e-log.mjs" "$@"
