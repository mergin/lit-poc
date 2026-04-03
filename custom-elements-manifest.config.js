import {customElementVsCodePlugin} from 'custom-element-vs-code-integration';

export default {
  plugins: [
    customElementVsCodePlugin({
      outdir: '.vscode',
      cssFileName: null,
    }),
  ],
};
