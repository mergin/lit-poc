# mu-autocomplete

Combobox / autocomplete form component with live filtering and keyboard navigation.

## Usage

```html
<mu-autocomplete
  label="Country"
  placeholder="Search…"
  .options="${countries}"
></mu-autocomplete>

<script>
  document.querySelector('mu-autocomplete').options = [
    {value: 'us', label: 'United States'},
    {value: 'gb', label: 'United Kingdom'},
  ];
</script>
```

## Properties

| Property      | Type                   | Default | Description                                     |
| ------------- | ---------------------- | ------- | ----------------------------------------------- |
| `value`       | `string`               | `''`    | Currently selected option value.                |
| `label`       | `string`               | `''`    | Label text shown above the input.               |
| `options`     | `AutocompleteOption[]` | `[]`    | Array of `{ value, label }` objects.            |
| `disabled`    | `boolean`              | `false` | Disables the control.                           |
| `required`    | `boolean`              | `false` | Marks field required for form validation.       |
| `placeholder` | `string`               | `''`    | Placeholder text for the input.                 |
| `minChars`    | `number`               | `1`     | Minimum character count before showing options. |
| `name`        | `string`               | `''`    | Form field name.                                |

## Events

| Event    | Detail                             | Description                |
| -------- | ---------------------------------- | -------------------------- |
| `change` | `{ value: string, label: string }` | Fired on option selection. |

## CSS Parts

| Part      | Description                  |
| --------- | ---------------------------- |
| `input`   | The text input element.      |
| `listbox` | The dropdown options list.   |
| `option`  | Each individual option `li`. |

## Keyboard

| Key         | Action                            |
| ----------- | --------------------------------- |
| `ArrowDown` | Move focus to next option         |
| `ArrowUp`   | Move focus to previous option     |
| `Enter`     | Select the focused option         |
| `Escape`    | Close the dropdown                |
| `Tab`       | Close the dropdown and move focus |

## Accessibility

- Input uses `role="combobox"` with `aria-expanded`, `aria-controls`, `aria-activedescendant`.
- Listbox uses `role="listbox"`.
- Each option uses `role="option"` with `aria-selected`.
