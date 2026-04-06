/**
 * Svelte 5 wrapper components for the Mu component library.
 *
 * Each wrapper is a thin Svelte 5 component (`.svelte`) that renders the
 * corresponding web component tag. Props are strongly-typed via a per-file
 * `Props` interface.  Any undeclared attributes, data-attributes, and native
 * DOM event listeners are forwarded to the custom element via an `...rest`
 * spread, so consumers can attach Svelte 5 `on*` event handlers (e.g.
 * `onclick`, `onchange`) without extra wiring.
 *
 * Custom events with hyphenated names (e.g. `mu-close`, `tab-change`) should
 * be handled with `bind:this` and `addEventListener` on the host element.
 *
 * Requires Svelte ≥ 5.0 as a peer dependency.
 *
 * @example
 * ```svelte
 * <script>
 *   import {Button, Checkbox, TextField} from 'lit-poc/svelte';
 * </script>
 *
 * <Button color="primary" onclick={() => save()}>Save</Button>
 * <Checkbox label="Agree" onchange={onCheck} />
 * <TextField label="Name" onchange={onInput} />
 * ```
 */

// ─── Layout & Display ─────────────────────────────────────────────────────────
export {default as Avatar} from './Avatar.svelte';
export {default as Badge} from './Badge.svelte';
export {default as Button} from './Button.svelte';
export {default as Card} from './Card.svelte';
export {default as CardHeader} from './CardHeader.svelte';
export {default as CardContent} from './CardContent.svelte';
export {default as CardActions} from './CardActions.svelte';
export {default as Chip} from './Chip.svelte';
export {default as ChipInput} from './ChipInput.svelte';
export {default as Divider} from './Divider.svelte';
export {default as Icon} from './Icon.svelte';
export {default as List} from './List.svelte';
export {default as ListItem} from './ListItem.svelte';
export {default as Typography} from './Typography.svelte';

// ─── Theme / i18n ─────────────────────────────────────────────────────────────
export {default as ThemeProvider} from './ThemeProvider.svelte';
export {default as LocaleProvider} from './LocaleProvider.svelte';

// ─── Form Controls ────────────────────────────────────────────────────────────
export {default as Checkbox} from './Checkbox.svelte';
export {default as Radio} from './Radio.svelte';
export {default as RadioGroup} from './RadioGroup.svelte';
export {default as Switch} from './Switch.svelte';
export {default as TextField} from './TextField.svelte';
export {default as Select} from './Select.svelte';
export {default as Slider} from './Slider.svelte';
export {default as Rating} from './Rating.svelte';
export {default as Autocomplete} from './Autocomplete.svelte';
export {default as FileUpload} from './FileUpload.svelte';

// ─── Overlays & Disclosure ────────────────────────────────────────────────────
export {default as Dialog} from './Dialog.svelte';
export {default as Tooltip} from './Tooltip.svelte';
export {default as Snackbar} from './Snackbar.svelte';
export {default as Popover} from './Popover.svelte';
export {default as Drawer} from './Drawer.svelte';
export {default as Menu} from './Menu.svelte';
export {default as MenuItem} from './MenuItem.svelte';

// ─── Feedback & Status ────────────────────────────────────────────────────────
export {default as Skeleton} from './Skeleton.svelte';
export {default as Spinner} from './Spinner.svelte';
export {default as LinearProgress} from './LinearProgress.svelte';
export {default as Alert} from './Alert.svelte';

// ─── Navigation ──────────────────────────────────────────────────────────────
export {default as Tabs} from './Tabs.svelte';
export {default as Tab} from './Tab.svelte';
export {default as TabPanel} from './TabPanel.svelte';
export {default as Accordion} from './Accordion.svelte';
export {default as AccordionItem} from './AccordionItem.svelte';
export {default as Breadcrumb} from './Breadcrumb.svelte';
export {default as BreadcrumbItem} from './BreadcrumbItem.svelte';
export {default as Pagination} from './Pagination.svelte';
export {default as AppBar} from './AppBar.svelte';

// ─── Complex / Composite ──────────────────────────────────────────────────────
export {default as Stepper} from './Stepper.svelte';
export {default as Step} from './Step.svelte';
export {default as DataTable} from './DataTable.svelte';
