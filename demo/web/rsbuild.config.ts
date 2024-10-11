import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: 'jieba-wasm demo',
  },
  output: {
    assetPrefix: process.env['PUBLIC_URL'] || '/'
  },
  plugins: [pluginReact()],
});
