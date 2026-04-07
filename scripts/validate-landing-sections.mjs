import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {landingSections} from '../dev/landing-sections.js';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const devDirectory = path.join(projectRoot, 'dev');

const listedFiles = landingSections.flatMap((section) => section.items.map((item) => item.file));
const uniqueListedFiles = new Set(listedFiles);
const duplicateFiles = listedFiles.filter((file, index) => listedFiles.indexOf(file) !== index);

const existingDemoFiles = fs
  .readdirSync(devDirectory)
  .filter((file) => file.endsWith('.html') && file !== 'index.html');

const missingFiles = listedFiles.filter((file) => !fs.existsSync(path.join(devDirectory, file)));
const unlistedFiles = existingDemoFiles.filter((file) => !uniqueListedFiles.has(file));

const problems = [
  ...duplicateFiles.map((file) => `Duplicate landing entry: ${file}`),
  ...missingFiles.map((file) => `Missing demo file referenced by landing page: ${file}`),
  ...unlistedFiles.map((file) => `Demo file missing from landing sections: ${file}`),
];

if (problems.length > 0) {
  console.error('Landing section validation failed.');
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Landing section validation passed for ${listedFiles.length} demo entries.`);
}
