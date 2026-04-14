import {readFile, readdir} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';

const DEFAULT_LIMITS = {
  maxEntryRawBytes: 3_500,
  maxEntryGzipBytes: 1_200,
  maxSharedChunkRawBytes: 26_000,
  maxSharedChunkGzipBytes: 8_000,
  maxTotalRawBytes: 35_000,
  maxTotalGzipBytes: 12_000,
};

const LIMIT_ENV_MAP = {
  maxEntryRawBytes: 'CHECKSIZE_MAX_ENTRY_RAW_BYTES',
  maxEntryGzipBytes: 'CHECKSIZE_MAX_ENTRY_GZIP_BYTES',
  maxSharedChunkRawBytes: 'CHECKSIZE_MAX_SHARED_RAW_BYTES',
  maxSharedChunkGzipBytes: 'CHECKSIZE_MAX_SHARED_GZIP_BYTES',
  maxTotalRawBytes: 'CHECKSIZE_MAX_TOTAL_RAW_BYTES',
  maxTotalGzipBytes: 'CHECKSIZE_MAX_TOTAL_GZIP_BYTES',
};

/**
 * Formats a byte count for CLI output.
 * @param {number} bytes The byte size to format.
 * @returns {string} The formatted byte string.
 */
function formatBytes(bytes) {
  return `${bytes.toLocaleString('en-US')} B`;
}

/**
 * Reads a numeric budget from the environment.
 * @param {string} key The logical budget key.
 * @returns {number} The parsed budget value.
 */
function getLimit(key) {
  const envName = LIMIT_ENV_MAP[key];
  const rawValue = process.env[envName];

  if (rawValue === undefined) {
    return DEFAULT_LIMITS[key];
  }

  const parsedValue = Number.parseInt(rawValue, 10);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    throw new Error(`${envName} must be a non-negative integer.`);
  }

  return parsedValue;
}

/**
 * Measures raw and gzip sizes for a file.
 * @param {URL} directoryUrl The parent directory URL.
 * @param {string} fileName The file to measure.
 * @returns {Promise<{fileName: string, rawBytes: number, gzipBytes: number}>} The measured sizes.
 */
async function measureFile(directoryUrl, fileName) {
  const source = await readFile(new URL(fileName, directoryUrl));
  return {
    fileName,
    rawBytes: source.byteLength,
    gzipBytes: gzipSync(source, {level: 9}).byteLength,
  };
}

/**
 * Prints one section of measured files.
 * @param {string} label The section heading.
 * @param {Array<{fileName: string, rawBytes: number, gzipBytes: number}>} files The files to print.
 * @returns {{rawBytes: number, gzipBytes: number}} Aggregate section sizes.
 */
function printSection(label, files) {
  let rawBytes = 0;
  let gzipBytes = 0;

  if (files.length === 0) {
    return {rawBytes, gzipBytes};
  }

  console.log(label);

  for (const file of files) {
    rawBytes += file.rawBytes;
    gzipBytes += file.gzipBytes;
    console.log(
      `${file.fileName}: raw ${formatBytes(file.rawBytes)} | gzip ${formatBytes(file.gzipBytes)}`
    );
  }

  console.log(`Subtotal: raw ${formatBytes(rawBytes)} | gzip ${formatBytes(gzipBytes)}`);
  return {rawBytes, gzipBytes};
}

/**
 * Builds the list of failed budget checks.
 * @param {Array<{fileName: string, rawBytes: number, gzipBytes: number}>} entryFiles Entry bundles.
 * @param {Array<{fileName: string, rawBytes: number, gzipBytes: number}>} sharedChunkFiles Shared chunks.
 * @param {{rawBytes: number, gzipBytes: number}} totals Combined totals.
 * @param {{maxEntryRawBytes: number, maxEntryGzipBytes: number, maxSharedChunkRawBytes: number, maxSharedChunkGzipBytes: number, maxTotalRawBytes: number, maxTotalGzipBytes: number}} limits Active size limits.
 * @returns {string[]} The budget failure messages.
 */
function collectBudgetFailures(entryFiles, sharedChunkFiles, totals, limits) {
  const failures = [];

  for (const file of entryFiles) {
    if (file.rawBytes > limits.maxEntryRawBytes) {
      failures.push(
        `${file.fileName} raw size ${formatBytes(file.rawBytes)} exceeds entry budget ${formatBytes(
          limits.maxEntryRawBytes
        )}`
      );
    }
    if (file.gzipBytes > limits.maxEntryGzipBytes) {
      failures.push(
        `${file.fileName} gzip size ${formatBytes(
          file.gzipBytes
        )} exceeds entry budget ${formatBytes(limits.maxEntryGzipBytes)}`
      );
    }
  }

  for (const file of sharedChunkFiles) {
    if (file.rawBytes > limits.maxSharedChunkRawBytes) {
      failures.push(
        `${file.fileName} raw size ${formatBytes(
          file.rawBytes
        )} exceeds shared chunk budget ${formatBytes(limits.maxSharedChunkRawBytes)}`
      );
    }
    if (file.gzipBytes > limits.maxSharedChunkGzipBytes) {
      failures.push(
        `${file.fileName} gzip size ${formatBytes(
          file.gzipBytes
        )} exceeds shared chunk budget ${formatBytes(limits.maxSharedChunkGzipBytes)}`
      );
    }
  }

  if (totals.rawBytes > limits.maxTotalRawBytes) {
    failures.push(
      `total raw size ${formatBytes(totals.rawBytes)} exceeds overall budget ${formatBytes(
        limits.maxTotalRawBytes
      )}`
    );
  }

  if (totals.gzipBytes > limits.maxTotalGzipBytes) {
    failures.push(
      `total gzip size ${formatBytes(totals.gzipBytes)} exceeds overall budget ${formatBytes(
        limits.maxTotalGzipBytes
      )}`
    );
  }

  return failures;
}

/**
 * Prints the currently active budgets.
 * @param {{maxEntryRawBytes: number, maxEntryGzipBytes: number, maxSharedChunkRawBytes: number, maxSharedChunkGzipBytes: number, maxTotalRawBytes: number, maxTotalGzipBytes: number}} limits Active size limits.
 * @returns {void}
 */
function printBudgets(limits) {
  console.log('Active budgets');
  console.log(
    `Entry bundles: raw ${formatBytes(limits.maxEntryRawBytes)} | gzip ${formatBytes(
      limits.maxEntryGzipBytes
    )}`
  );
  console.log(
    `Shared chunks: raw ${formatBytes(limits.maxSharedChunkRawBytes)} | gzip ${formatBytes(
      limits.maxSharedChunkGzipBytes
    )}`
  );
  console.log(
    `Overall total: raw ${formatBytes(limits.maxTotalRawBytes)} | gzip ${formatBytes(
      limits.maxTotalGzipBytes
    )}`
  );
}

/**
 * Collects gzip and raw sizes for docs bundles.
 * @returns {Promise<void>} Resolves when reporting is complete.
 */
async function main() {
  const docsDir = new URL('../docs/', import.meta.url);
  const entries = await readdir(docsDir, {withFileTypes: true});
  const limits = {
    maxEntryRawBytes: getLimit('maxEntryRawBytes'),
    maxEntryGzipBytes: getLimit('maxEntryGzipBytes'),
    maxSharedChunkRawBytes: getLimit('maxSharedChunkRawBytes'),
    maxSharedChunkGzipBytes: getLimit('maxSharedChunkGzipBytes'),
    maxTotalRawBytes: getLimit('maxTotalRawBytes'),
    maxTotalGzipBytes: getLimit('maxTotalGzipBytes'),
  };

  const bundleFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.bundled.js'))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const sharedChunkFiles = entries
    .filter(
      (entry) => entry.isFile() && entry.name.endsWith('.js') && !entry.name.endsWith('.bundled.js')
    )
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  if (bundleFiles.length === 0 && sharedChunkFiles.length === 0) {
    console.error('No docs bundles found in docs/. Run the docs build first.');
    process.exitCode = 1;
    return;
  }

  const entryResults = await Promise.all(
    bundleFiles.map((fileName) => measureFile(docsDir, fileName))
  );
  const sharedChunkResults = await Promise.all(
    sharedChunkFiles.map((fileName) => measureFile(docsDir, fileName))
  );

  console.log('Docs bundle sizes');
  const entryTotals = printSection('Entry bundles', entryResults);

  if (sharedChunkResults.length > 0) {
    console.log('');
  }

  const sharedTotals = printSection('Shared chunks', sharedChunkResults);
  const totals = {
    rawBytes: entryTotals.rawBytes + sharedTotals.rawBytes,
    gzipBytes: entryTotals.gzipBytes + sharedTotals.gzipBytes,
  };

  console.log('');
  console.log(`Total: raw ${formatBytes(totals.rawBytes)} | gzip ${formatBytes(totals.gzipBytes)}`);
  console.log('');
  printBudgets(limits);

  const failures = collectBudgetFailures(entryResults, sharedChunkResults, totals, limits);

  if (failures.length > 0) {
    console.error('');
    console.error('Size budget failures');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log('');
  console.log('All size budgets passed.');
}

void main();
