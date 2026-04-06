// @vitest-environment jsdom
import {describe, expect, it} from 'vitest';
import * as wrappers from '../index.js';

const expectedNames = [
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Chip',
  'Divider',
  'Icon',
  'List',
  'ListItem',
  'Typography',
  'Checkbox',
  'Radio',
  'RadioGroup',
  'Switch',
  'TextField',
  'Select',
  'Dialog',
  'Tooltip',
  'Snackbar',
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
  'Drawer',
  'ThemeProvider',
  'LocaleProvider',
];

describe('React wrappers — unit', (): void => {
  it.each(expectedNames)('%s is exported as a valid React element type', (name): void => {
    // ARRANGE / ACT
    const wrapper = (wrappers as Record<string, unknown>)[name];
    // ASSERT — createComponent returns a React.forwardRef object in React 18+
    // (typeof 'object'), or a plain function component (typeof 'function').
    expect(wrapper).toBeTruthy();
    expect(['function', 'object'].includes(typeof wrapper)).toBe(true);
    // CLEANUP — none
  });
});
