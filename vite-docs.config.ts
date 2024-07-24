import type { UserConfig } from 'vite';

import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

export default {
  root: 'src/docs',
  plugins: [react(), mdx()],
  server: {
    port: 9000,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.ts'),
    },
  },
} satisfies UserConfig;
