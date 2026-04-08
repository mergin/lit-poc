import {bench, describe} from 'vitest';
import {MuBreadcrumb} from '../mu-breadcrumb';
import {MuBreadcrumbItem} from '../mu-breadcrumb-item';

describe('mu-breadcrumb performance', () => {
  bench('MuBreadcrumb instantiation', () => {
    // ARRANGE / ACT
    new MuBreadcrumb();
  });

  bench('MuBreadcrumbItem instantiation', () => {
    // ARRANGE / ACT
    new MuBreadcrumbItem();
  });

  bench('MuBreadcrumbItem href assignment', () => {
    // ARRANGE
    const el = new MuBreadcrumbItem();

    // ACT
    el.href = '/home';
    el.href = '/about';
  });
});
