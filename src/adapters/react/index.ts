/**
 * React wrapper components for the Mu component library.
 *
 * Each wrapper is generated with `createComponent` from `@lit/react`, which
 * bridges Web Component properties and custom events to idiomatic React props.
 *
 * Requires React ≥ 16.8 as a peer dependency.
 * @example
 * ```tsx
 * import {Button, Chip, TextField} from 'lit-poc/react';
 *
 * function App() {
 *   return (
 *     <>
 *       <Button color="primary">Save</Button>
 *       <Chip label="React" deletable onDelete={() => console.log('deleted')} />
 *       <TextField label="Name" onChange={(e) => console.log(e)} />
 *     </>
 *   );
 * }
 * ```
 */
import React from 'react';
import {createComponent} from '@lit/react';

// ─── Component class imports (side-effect: registers custom elements) ─────────
import {MuAvatar} from '../../avatar/mu-avatar.js';
import {MuBadge} from '../../badge/mu-badge.js';
import {MuButton} from '../../button/mu-button.js';
import {MuCard, MuCardHeader, MuCardContent, MuCardActions} from '../../card/mu-card.js';
import {MuChip} from '../../chip/mu-chip.js';
import {MuDivider} from '../../divider/mu-divider.js';
import {MuIcon} from '../../icon/mu-icon.js';
import {MuList} from '../../list/mu-list.js';
import {MuListItem} from '../../list/mu-list-item.js';
import {MuTypography} from '../../typography/mu-typography.js';
import {MuThemeProvider} from '../../theme/mu-theme-provider.js';
import {MuCheckbox} from '../../checkbox/mu-checkbox.js';
import {MuRadio} from '../../radio/mu-radio.js';
import {MuRadioGroup} from '../../radio/mu-radio-group.js';
import {MuSwitch} from '../../switch/mu-switch.js';
import {MuTextField} from '../../text-field/mu-text-field.js';
import {MuSelect} from '../../select/mu-select.js';
import {MuDialog} from '../../dialog/mu-dialog.js';
import {MuTooltip} from '../../tooltip/mu-tooltip.js';
import {MuSnackbar} from '../../snackbar/mu-snackbar.js';
import {MuSkeleton} from '../../skeleton/mu-skeleton.js';
import {MuSpinner} from '../../spinner/mu-spinner.js';
import {MuLinearProgress} from '../../linear-progress/mu-linear-progress.js';
import {MuAlert} from '../../alert/mu-alert.js';
import {MuTabs} from '../../tabs/mu-tabs.js';
import {MuTab} from '../../tabs/mu-tab.js';
import {MuTabPanel} from '../../tabs/mu-tab-panel.js';
import {MuAccordion} from '../../accordion/mu-accordion.js';
import {MuAccordionItem} from '../../accordion/mu-accordion-item.js';
import {MuBreadcrumb} from '../../breadcrumb/mu-breadcrumb.js';
import {MuBreadcrumbItem} from '../../breadcrumb/mu-breadcrumb-item.js';
import {MuPagination} from '../../pagination/mu-pagination.js';
import {MuAppBar} from '../../app-bar/mu-app-bar.js';
import {MuDrawer} from '../../drawer/mu-drawer.js';
import {MuLocaleProvider} from '../../i18n/mu-locale-provider.js';

// ─── Layout & Display ─────────────────────────────────────────────────────────

/** React wrapper for `<mu-avatar>`. */
export const Avatar = createComponent({
  tagName: 'mu-avatar',
  elementClass: MuAvatar,
  react: React,
});

/** React wrapper for `<mu-badge>`. */
export const Badge = createComponent({
  tagName: 'mu-badge',
  elementClass: MuBadge,
  react: React,
});

/** React wrapper for `<mu-button>`. */
export const Button = createComponent({
  tagName: 'mu-button',
  elementClass: MuButton,
  react: React,
});

/** React wrapper for `<mu-card>`. */
export const Card = createComponent({
  tagName: 'mu-card',
  elementClass: MuCard,
  react: React,
});

/** React wrapper for `<mu-card-header>`. */
export const CardHeader = createComponent({
  tagName: 'mu-card-header',
  elementClass: MuCardHeader,
  react: React,
});

/** React wrapper for `<mu-card-content>`. */
export const CardContent = createComponent({
  tagName: 'mu-card-content',
  elementClass: MuCardContent,
  react: React,
});

/** React wrapper for `<mu-card-actions>`. */
export const CardActions = createComponent({
  tagName: 'mu-card-actions',
  elementClass: MuCardActions,
  react: React,
});

/**
 * React wrapper for `<mu-chip>`.
 * @event onDelete - Fired when the delete button is clicked on a deletable chip.
 */
export const Chip = createComponent({
  tagName: 'mu-chip',
  elementClass: MuChip,
  react: React,
  events: {
    onDelete: 'delete',
  },
});

/** React wrapper for `<mu-divider>`. */
export const Divider = createComponent({
  tagName: 'mu-divider',
  elementClass: MuDivider,
  react: React,
});

/** React wrapper for `<mu-icon>`. */
export const Icon = createComponent({
  tagName: 'mu-icon',
  elementClass: MuIcon,
  react: React,
});

/** React wrapper for `<mu-list>`. */
export const List = createComponent({
  tagName: 'mu-list',
  elementClass: MuList,
  react: React,
});

/** React wrapper for `<mu-list-item>`. */
export const ListItem = createComponent({
  tagName: 'mu-list-item',
  elementClass: MuListItem,
  react: React,
});

/** React wrapper for `<mu-typography>`. */
export const Typography = createComponent({
  tagName: 'mu-typography',
  elementClass: MuTypography,
  react: React,
});

// ─── Theme ────────────────────────────────────────────────────────────────────

/** React wrapper for `<mu-theme-provider>`. */
export const ThemeProvider = createComponent({
  tagName: 'mu-theme-provider',
  elementClass: MuThemeProvider,
  react: React,
});

// ─── Form Inputs ──────────────────────────────────────────────────────────────

/**
 * React wrapper for `<mu-checkbox>`.
 * @event onChange - Fired when the checked state changes.
 */
export const Checkbox = createComponent({
  tagName: 'mu-checkbox',
  elementClass: MuCheckbox,
  react: React,
  events: {
    onChange: 'change',
  },
});

/**
 * React wrapper for `<mu-radio>`.
 * @event onChange - Fired when this radio button is selected.
 */
export const Radio = createComponent({
  tagName: 'mu-radio',
  elementClass: MuRadio,
  react: React,
  events: {
    onChange: 'change',
  },
});

/** React wrapper for `<mu-radio-group>`. */
export const RadioGroup = createComponent({
  tagName: 'mu-radio-group',
  elementClass: MuRadioGroup,
  react: React,
});

/**
 * React wrapper for `<mu-switch>`.
 * @event onChange - Fired when the toggle state changes.
 */
export const Switch = createComponent({
  tagName: 'mu-switch',
  elementClass: MuSwitch,
  react: React,
  events: {
    onChange: 'change',
  },
});

/**
 * React wrapper for `<mu-text-field>`.
 * @event onChange - Fired when the input value changes on blur.
 */
export const TextField = createComponent({
  tagName: 'mu-text-field',
  elementClass: MuTextField,
  react: React,
  events: {
    onChange: 'change',
  },
});

/**
 * React wrapper for `<mu-select>`.
 * @event onChange - Fired when the selected option changes.
 */
export const Select = createComponent({
  tagName: 'mu-select',
  elementClass: MuSelect,
  react: React,
  events: {
    onChange: 'change',
  },
});

// ─── Overlays & Disclosure ────────────────────────────────────────────────────

/**
 * React wrapper for `<mu-dialog>`.
 * @event onOpen  - Fired when the dialog opens.
 * @event onClose - Fired when the dialog closes.
 */
export const Dialog = createComponent({
  tagName: 'mu-dialog',
  elementClass: MuDialog,
  react: React,
  events: {
    onOpen: 'mu-open',
    onClose: 'mu-close',
  },
});

/** React wrapper for `<mu-tooltip>`. */
export const Tooltip = createComponent({
  tagName: 'mu-tooltip',
  elementClass: MuTooltip,
  react: React,
});

/**
 * React wrapper for `<mu-snackbar>`.
 * @event onClose  - Fired when the snackbar is dismissed.
 * @event onAction - Fired when the optional action button is clicked.
 */
export const Snackbar = createComponent({
  tagName: 'mu-snackbar',
  elementClass: MuSnackbar,
  react: React,
  events: {
    onClose: 'mu-close',
    onAction: 'mu-action',
  },
});

/**
 * React wrapper for `<mu-drawer>`.
 * @event onOpen  - Fired when the drawer opens.
 * @event onClose - Fired when the drawer closes.
 */
export const Drawer = createComponent({
  tagName: 'mu-drawer',
  elementClass: MuDrawer,
  react: React,
  events: {
    onOpen: 'mu-open',
    onClose: 'mu-close',
  },
});

// ─── Feedback & Status ────────────────────────────────────────────────────────

/** React wrapper for `<mu-skeleton>`. */
export const Skeleton = createComponent({
  tagName: 'mu-skeleton',
  elementClass: MuSkeleton,
  react: React,
});

/** React wrapper for `<mu-spinner>`. */
export const Spinner = createComponent({
  tagName: 'mu-spinner',
  elementClass: MuSpinner,
  react: React,
});

/**
 * React wrapper for `<mu-linear-progress>`.
 * @event onComplete - Fired when determinate progress reaches 100.
 */
export const LinearProgress = createComponent({
  tagName: 'mu-linear-progress',
  elementClass: MuLinearProgress,
  react: React,
  events: {
    onComplete: 'mu-complete',
  },
});

/**
 * React wrapper for `<mu-alert>`.
 * @event onClose - Fired when the close button is clicked.
 */
export const Alert = createComponent({
  tagName: 'mu-alert',
  elementClass: MuAlert,
  react: React,
  events: {
    onClose: 'mu-close',
  },
});

// ─── Navigation ───────────────────────────────────────────────────────────────

/**
 * React wrapper for `<mu-tabs>`.
 * @event onTabChange - Fired when the selected tab changes. Detail: `{ index: number }`.
 */
export const Tabs = createComponent({
  tagName: 'mu-tabs',
  elementClass: MuTabs,
  react: React,
  events: {
    onTabChange: 'tab-change',
  },
});

/** React wrapper for `<mu-tab>`. */
export const Tab = createComponent({
  tagName: 'mu-tab',
  elementClass: MuTab,
  react: React,
});

/** React wrapper for `<mu-tab-panel>`. */
export const TabPanel = createComponent({
  tagName: 'mu-tab-panel',
  elementClass: MuTabPanel,
  react: React,
});

/** React wrapper for `<mu-accordion>`. */
export const Accordion = createComponent({
  tagName: 'mu-accordion',
  elementClass: MuAccordion,
  react: React,
});

/**
 * React wrapper for `<mu-accordion-item>`.
 * @event onAccordionToggle - Fired when the item is expanded or collapsed.
 *                            Detail: `{ expanded: boolean }`.
 */
export const AccordionItem = createComponent({
  tagName: 'mu-accordion-item',
  elementClass: MuAccordionItem,
  react: React,
  events: {
    onAccordionToggle: 'accordion-toggle',
  },
});

/** React wrapper for `<mu-breadcrumb>`. */
export const Breadcrumb = createComponent({
  tagName: 'mu-breadcrumb',
  elementClass: MuBreadcrumb,
  react: React,
});

/** React wrapper for `<mu-breadcrumb-item>`. */
export const BreadcrumbItem = createComponent({
  tagName: 'mu-breadcrumb-item',
  elementClass: MuBreadcrumbItem,
  react: React,
});

/**
 * React wrapper for `<mu-pagination>`.
 * @event onPageChange - Fired when the active page changes. Detail: `{ page: number }`.
 */
export const Pagination = createComponent({
  tagName: 'mu-pagination',
  elementClass: MuPagination,
  react: React,
  events: {
    onPageChange: 'page-change',
  },
});

/** React wrapper for `<mu-app-bar>`. */
export const AppBar = createComponent({
  tagName: 'mu-app-bar',
  elementClass: MuAppBar,
  react: React,
});

// ─── i18n ─────────────────────────────────────────────────────────────────────

/** React wrapper for `<mu-locale-provider>`. */
export const LocaleProvider = createComponent({
  tagName: 'mu-locale-provider',
  elementClass: MuLocaleProvider,
  react: React,
});
