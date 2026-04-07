// @vitest-environment jsdom
import 'zone.js';
import 'zone.js/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import {beforeAll, beforeEach, describe, expect, it} from 'vitest';
import {MuCheckboxControlDirective} from '../mu-checkbox.directive.js';
import '../../../checkbox/mu-checkbox.js';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MuCheckboxControlDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<mu-checkbox
    [formControl]="ctrl"
    label="Test"
  ></mu-checkbox>`,
})
class TestHostComponent {
  /** The reactive form control bound to the checkbox. */
  readonly ctrl = new FormControl(false);
}

describe('Angular CVA — integration', (): void => {
  beforeAll((): void => {
    // Bootstrap the Angular testing platform (required in non-Jest environments).
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
      teardown: {destroyAfterEach: true},
    });
  });

  beforeEach(async (): Promise<void> => {
    // ARRANGE — import the standalone host component so Angular compiles it
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  it('writeValue propagates model value to element checked property', async (): Promise<void> => {
    // ARRANGE
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('mu-checkbox');
    // ACT
    fixture.componentInstance.ctrl.setValue(true);
    fixture.detectChanges();
    await fixture.whenStable();
    // ASSERT
    expect(el.checked).toBe(true);
    // CLEANUP — none
  });

  it('user interaction propagates element value to form control', async (): Promise<void> => {
    // ARRANGE
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('mu-checkbox');
    // ACT
    el.checked = true;
    el.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
    fixture.detectChanges();
    await fixture.whenStable();
    // ASSERT
    expect(fixture.componentInstance.ctrl.value).toBe(true);
    // CLEANUP — none
  });
});
