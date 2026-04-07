/**
 * Vue 3 wrapper components for the Mu component library.
 *
 * Each wrapper is a typed `defineComponent` that renders the corresponding
 * web component tag via `h()`. The `inheritAttrs: false` + attr-spread pattern
 * passes all Vue event listeners (including custom-event shorthands like
 * `@mu-close`) and HTML attributes straight through to the native element.
 *
 * Requires Vue ≥ 3.0 as a peer dependency.
 *
 * @example
 * ```ts
 * import {Button, Checkbox, TextField} from 'lit-poc/vue';
 *
 * // In a Vue template:
 * // <Button color="primary" @click="save">Save</Button>
 * // <Checkbox label="Agree" @change="onCheck" />
 * // <TextField label="Name" @change="onInput" />
 * ```
 */
import {defineComponent, h, type PropType, type VNode} from 'vue';

// ─── Component class imports (side-effect: registers custom elements) ─────────
import '../../avatar/mu-avatar.js';
import '../../badge/mu-badge.js';
import '../../button/mu-button.js';
import '../../card/mu-card.js';
import '../../chip/mu-chip.js';
import '../../chip/mu-chip-input.js';
import '../../divider/mu-divider.js';
import '../../icon/mu-icon.js';
import '../../list/mu-list.js';
import '../../list/mu-list-item.js';
import '../../typography/mu-typography.js';
import '../../theme/mu-theme-provider.js';
import '../../core/i18n/mu-locale-provider.js';
import '../../checkbox/mu-checkbox.js';
import '../../radio/mu-radio.js';
import '../../radio/mu-radio-group.js';
import '../../switch/mu-switch.js';
import '../../text-field/mu-text-field.js';
import '../../select/mu-select.js';
import '../../slider/mu-slider.js';
import '../../autocomplete/mu-autocomplete.js';
import '../../file-upload/mu-file-upload.js';
import '../../rating/mu-rating.js';
import '../../dialog/mu-dialog.js';
import '../../tooltip/mu-tooltip.js';
import '../../snackbar/mu-snackbar.js';
import '../../popover/mu-popover.js';
import '../../skeleton/mu-skeleton.js';
import '../../spinner/mu-spinner.js';
import '../../linear-progress/mu-linear-progress.js';
import '../../alert/mu-alert.js';
import '../../tabs/mu-tabs.js';
import '../../tabs/mu-tab.js';
import '../../tabs/mu-tab-panel.js';
import '../../accordion/mu-accordion.js';
import '../../accordion/mu-accordion-item.js';
import '../../breadcrumb/mu-breadcrumb.js';
import '../../breadcrumb/mu-breadcrumb-item.js';
import '../../pagination/mu-pagination.js';
import '../../app-bar/mu-app-bar.js';
import '../../drawer/mu-drawer.js';
import '../../menu/mu-menu.js';
import '../../menu/mu-menu-item.js';
import '../../stepper/mu-stepper.js';
import '../../stepper/mu-step.js';
import '../../data-table/mu-data-table.js';

// ─── Layout & Display ─────────────────────────────────────────────────────────

/** Vue 3 wrapper for `<mu-avatar>`. */
export const Avatar = defineComponent({
  name: 'MuAvatar',
  inheritAttrs: false,
  props: {
    /** Image URL to display inside the avatar. */
    src: String,
    /** Alternative text for the image. */
    alt: String,
    /** Size of the avatar in pixels. */
    size: Number,
    /** Shape of the avatar. */
    shape: String as PropType<'circle' | 'square'>,
  },
  /**
   * Renders the mu-avatar custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-avatar', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-badge>`. */
export const Badge = defineComponent({
  name: 'MuBadge',
  inheritAttrs: false,
  props: {
    /** Text content shown inside the badge. */
    content: String,
    /** Color variant. */
    color: String as PropType<
      'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning'
    >,
    /** Max numeric value before the badge shows the `max+` overflow label. */
    max: Number,
    /** Whether to show a plain dot with no content. */
    dot: Boolean,
  },
  /**
   * Renders the mu-badge custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-badge', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-button>`. */
export const Button = defineComponent({
  name: 'MuButton',
  inheritAttrs: false,
  props: {
    /** Color variant of the button. */
    color: String as PropType<
      'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning'
    >,
    /** Whether the button is disabled. */
    disabled: Boolean,
    /** Visual style variant. */
    variant: String as PropType<'filled' | 'outlined' | 'text' | 'icon'>,
    /** Size of the button. */
    size: String as PropType<'small' | 'medium' | 'large'>,
    /** Accessible label (used when variant is "icon"). */
    label: String,
  },
  /**
   * Renders the mu-button custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-button', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-card>`. */
export const Card = defineComponent({
  name: 'MuCard',
  inheritAttrs: false,
  props: {
    /** Elevation shadow level (0–4). */
    elevation: Number,
    /** Whether the card is outlined (no shadow). */
    outlined: Boolean,
  },
  /**
   * Renders the mu-card custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-card', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-card-header>`. */
export const CardHeader = defineComponent({
  name: 'MuCardHeader',
  inheritAttrs: false,
  props: {
    /** Main heading text. */
    title: String,
    /** Secondary subheading text. */
    subheader: String,
  },
  /**
   * Renders the mu-card-header custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-card-header', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-card-content>`. */
export const CardContent = defineComponent({
  name: 'MuCardContent',
  inheritAttrs: false,
  /**
   * Renders the mu-card-content custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-card-content', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-card-actions>`. */
export const CardActions = defineComponent({
  name: 'MuCardActions',
  inheritAttrs: false,
  props: {
    /** Horizontal alignment of action buttons. */
    align: String as PropType<'start' | 'end' | 'center'>,
  },
  /**
   * Renders the mu-card-actions custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-card-actions', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-chip>`.
 * Listen for the `delete` event with `@delete`.
 */
export const Chip = defineComponent({
  name: 'MuChip',
  inheritAttrs: false,
  props: {
    /** Text label displayed inside the chip. */
    label: String,
    /** Color variant. */
    color: String as PropType<
      'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning'
    >,
    /** Whether the chip shows a delete/close button. */
    deletable: Boolean,
    /** Whether the chip is in a selected state. */
    selected: Boolean,
    /** Whether the chip is disabled. */
    disabled: Boolean,
  },
  /**
   * Renders the mu-chip custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-chip', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-chip-input>`.
 * Emits `change` when the chip list changes.
 */
export const ChipInput = defineComponent({
  name: 'MuChipInput',
  inheritAttrs: false,
  props: {
    /** Current list of chip string values. */
    chips: Array as PropType<string[]>,
    /** Input placeholder text. */
    placeholder: String,
    /** Whether the chip input is disabled. */
    disabled: Boolean,
  },
  /**
   * Renders the mu-chip-input custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-chip-input', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-divider>`. */
export const Divider = defineComponent({
  name: 'MuDivider',
  inheritAttrs: false,
  props: {
    /** Orientation of the divider line. */
    orientation: String as PropType<'horizontal' | 'vertical'>,
  },
  /**
   * Renders the mu-divider custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-divider', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-icon>`. */
export const Icon = defineComponent({
  name: 'MuIcon',
  inheritAttrs: false,
  props: {
    /** Icon name from the configured icon set. */
    name: String,
    /** Color applied to the icon. */
    color: String,
    /** Icon size in pixels. */
    size: Number,
  },
  /**
   * Renders the mu-icon custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-icon', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-list>`. */
export const List = defineComponent({
  name: 'MuList',
  inheritAttrs: false,
  props: {
    /** When true, adds a dense styling to reduce spacing. */
    dense: Boolean,
  },
  /**
   * Renders the mu-list custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-list', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-list-item>`. */
export const ListItem = defineComponent({
  name: 'MuListItem',
  inheritAttrs: false,
  props: {
    /** Primary text displayed in the list item. */
    primary: String,
    /** Secondary text shown below the primary text. */
    secondary: String,
    /** Whether the item is disabled. */
    disabled: Boolean,
  },
  /**
   * Renders the mu-list-item custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-list-item', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-typography>`. */
export const Typography = defineComponent({
  name: 'MuTypography',
  inheritAttrs: false,
  props: {
    /** Typographic variant following the design scale. */
    variant: String as PropType<
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'subtitle1'
      | 'subtitle2'
      | 'body1'
      | 'body2'
      | 'caption'
      | 'overline'
      | 'button'
    >,
    /** Colour applied to the text. */
    color: String,
  },
  /**
   * Renders the mu-typography custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-typography', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

// ─── Theme / i18n ─────────────────────────────────────────────────────────────

/** Vue 3 wrapper for `<mu-theme-provider>`. */
export const ThemeProvider = defineComponent({
  name: 'MuThemeProvider',
  inheritAttrs: false,
  props: {
    /** Active colour scheme. */
    theme: String as PropType<'light' | 'dark'>,
  },
  /**
   * Renders the mu-theme-provider custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-theme-provider', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-locale-provider>`. */
export const LocaleProvider = defineComponent({
  name: 'MuLocaleProvider',
  inheritAttrs: false,
  props: {
    /** BCP-47 locale tag, e.g. `en-US`, `de-DE`. */
    locale: String,
  },
  /**
   * Renders the mu-locale-provider custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-locale-provider', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

// ─── Form Controls ────────────────────────────────────────────────────────────

/**
 * Vue 3 wrapper for `<mu-checkbox>`.
 * Use `@change` to receive `CustomEvent<{checked: boolean}>`.
 */
export const Checkbox = defineComponent({
  name: 'MuCheckbox',
  inheritAttrs: false,
  props: {
    /** Whether the checkbox is checked. */
    checked: Boolean,
    /** Whether the checkbox is in an indeterminate state. */
    indeterminate: Boolean,
    /** Accessible label for the checkbox. */
    label: String,
    /** Whether the checkbox is disabled. */
    disabled: Boolean,
    /** Whether the checkbox is required. */
    required: Boolean,
    /** Form field name. */
    name: String,
    /** Form field value when checked. */
    value: String,
  },
  /**
   * Renders the mu-checkbox custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-checkbox', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-radio>`.
 * Use `@change` to receive the selection event.
 */
export const Radio = defineComponent({
  name: 'MuRadio',
  inheritAttrs: false,
  props: {
    /** Value submitted when this radio is selected. */
    value: String,
    /** Whether this radio is checked. */
    checked: Boolean,
    /** Accessible label. */
    label: String,
    /** Whether the radio is disabled. */
    disabled: Boolean,
    /** Form field name. */
    name: String,
  },
  /**
   * Renders the mu-radio custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-radio', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-radio-group>`. */
export const RadioGroup = defineComponent({
  name: 'MuRadioGroup',
  inheritAttrs: false,
  props: {
    /** Currently selected value. */
    value: String,
    /** Whether all child radios are disabled. */
    disabled: Boolean,
    /** Form field name shared by all child radios. */
    name: String,
    /** Label for the group (used as `aria-label`). */
    label: String,
  },
  /**
   * Renders the mu-radio-group custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-radio-group', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-switch>`.
 * Use `@change` to receive `CustomEvent<{checked: boolean}>`.
 */
export const Switch = defineComponent({
  name: 'MuSwitch',
  inheritAttrs: false,
  props: {
    /** Whether the switch is toggled on. */
    checked: Boolean,
    /** Accessible label. */
    label: String,
    /** Whether the switch is disabled. */
    disabled: Boolean,
    /** Whether the switch is required. */
    required: Boolean,
    /** Form field name. */
    name: String,
  },
  /**
   * Renders the mu-switch custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-switch', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-text-field>`.
 * Use `@change` for committed values or `@input` for real-time updates.
 */
export const TextField = defineComponent({
  name: 'MuTextField',
  inheritAttrs: false,
  props: {
    /** Current value of the field. */
    value: String,
    /** Visible label for the field. */
    label: String,
    /** Placeholder text shown when the field is empty. */
    placeholder: String,
    /** Helper text displayed below the field. */
    helper: String,
    /** Error message (sets field to error state when non-empty). */
    error: String,
    /** Whether the field is disabled. */
    disabled: Boolean,
    /** Whether the field is required. */
    required: Boolean,
    /** Whether the field is read-only. */
    readonly: Boolean,
    /** Visual style variant. */
    variant: String as PropType<'filled' | 'outlined'>,
    /** Input type (text, email, password, number, …). */
    type: String,
    /** Whether the field renders as a textarea. */
    multiline: Boolean,
    /** Number of visible rows when multiline. */
    rows: Number,
    /** Whether to show a character count below the field. */
    showCharCount: Boolean,
    /** Maximum character count when showCharCount is true. */
    maxlength: Number,
    /** Form field name. */
    name: String,
  },
  /**
   * Renders the mu-text-field custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-text-field', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-select>`.
 * Use `@change` to receive the new selected value.
 */
export const Select = defineComponent({
  name: 'MuSelect',
  inheritAttrs: false,
  props: {
    /** Currently selected value (or array of values when multiple). */
    value: [String, Array] as PropType<string | string[]>,
    /** Visible label above the select. */
    label: String,
    /** Placeholder option text. */
    placeholder: String,
    /** Helper text below the select. */
    helper: String,
    /** Error message. */
    error: String,
    /** Whether the select is disabled. */
    disabled: Boolean,
    /** Whether the select is required. */
    required: Boolean,
    /** Whether multiple options can be selected. */
    multiple: Boolean,
    /** Visual style variant. */
    variant: String as PropType<'filled' | 'outlined'>,
    /** Form field name. */
    name: String,
  },
  /**
   * Renders the mu-select custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-select', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-slider>`.
 * Use `@change` to receive `CustomEvent<{value: number}>`.
 */
export const Slider = defineComponent({
  name: 'MuSlider',
  inheritAttrs: false,
  props: {
    /** Current numeric value of the slider. */
    value: Number,
    /** Minimum allowed value. */
    min: Number,
    /** Maximum allowed value. */
    max: Number,
    /** Step increment per tick. */
    step: Number,
    /** Whether the slider is disabled. */
    disabled: Boolean,
    /** Accessible label for the slider. */
    label: String,
  },
  /**
   * Renders the mu-slider custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-slider', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-rating>`.
 * Use `@change` to receive `CustomEvent<{value: number}>`.
 */
export const Rating = defineComponent({
  name: 'MuRating',
  inheritAttrs: false,
  props: {
    /** Current rating value. */
    value: Number,
    /** Total number of stars. */
    max: Number,
    /** Step precision (1 for whole stars, 0.5 for half stars). */
    precision: Number,
    /** Whether the rating is read-only. */
    readonly: Boolean,
    /** Whether the rating is disabled. */
    disabled: Boolean,
    /** Accessible label applied to the radiogroup. */
    label: String,
  },
  /**
   * Renders the mu-rating custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-rating', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-autocomplete>`.
 * Use `@change` to receive the selected value.
 */
export const Autocomplete = defineComponent({
  name: 'MuAutocomplete',
  inheritAttrs: false,
  props: {
    /** Current selected value. */
    value: String,
    /** Visible label above the input. */
    label: String,
    /** Placeholder text when the input is empty. */
    placeholder: String,
    /** List of label/value pairs shown as suggestions. */
    options: Array as PropType<ReadonlyArray<{label: string; value: string}>>,
    /** Whether the autocomplete is disabled. */
    disabled: Boolean,
    /** Whether a non-empty value is required. */
    required: Boolean,
    /** Minimum typed characters before the suggestion list opens. */
    minChars: Number,
  },
  /**
   * Renders the mu-autocomplete custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-autocomplete', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-file-upload>`.
 * Use `@mu-change` to receive `CustomEvent<{files: FileList}>`.
 */
export const FileUpload = defineComponent({
  name: 'MuFileUpload',
  inheritAttrs: false,
  props: {
    /** Whether multiple files may be selected. */
    multiple: Boolean,
    /** Accepted MIME types or file extensions, e.g. `image/*`. */
    accept: String,
    /** Whether the dropzone is disabled. */
    disabled: Boolean,
    /** Label text shown in the dropzone. */
    label: String,
    /** Drag-and-drop instruction text. */
    dragLabel: String,
  },
  /**
   * Renders the mu-file-upload custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-file-upload', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

// ─── Overlays & Disclosure ────────────────────────────────────────────────────

/**
 * Vue 3 wrapper for `<mu-dialog>`.
 * Use `@mu-open` and `@mu-close` to react to dialog state changes.
 */
export const Dialog = defineComponent({
  name: 'MuDialog',
  inheritAttrs: false,
  props: {
    /** Whether the dialog is open. */
    open: Boolean,
    /** Title shown in the dialog header. */
    heading: String,
    /** Whether to show the close button. */
    showClose: Boolean,
    /** Whether the dialog occupies the full viewport. */
    fullscreen: Boolean,
    /** Whether the dialog body scrolls independently. */
    scrollable: Boolean,
  },
  /**
   * Renders the mu-dialog custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-dialog', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-tooltip>`. */
export const Tooltip = defineComponent({
  name: 'MuTooltip',
  inheritAttrs: false,
  props: {
    /** Text content of the tooltip. */
    content: String,
    /** Preferred placement relative to the trigger. */
    placement: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    /** Delay before the tooltip appears (ms). */
    delay: Number,
  },
  /**
   * Renders the mu-tooltip custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-tooltip', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-snackbar>`.
 * Use `@mu-close` and `@mu-action` to handle dismissal and action clicks.
 */
export const Snackbar = defineComponent({
  name: 'MuSnackbar',
  inheritAttrs: false,
  props: {
    /** Message text displayed in the snackbar. */
    message: String,
    /** Whether the snackbar is visible. */
    open: Boolean,
    /** Duration in ms before auto-dismissal (0 = persist). */
    duration: Number,
    /** Label for the optional action button. */
    actionLabel: String,
    /** Variant controlling icon and colour. */
    variant: String as PropType<'default' | 'success' | 'error' | 'warning' | 'info'>,
  },
  /**
   * Renders the mu-snackbar custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-snackbar', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-popover>`.
 * Use `@mu-open` and `@mu-close` to react to visibility changes.
 */
export const Popover = defineComponent({
  name: 'MuPopover',
  inheritAttrs: false,
  props: {
    /** Whether the popover is visible. */
    open: Boolean,
    /** Preferred placement relative to the trigger. */
    placement: String as PropType<
      'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end'
    >,
    /** Whether clicking outside closes the popover. */
    closeOnOutsideClick: Boolean,
  },
  /**
   * Renders the mu-popover custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-popover', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-drawer>`.
 * Use `@mu-open` and `@mu-close` to react to drawer state changes.
 */
export const Drawer = defineComponent({
  name: 'MuDrawer',
  inheritAttrs: false,
  props: {
    /** Whether the drawer is open. */
    open: Boolean,
    /** Side from which the drawer slides in. */
    anchor: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
    /** Whether clicking the backdrop closes the drawer. */
    modal: Boolean,
  },
  /**
   * Renders the mu-drawer custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-drawer', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-menu>`.
 * Use `@mu-open` and `@mu-close` to observe menu visibility.
 */
export const Menu = defineComponent({
  name: 'MuMenu',
  inheritAttrs: false,
  props: {
    /** Whether the menu list is visible. */
    open: Boolean,
    /** Preferred anchor corner for the floating list. */
    placement: String as PropType<'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'>,
  },
  /**
   * Renders the mu-menu custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-menu', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-menu-item>`.
 * Use `@mu-select` to receive `CustomEvent<{label: string}>`.
 */
export const MenuItem = defineComponent({
  name: 'MuMenuItem',
  inheritAttrs: false,
  props: {
    /** Text label of the menu item. */
    label: String,
    /** Whether the menu item is disabled. */
    disabled: Boolean,
  },
  /**
   * Renders the mu-menu-item custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-menu-item', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

// ─── Feedback & Status ────────────────────────────────────────────────────────

/** Vue 3 wrapper for `<mu-skeleton>`. */
export const Skeleton = defineComponent({
  name: 'MuSkeleton',
  inheritAttrs: false,
  props: {
    /** Shape variant of the skeleton placeholder. */
    variant: String as PropType<'text' | 'circular' | 'rectangular'>,
    /** Explicit width of the skeleton. */
    width: String,
    /** Explicit height of the skeleton. */
    height: String,
    /** Whether the skeleton should animate. */
    animation: String as PropType<'pulse' | 'wave' | 'none'>,
  },
  /**
   * Renders the mu-skeleton custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-skeleton', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-spinner>`. */
export const Spinner = defineComponent({
  name: 'MuSpinner',
  inheritAttrs: false,
  props: {
    /** Accessible label announced to screen readers. */
    label: String,
    /** Diameter of the spinner in pixels. */
    size: Number,
    /** Color variant. */
    color: String,
  },
  /**
   * Renders the mu-spinner custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-spinner', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-linear-progress>`.
 * Use `@mu-complete` to detect when determinate progress reaches 100.
 */
export const LinearProgress = defineComponent({
  name: 'MuLinearProgress',
  inheritAttrs: false,
  props: {
    /** Progress percentage (0–100). Omit for indeterminate mode. */
    value: Number,
    /** Whether rendering in indeterminate mode. */
    indeterminate: Boolean,
    /** Color variant. */
    color: String as PropType<'primary' | 'secondary' | 'success' | 'error' | 'warning'>,
    /** Accessible label. */
    label: String,
  },
  /**
   * Renders the mu-linear-progress custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-linear-progress', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-alert>`.
 * Use `@mu-close` to handle dismissal.
 */
export const Alert = defineComponent({
  name: 'MuAlert',
  inheritAttrs: false,
  props: {
    /** Severity level controlling icon and colour. */
    severity: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    /** Whether to show a close button. */
    closable: Boolean,
    /** Alert title text. */
    title: String,
  },
  /**
   * Renders the mu-alert custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-alert', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

// ─── Navigation ───────────────────────────────────────────────────────────────

/**
 * Vue 3 wrapper for `<mu-tabs>`.
 * Use `@tab-change` to receive `CustomEvent<{index: number}>`.
 */
export const Tabs = defineComponent({
  name: 'MuTabs',
  inheritAttrs: false,
  props: {
    /** Index of the currently active tab (zero-based). */
    activeTab: Number,
    /** Orientation of the tab list. */
    orientation: String as PropType<'horizontal' | 'vertical'>,
    /** Whether the tab list scrolls when it overflows. */
    scrollable: Boolean,
  },
  /**
   * Renders the mu-tabs custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-tabs', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-tab>`. */
export const Tab = defineComponent({
  name: 'MuTab',
  inheritAttrs: false,
  props: {
    /** Text label of the tab. */
    label: String,
    /** Whether the tab is disabled. */
    disabled: Boolean,
    /** Index managed internally by the parent mu-tabs. */
    index: Number,
  },
  /**
   * Renders the mu-tab custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-tab', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-tab-panel>`. */
export const TabPanel = defineComponent({
  name: 'MuTabPanel',
  inheritAttrs: false,
  props: {
    /** Index managed internally by the parent mu-tabs. */
    index: Number,
  },
  /**
   * Renders the mu-tab-panel custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-tab-panel', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-accordion>`. */
export const Accordion = defineComponent({
  name: 'MuAccordion',
  inheritAttrs: false,
  props: {
    /** Whether only one item may be expanded at a time. */
    single: Boolean,
  },
  /**
   * Renders the mu-accordion custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-accordion', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-accordion-item>`.
 * Use `@accordion-toggle` to receive `CustomEvent<{expanded: boolean}>`.
 */
export const AccordionItem = defineComponent({
  name: 'MuAccordionItem',
  inheritAttrs: false,
  props: {
    /** Heading text shown in the collapsed header. */
    heading: String,
    /** Whether the item is currently expanded. */
    expanded: Boolean,
    /** Whether the item is disabled. */
    disabled: Boolean,
  },
  /**
   * Renders the mu-accordion-item custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-accordion-item', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-breadcrumb>`. */
export const Breadcrumb = defineComponent({
  name: 'MuBreadcrumb',
  inheritAttrs: false,
  props: {
    /** `aria-label` for the breadcrumb navigation landmark. */
    label: String,
  },
  /**
   * Renders the mu-breadcrumb custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-breadcrumb', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-breadcrumb-item>`. */
export const BreadcrumbItem = defineComponent({
  name: 'MuBreadcrumbItem',
  inheritAttrs: false,
  props: {
    /** Navigation URL for this breadcrumb step. */
    href: String,
    /** Whether this is the current (last) breadcrumb item. */
    current: Boolean,
  },
  /**
   * Renders the mu-breadcrumb-item custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-breadcrumb-item', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-pagination>`.
 * Use `@page-change` to receive `CustomEvent<{page: number}>`.
 */
export const Pagination = defineComponent({
  name: 'MuPagination',
  inheritAttrs: false,
  props: {
    /** Currently active page (one-based). */
    page: Number,
    /** Total number of pages. */
    count: Number,
    /** Whether to disable all navigation. */
    disabled: Boolean,
    /** Number of sibling pages visible beside the active page. */
    siblingCount: Number,
  },
  /**
   * Renders the mu-pagination custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-pagination', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-app-bar>`. */
export const AppBar = defineComponent({
  name: 'MuAppBar',
  inheritAttrs: false,
  props: {
    /** Text displayed as the application title. */
    title: String,
    /** Elevation shadow depth (0–4). */
    elevation: Number,
    /** Colour variant. */
    color: String as PropType<'default' | 'primary' | 'secondary'>,
    /** ARIA landmark label. */
    label: String,
  },
  /**
   * Renders the mu-app-bar custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-app-bar', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

// ─── Complex / Composite ──────────────────────────────────────────────────────

/**
 * Vue 3 wrapper for `<mu-stepper>`.
 * Use `@step-change` to receive `CustomEvent<{from: number, to: number}>`.
 */
export const Stepper = defineComponent({
  name: 'MuStepper',
  inheritAttrs: false,
  props: {
    /** Zero-based index of the currently active step. */
    activeStep: Number,
    /** Layout direction of the step connectors. */
    orientation: String as PropType<'horizontal' | 'vertical'>,
    /** Whether steps must be completed in order. */
    linear: Boolean,
  },
  /**
   * Renders the mu-stepper custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-stepper', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/** Vue 3 wrapper for `<mu-step>`. */
export const Step = defineComponent({
  name: 'MuStep',
  inheritAttrs: false,
  props: {
    /** Label text shown beside or below the step indicator. */
    label: String,
    /** Visual state of the step indicator. */
    state: String as PropType<'active' | 'completed' | 'error' | 'disabled'>,
  },
  /**
   * Renders the mu-step custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-step', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});

/**
 * Vue 3 wrapper for `<mu-data-table>`.
 * Use `@sort-change` and `@selection-change` for table interaction events.
 */
export const DataTable = defineComponent({
  name: 'MuDataTable',
  inheritAttrs: false,
  props: {
    /** Column definitions. */
    columns: Array as PropType<
      ReadonlyArray<{key: string; label: string; sortable?: boolean; width?: string}>
    >,
    /** Row data objects. */
    rows: Array as PropType<ReadonlyArray<Record<string, unknown>>>,
    /** Key of the currently sorted column. */
    sortKey: String,
    /** Direction of the current sort. */
    sortDirection: String as PropType<'asc' | 'desc'>,
    /** Whether to render a checkbox selection column. */
    selectable: Boolean,
    /** Whether to render skeleton loading rows. */
    loading: Boolean,
  },
  /**
   * Renders the mu-data-table custom element.
   * @param props - Component props.
   * @param ctx - Setup context with attrs and slots.
   * @returns Render function.
   */
  setup(props, ctx): () => VNode {
    return (): VNode => h('mu-data-table', {...props, ...ctx.attrs}, ctx.slots.default?.());
  },
});
