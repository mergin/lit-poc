import {expect, test, describe} from 'vitest';
import {MuBreadcrumb} from '../mu-breadcrumb';
import {MuBreadcrumbItem} from '../mu-breadcrumb-item';

describe('mu-breadcrumb unit', () => {
  test('MuBreadcrumb is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-breadcrumb');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuBreadcrumb);
  });

  test('MuBreadcrumbItem is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-breadcrumb-item');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuBreadcrumbItem);
  });

  test('MuBreadcrumb defaults to label "Breadcrumb"', () => {
    // ARRANGE
    const el = new MuBreadcrumb();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.label).toBe('Breadcrumb');
  });

  test('MuBreadcrumbItem defaults', () => {
    // ARRANGE
    const el = new MuBreadcrumbItem();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.href).toBe('');
    expect(el.current).toBe(false);
  });
});
