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

/**
 * Spacing scale tokens.
 * Base unit is 4 px (T-shirt sizing via numeric multipliers).
 */
export const spacingTokens = `
  --mu-spacing-0: 0px;
  --mu-spacing-1: 4px;
  --mu-spacing-2: 8px;
  --mu-spacing-3: 12px;
  --mu-spacing-4: 16px;
  --mu-spacing-5: 20px;
  --mu-spacing-6: 24px;
  --mu-spacing-8: 32px;
  --mu-spacing-10: 40px;
  --mu-spacing-12: 48px;
  --mu-spacing-16: 64px;
`;

/**
 * Elevation tokens expressed as Material-style layered box-shadow values.
 * Elevation 0 = flat (no shadow); elevation 4 = most raised.
 */
export const elevationTokens = `
  --mu-elevation-0: none;
  --mu-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --mu-elevation-2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  --mu-elevation-3: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  --mu-elevation-4: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

/**
 * Motion tokens — duration steps and easing curves.
 * The prefers-reduced-motion media query in MuThemeProvider overrides all
 * duration tokens to 0 ms for users who prefer reduced motion.
 */
export const motionTokens = `
  --mu-duration-shortest: 150ms;
  --mu-duration-shorter: 200ms;
  --mu-duration-short: 250ms;
  --mu-duration-standard: 300ms;
  --mu-duration-complex: 375ms;
  --mu-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --mu-easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --mu-easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --mu-easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
`;

/**
 * Shape (border-radius) tokens using a named scale.
 * Use `--mu-radius-full` for fully-rounded pill shapes.
 */
export const shapeTokens = `
  --mu-radius-none: 0px;
  --mu-radius-sm: 2px;
  --mu-radius-md: 4px;
  --mu-radius-lg: 8px;
  --mu-radius-xl: 12px;
  --mu-radius-full: 9999px;
`;
