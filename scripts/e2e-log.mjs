#!/usr/bin/env node
/**
 * Runs Playwright e2e tests, streams output to the terminal, and writes
 * the complete output to test-results/e2e.log.
 *
 * Any extra CLI arguments (e.g. --project, --grep) are forwarded to Playwright.
 */

import {spawn} from 'child_process';
import {mkdirSync, writeFileSync} from 'fs';
import {join} from 'path';

mkdirSync('test-results', {recursive: true});

const logPath = join('test-results', 'e2e.log');

/** @type {Buffer[]} */
const chunks = [];

const args = ['playwright', 'test', ...process.argv.slice(2)];

const proc = spawn('npx', args, {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
});

proc.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  chunks.push(chunk);
});

proc.stderr.on('data', (chunk) => {
  process.stderr.write(chunk);
  chunks.push(chunk);
});

proc.on('close', (code) => {
  writeFileSync(logPath, Buffer.concat(chunks));
  process.exit(code ?? 0);
});
