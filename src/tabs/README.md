# mu-tabs

A tabs component suite consisting of `mu-tabs` (container), `mu-tab` (tab button), and `mu-tab-panel` (content panel).

## Usage

```html
<mu-tabs>
  <mu-tab slot="tab">Profile</mu-tab>
  <mu-tab slot="tab">Settings</mu-tab>
  <mu-tab
    slot="tab"
    disabled
    >Billing</mu-tab
  >

  <mu-tab-panel slot="panel">Profile content</mu-tab-panel>
  <mu-tab-panel slot="panel">Settings content</mu-tab-panel>
  <mu-tab-panel slot="panel">Billing content</mu-tab-panel>
</mu-tabs>
```

## mu-tabs Properties

| Property        | Type     | Default | Description                         |
| --------------- | -------- | ------- | ----------------------------------- |
| `selectedIndex` | `number` | `0`     | Zero-based index of the active tab. |

## mu-tabs Events

| Event        | Detail              | Description                      |
| ------------ | ------------------- | -------------------------------- |
| `tab-change` | `{ index: number }` | Fired when selected tab changes. |

## mu-tab Properties

| Property   | Type      | Default | Description                        |
| ---------- | --------- | ------- | ---------------------------------- |
| `selected` | `boolean` | `false` | Whether this tab is active.        |
| `disabled` | `boolean` | `false` | Prevents selection when true.      |
| `controls` | `string`  | `''`    | ID of the associated panel (auto). |

## mu-tab-panel Properties

| Property     | Type      | Default | Description                      |
| ------------ | --------- | ------- | -------------------------------- |
| `active`     | `boolean` | `false` | Shows panel when true.           |
| `labelledby` | `string`  | `''`    | ID of the associated tab (auto). |

## Keyboard Navigation

| Key          | Action               |
| ------------ | -------------------- |
| `ArrowRight` | Move to next tab     |
| `ArrowLeft`  | Move to previous tab |
| `Home`       | Move to first tab    |
| `End`        | Move to last tab     |

## Accessibility

Follows the [ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Tab buttons have `role="tab"` and `aria-selected`; panels have `role="tabpanel"` and `aria-labelledby`. Roving tabindex is implemented for keyboard navigation.

## CSS Parts

| Part       | Description                          |
| ---------- | ------------------------------------ |
| `tab-list` | The `div[role="tablist"]` container. |

(`mu-tab` exposes part `tab`; `mu-tab-panel` exposes part `tab-panel`.)

## CSS Custom Properties

| Property                    | Description                           | Default                      |
| --------------------------- | ------------------------------------- | ---------------------------- |
| `--mu-tabs-indicator-color` | Active tab indicator and text colour. | `var(--mu-primary, #1976d2)` |
| `--mu-tabs-divider-color`   | Bottom border colour of the tab list. | `var(--mu-divider, #e0e0e0)` |
