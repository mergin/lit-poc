// @vitest-environment jsdom
import {mount} from '@vue/test-utils';
import {describe, expect, it} from 'vitest';
import * as wrappers from '../index.js';

/** Expected exports from the Vue wrapper package. */
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

describe('Vue wrappers — unit', (): void => {
  it.each(expectedNames)('%s is exported as a Vue component object', (name): void => {
    // ARRANGE / ACT
    const wrapper = (wrappers as Record<string, unknown>)[name];

    // ASSERT — defineComponent returns a plain object with setup + name
    expect(wrapper).toBeTruthy();
    expect(typeof wrapper).toBe('object');
    expect((wrapper as Record<string, unknown>)['name']).toBe(`Mu${name}`);
    // CLEANUP — none
  });
});

describe('Vue wrappers — render', (): void => {
  it('Button renders a mu-button element', (): void => {
    // ARRANGE / ACT
    const wrapper = mount(wrappers.Button, {slots: {default: 'Click me'}});

    // ASSERT
    expect(wrapper.find('mu-button').exists()).toBe(true);
    // CLEANUP
    wrapper.unmount();
  });

  it('Checkbox renders a mu-checkbox element', (): void => {
    // ARRANGE / ACT
    const wrapper = mount(wrappers.Checkbox, {props: {label: 'Accept'}});

    // ASSERT
    expect(wrapper.find('mu-checkbox').exists()).toBe(true);
    // CLEANUP
    wrapper.unmount();
  });

  it('TextField renders a mu-text-field element', (): void => {
    // ARRANGE / ACT
    const wrapper = mount(wrappers.TextField, {props: {label: 'Name'}});

    // ASSERT
    expect(wrapper.find('mu-text-field').exists()).toBe(true);
    // CLEANUP
    wrapper.unmount();
  });

  it('Button forwards color prop to the custom element as a DOM property', (): void => {
    // ARRANGE / ACT
    const wrapper = mount(wrappers.Button, {
      props: {color: 'primary'},
      slots: {default: 'Save'},
    });
    const el = wrapper.find('mu-button').element as HTMLElement & {color?: string};

    // ASSERT — Vue sets typed props as DOM properties on custom elements,
    // not HTML attributes, so we assert on the element property.
    expect(el.color).toBe('primary');
    // CLEANUP
    wrapper.unmount();
  });

  it('Select renders a mu-select element', (): void => {
    // ARRANGE / ACT
    const wrapper = mount(wrappers.Select, {props: {label: 'Country'}});

    // ASSERT
    expect(wrapper.find('mu-select').exists()).toBe(true);
    // CLEANUP
    wrapper.unmount();
  });
});
