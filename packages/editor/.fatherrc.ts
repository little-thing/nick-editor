import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  esm: {
    output: 'dist/esm',
    ignores: ['**/demos/**', '**/*.test.{js,jsx,ts,tsx}'],
  },
  cjs: {
    output: 'dist/cjs',
    ignores: ['**/demos/**', '**/*.test.{js,jsx,ts,tsx}'],
  },
  umd: {
    output: 'dist/umd',
  },
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  platform: 'browser',
});
