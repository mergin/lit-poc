/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const basePlugins = [
  replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
  resolve(),
  typescript({tsconfig: './tsconfig.json'}),
  terser({
    ecma: 2021,
    module: true,
    warnings: true,
    mangle: {
      properties: {
        regex: /^__/,
      },
    },
  }),
  summary(),
];

export default [
  {
    input: 'src/avatar/mu-avatar.ts',
    output: {file: 'docs/mu-avatar.bundled.js', format: 'esm'},
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: basePlugins,
  },
  {
    input: 'src/button/mu-button.ts',
    output: {file: 'docs/mu-button.bundled.js', format: 'esm'},
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: basePlugins,
  },
  {
    input: 'src/card/mu-card.ts',
    output: {file: 'docs/mu-card.bundled.js', format: 'esm'},
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: basePlugins,
  },
  {
    input: 'src/icon/mu-icon.ts',
    output: {file: 'docs/mu-icon.bundled.js', format: 'esm'},
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: basePlugins,
  },
];
