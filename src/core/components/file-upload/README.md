# mu-file-upload

File upload form component with drag-and-drop support. Participates natively in HTML forms via `ElementInternals`.

## Usage

```html
<mu-file-upload
  label="Choose file"
  name="attachment"
></mu-file-upload>
```

## Properties

| Property    | Type      | Default                   | Description                             |
| ----------- | --------- | ------------------------- | --------------------------------------- |
| `multiple`  | `boolean` | `false`                   | Allow multiple file selection.          |
| `accept`    | `string`  | `''`                      | Accepted MIME types or file extensions. |
| `disabled`  | `boolean` | `false`                   | Disables the control.                   |
| `label`     | `string`  | `'Choose file'`           | Primary label shown in drop zone.       |
| `dragLabel` | `string`  | `'or drag and drop here'` | Secondary hint shown below the label.   |
| `name`      | `string`  | `''`                      | Form field name for file submission.    |

## Events

| Event       | Detail                | Description                       |
| ----------- | --------------------- | --------------------------------- |
| `mu-change` | `{ files: FileList }` | Dispatched when files are chosen. |

## CSS Parts

| Part               | Description                          |
| ------------------ | ------------------------------------ |
| `dropzone`         | The clickable/droppable container.   |
| `dropzone--active` | Applied when a file is dragged over. |
| `label`            | Primary label text.                  |
| `hint`             | Secondary hint text.                 |

## Accessibility

- Drop zone uses `role="button"` with `tabindex="0"`.
- `aria-label` derived from the `label` property.
- `aria-disabled` reflects disabled state.
- Keyboard: `Enter` or `Space` opens the file picker.
- Hidden `<input type="file">` handles actual file selection.
