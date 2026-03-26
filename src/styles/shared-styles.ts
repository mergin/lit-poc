import {css} from 'lit';

/**
 * Shared styles for Lit components.
 * Import and include in your component's static styles property.
 */
export const sharedStyles = css`
  :host {
    box-sizing: border-box;
    /* Typography */
    font-family: var(--mu-font-family, 'Roboto', 'Helvetica Neue', Arial, sans-serif);
    color: var(--mu-text-color, #212b36);
    background: var(--mu-bg-color, #fff);
    line-height: 1.5;
    font-size: 1rem;
    letter-spacing: 0.00938em;
    --mu-font-weight-regular: 400;
    --mu-font-weight-medium: 500;
    --mu-font-weight-bold: 700;
    --mu-h1-size: 2.125rem;
    --mu-h2-size: 1.5rem;
    --mu-h3-size: 1.25rem;
    --mu-h4-size: 1.125rem;
    --mu-h5-size: 1rem;
    --mu-h6-size: 0.875rem;
    --mu-body1-size: 1rem;
    --mu-body2-size: 0.875rem;
    --mu-caption-size: 0.75rem;
    --mu-overline-size: 0.75rem;
    --mu-button-size: 0.875rem;
    /* Color palette (MUI/Minimal defaults) */
    --mu-primary: #1976d2;
    --mu-primary-light: #42a5f5;
    --mu-primary-dark: #1565c0;
    --mu-primary-contrast: #fff;
    --mu-secondary: #9c27b0;
    --mu-secondary-light: #ba68c8;
    --mu-secondary-dark: #7b1fa2;
    --mu-secondary-contrast: #fff;
    --mu-error: #d32f2f;
    --mu-warning: #ed6c02;
    --mu-info: #0288d1;
    --mu-success: #2e7d32;
    --mu-bg-default: #f9fafb;
    --mu-bg-paper: #fff;
    --mu-divider: #e0e0e0;
    --mu-text-primary: #212b36;
    --mu-text-secondary: #637381;
    --mu-text-disabled: #919eab;
    /* Spacing & shape */
    --mu-spacing: 8px;
    --mu-radius: 8px;
    /* Shadows */
    --mu-shadow-1: 0px 1px 2px 0px rgba(145, 158, 171, 0.08);
    --mu-shadow-2: 0px 4px 8px 0px rgba(145, 158, 171, 0.16);
  }

  h1 {
    font-size: var(--mu-h1-size);
    font-weight: var(--mu-font-weight-bold);
    line-height: 1.2;
    margin: 0 0 calc(var(--mu-spacing) * 2) 0;
  }
  h2 {
    font-size: var(--mu-h2-size);
    font-weight: var(--mu-font-weight-bold);
    line-height: 1.3;
    margin: 0 0 calc(var(--mu-spacing) * 1.5) 0;
  }
  h3 {
    font-size: var(--mu-h3-size);
    font-weight: var(--mu-font-weight-medium);
    line-height: 1.4;
    margin: 0 0 var(--mu-spacing) 0;
  }
  h4,
  h5,
  h6 {
    font-weight: var(--mu-font-weight-medium);
    margin: 0 0 var(--mu-spacing) 0;
  }
  p {
    font-size: var(--mu-body1-size);
    margin: 0 0 var(--mu-spacing) 0;
  }
  small,
  .caption {
    font-size: var(--mu-caption-size);
    color: var(--mu-text-secondary);
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    border: 0;
  }
`;
