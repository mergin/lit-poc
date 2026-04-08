import {customElementVsCodePlugin} from 'custom-element-vs-code-integration';

export default {
  globs: [
    'src/core/components/**/mu-*.ts',
    'src/core/i18n/*.ts',
    'src/theme/*.ts',
    'src/list/mu-*.ts',
  ],
  plugins: [
    customElementVsCodePlugin({
      outdir: '.vscode',
      cssFileName: null,
    }),
  ],
};
