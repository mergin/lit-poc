import {css} from 'lit';

/**
 * Shared styles for Lit components.
 * Import and include in your component's static styles property.
 */
export const sharedStyles = css`
  :host {
    box-sizing: border-box;
    font-family: var(--my-font-family, Arial, sans-serif);
    color: var(--my-text-color, #222);
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
