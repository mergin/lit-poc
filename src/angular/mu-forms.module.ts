import {NgModule} from '@angular/core';

import {MuCheckboxControlDirective} from './mu-checkbox.directive.js';
import {MuRadioGroupControlDirective} from './mu-radio-group.directive.js';
import {MuSelectControlDirective} from './mu-select.directive.js';
import {MuSwitchControlDirective} from './mu-switch.directive.js';
import {MuTextFieldControlDirective} from './mu-text-field.directive.js';

/**
 * Angular `NgModule` that bundles all Muon form `ControlValueAccessor` directives.
 * Import `MuFormsModule` into any Angular module that contains templates using
 * `<mu-checkbox>`, `<mu-switch>`, `<mu-radio-group>`, `<mu-select>`, or
 * `<mu-text-field>` with reactive forms (`formControl` / `formControlName` / `ngModel`).
 * Alternatively, import the individual standalone directives directly if you
 * prefer standalone Angular components.
 * @example
 * ```typescript
 * // NgModule setup
 * import {MuFormsModule} from 'lit-poc/angular';
 *
 * @NgModule({ imports: [MuFormsModule] })
 * export class AppModule {}
 * ```
 * @example
 * ```typescript
 * // Standalone component setup
 * import {MuCheckboxControlDirective} from 'lit-poc/angular';
 *
 * @Component({ standalone: true, imports: [MuCheckboxControlDirective] })
 * export class MyComponent {}
 * ```
 */
@NgModule({
  imports: [
    MuCheckboxControlDirective,
    MuSwitchControlDirective,
    MuRadioGroupControlDirective,
    MuSelectControlDirective,
    MuTextFieldControlDirective,
  ],
  exports: [
    MuCheckboxControlDirective,
    MuSwitchControlDirective,
    MuRadioGroupControlDirective,
    MuSelectControlDirective,
    MuTextFieldControlDirective,
  ],
})
export class MuFormsModule {}
