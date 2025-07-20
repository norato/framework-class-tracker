import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli/index.ts'],
  outDir: 'dist',
  target: 'node18',
  format: ['esm'],
  clean: true,
  splitting: false,
  dts: true,
  shims: false,
  minify: false,
});
