# mu-stepper / mu-step

Progress stepper component that guides users through a multi-step workflow. Place `mu-step` elements as children.

## Usage

```html
<mu-stepper active-step="0">
  <mu-step label="Account"></mu-step>
  <mu-step label="Profile"></mu-step>
  <mu-step label="Review"></mu-step>
</mu-stepper>
```

## mu-stepper Properties

| Property      | Type      | Default        | Description                         |
| ------------- | --------- | -------------- | ----------------------------------- |
| `activeStep`  | `number`  | `0`            | Index (0-based) of the active step. |
| `orientation` | `string`  | `'horizontal'` | `'horizontal'` \| `'vertical'`      |
| `linear`      | `boolean` | `true`         | Enforce sequential navigation.      |

## mu-stepper Methods

| Method        | Description                           |
| ------------- | ------------------------------------- |
| `next()`      | Advance to the next step.             |
| `back()`      | Return to the previous step.          |
| `goTo(index)` | Navigate to a specific 0-based index. |

## mu-stepper Events

| Event         | Detail                         | Description                         |
| ------------- | ------------------------------ | ----------------------------------- |
| `step-change` | `{ from: number, to: number }` | Fired when the active step changes. |

## mu-stepper CSS Parts

| Part        | Description                         |
| ----------- | ----------------------------------- |
| `connector` | The line connecting adjacent steps. |

## mu-step Properties

| Property | Type          | Default      | Description                                              |
| -------- | ------------- | ------------ | -------------------------------------------------------- |
| `label`  | `string`      | `''`         | Step label text.                                         |
| `state`  | `MuStepState` | `'disabled'` | `'active'` \| `'completed'` \| `'error'` \| `'disabled'` |
| `index`  | `number`      | `0`          | 1-based index (set by parent).                           |

## mu-step Slots

| Slot        | Description                              |
| ----------- | ---------------------------------------- |
| `(default)` | Step content shown when active.          |
| `icon`      | Custom indicator icon (replaces number). |

## mu-step CSS Parts

| Part        | Description                  |
| ----------- | ---------------------------- |
| `indicator` | The circular step indicator. |
| `label`     | The step label text.         |
| `content`   | The step content container.  |

## Accessibility

- `role="list"` on the stepper, `role="listitem"` implied by slot.
- `aria-current="step"` on the active step indicator.
- `aria-disabled` on disabled steps.
