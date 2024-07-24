import type { UserConfig } from 'vite';
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
      input: 'index.ts',
    },
  },
} satisfies UserConfig;
