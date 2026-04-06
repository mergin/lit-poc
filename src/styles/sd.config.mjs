/**
 * Style Dictionary v4 build configuration.
 * Run via: npm run build:tokens
 *
 * Outputs:
 *   dist/tokens.css  — all tokens as :root {} custom properties
 *   dist/tokens.json — nested token map (key → value)
 */
export default {
  source: ['src/styles/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'mu',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
    json: {
      transformGroup: 'js',
      prefix: 'mu',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
};
