// @vitest-environment jsdom
/**
 * Unit and render tests for the Svelte 5 wrapper package (`src/adapters/svelte/index.ts`).
 *
 * Unit tests verify that every expected named export exists and is a Svelte 5
 * component (function).  Render tests mount a representative subset and assert
 * that the corresponding custom-element tag appears in the DOM.
 */
import {mount, unmount} from 'svelte';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import * as wrappers from '../index.js';
import type Button from '../Button.svelte';
import type Checkbox from '../Checkbox.svelte';
import type TextField from '../TextField.svelte';

// ─── Expected export names (one per wrapper) ─────────────────────────────────

/**
 * Full list of component names that must be exported from the Svelte package.
 */
const expectedNames = [
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'CardHeader',
  'CardContent',
  'CardActions',
  'Chip',
  'ChipInput',
  'Divider',
  'Icon',
  'List',
  'ListItem',
  'Typography',
  'ThemeProvider',
  'LocaleProvider',
  'Checkbox',
  'Radio',
  'RadioGroup',
  'Switch',
  'TextField',
  'Select',
  'Slider',
  'Rating',
  'Autocomplete',
  'FileUpload',
  'Dialog',
  'Tooltip',
  'Snackbar',
  'Popover',
  'Drawer',
  'Menu',
  'MenuItem',
  'Skeleton',
  'Spinner',
  'LinearProgress',
  'Alert',
  'Tabs',
  'Tab',
  'TabPanel',
  'Accordion',
  'AccordionItem',
  'Breadcrumb',
  'BreadcrumbItem',
  'Pagination',
  'AppBar',
  'Stepper',
  'Step',
  'DataTable',
] as const;

// ─── Unit tests — all 49 exports ─────────────────────────────────────────────

describe('Svelte wrappers — unit', (): void => {
  /**
   * Verifies each expected name is exported as a Svelte 5 component (function).
   */
  it.each(expectedNames)('%s is exported as a Svelte component function', (name): void => {
    // ARRANGE / ACT
    const wrapper = (wrappers as Record<string, unknown>)[name];

    // ASSERT
    expect(wrapper).toBeTruthy();
    expect(typeof wrapper).toBe('function');

    // CLEANUP — none
  });
});

// ─── Render tests — representative subset ────────────────────────────────────

describe('Svelte wrappers — render', (): void => {
  /** Container element appended to the DOM before each render test. */
  let container: HTMLElement;

  beforeEach((): void => {
    // ARRANGE
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach((): void => {
    // CLEANUP
    document.body.removeChild(container);
  });

  it('Button renders a mu-button element', (): void => {
    // ARRANGE
    const ButtonComponent = wrappers.Button as typeof Button;

    // ACT
    const app = mount(ButtonComponent, {target: container, props: {color: 'primary'}});

    // ASSERT
    expect(container.querySelector('mu-button')).not.toBeNull();

    // CLEANUP
    unmount(app);
  });

  it('Checkbox renders a mu-checkbox element', (): void => {
    // ARRANGE
    const CheckboxComponent = wrappers.Checkbox as typeof Checkbox;

    // ACT
    const app = mount(CheckboxComponent, {target: container, props: {label: 'Test'}});

    // ASSERT
    expect(container.querySelector('mu-checkbox')).not.toBeNull();

    // CLEANUP
    unmount(app);
  });

  it('TextField renders a mu-text-field element', (): void => {
    // ARRANGE
    const TextFieldComponent = wrappers.TextField as typeof TextField;

    // ACT
    const app = mount(TextFieldComponent, {target: container, props: {label: 'Name'}});

    // ASSERT
    expect(container.querySelector('mu-text-field')).not.toBeNull();

    // CLEANUP
    unmount(app);
  });

  it('Button forwards color prop to the custom element as a DOM property', (): void => {
    // ARRANGE
    const ButtonComponent = wrappers.Button as typeof Button;

    // ACT
    const app = mount(ButtonComponent, {target: container, props: {color: 'primary'}});
    const el = container.querySelector('mu-button') as HTMLElement & {color?: string};

    // ASSERT
    expect(el).not.toBeNull();
    expect(el.color).toBe('primary');

    // CLEANUP
    unmount(app);
  });

  it('Checkbox forwards disabled prop to the custom element', (): void => {
    // ARRANGE
    const CheckboxComponent = wrappers.Checkbox as typeof Checkbox;

    // ACT
    const app = mount(CheckboxComponent, {
      target: container,
      props: {label: 'Disabled', disabled: true},
    });
    const el = container.querySelector('mu-checkbox') as HTMLElement & {disabled?: boolean};

    // ASSERT
    expect(el).not.toBeNull();
    expect(el.disabled).toBe(true);

    // CLEANUP
    unmount(app);
  });
});
