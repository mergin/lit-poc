/**
 * Design token maps for light and dark mode.
 * Used by MuThemeProvider to set CSS custom properties on the host element.
 */

/** Maps CSS custom property names to their values. */
export type TokenMap = Record<string, string>;

/**
 * Light mode design tokens (default theme).
 */
export const lightTokens: TokenMap = {
  '--mu-primary': '#1976d2',
  '--mu-primary-light': '#42a5f5',
  '--mu-primary-dark': '#1565c0',
  '--mu-primary-contrast': '#fff',
  '--mu-secondary': '#9c27b0',
  '--mu-secondary-light': '#ba68c8',
  '--mu-secondary-dark': '#7b1fa2',
  '--mu-secondary-contrast': '#fff',
  '--mu-error': '#d32f2f',
  '--mu-warning': '#ed6c02',
  '--mu-info': '#0288d1',
  '--mu-success': '#2e7d32',
  '--mu-bg-default': '#f9fafb',
  '--mu-bg-paper': '#fff',
  '--mu-divider': '#e0e0e0',
  '--mu-text-primary': '#212b36',
  '--mu-text-secondary': '#637381',
  '--mu-text-disabled': '#919eab',
};

/**
 * Dark mode design token overrides.
 */
export const darkTokens: TokenMap = {
  '--mu-primary': '#90caf9',
  '--mu-primary-light': '#e3f2fd',
  '--mu-primary-dark': '#42a5f5',
  '--mu-primary-contrast': '#000',
  '--mu-secondary': '#ce93d8',
  '--mu-secondary-light': '#f3e5f5',
  '--mu-secondary-dark': '#ab47bc',
  '--mu-secondary-contrast': '#000',
  '--mu-error': '#f44336',
  '--mu-warning': '#ffa726',
  '--mu-info': '#29b6f6',
  '--mu-success': '#66bb6a',
  '--mu-bg-default': '#121212',
  '--mu-bg-paper': '#1e1e1e',
  '--mu-divider': '#333333',
  '--mu-text-primary': '#ffffff',
  '--mu-text-secondary': '#aaaaaa',
  '--mu-text-disabled': '#555555',
};
