import {spawnSync} from 'node:child_process';
import {readdir} from 'node:fs/promises';
import {join, relative} from 'node:path';

const ROOTS = ['src/core/components', 'src/core/i18n', 'src/list', 'src/theme'];

const IMPLEMENTATION_FILE_PATTERN = /^mu-[^.]+\.ts$/;

/**
 * Recursively collects implementation files for lit-analyzer.
 *
 * @param {string} dir Absolute directory path to search.
 * @returns {Promise<string[]>} Matching file paths relative to the workspace root.
 */
async function collectAnalyzerTargets(dir) {
  try {
    const entries = await readdir(dir, {withFileTypes: true});
    const results = await Promise.all(
      entries
        .filter((entry) => entry.name !== '_tests')
        .map(async (entry) => {
          const entryPath = join(dir, entry.name);

          if (entry.isDirectory()) {
            return collectAnalyzerTargets(entryPath);
          }

          if (entry.isFile() && IMPLEMENTATION_FILE_PATTERN.test(entry.name)) {
            return [relative(process.cwd(), entryPath).replaceAll('\\', '/')];
          }

          return [];
        })
    );

    return results.flat().sort();
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

/**
 * Runs lit-analyzer against the collected implementation files.
 *
 * @returns {Promise<void>} Resolves when the analyzer exits.
 */
async function main() {
  const targetLists = await Promise.all(
    ROOTS.map((root) => collectAnalyzerTargets(join(process.cwd(), root)))
  );
  const targets = targetLists.flat();

  if (targets.length === 0) {
    console.error('No lit-analyzer targets were found.');
    process.exit(1);
  }

  const quotedTargets = targets.map((target) => `"${target}"`).join(' ');
  const result = spawnSync(`npx lit-analyzer ${quotedTargets}`, [], {
    shell: true,
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  process.exit(result.status ?? 1);
}

await main();
