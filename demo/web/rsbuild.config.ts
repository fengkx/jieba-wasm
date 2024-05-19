import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  output: {
    assetPrefix: process.env['PUBLIC_URL'] || '/'
  },
  plugins: [pluginReact()],
});
