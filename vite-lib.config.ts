import { resolve } from 'path';
import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default {
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
    },
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      external: ['react', 'styled-components'],
    },
  },
} satisfies UserConfig;
