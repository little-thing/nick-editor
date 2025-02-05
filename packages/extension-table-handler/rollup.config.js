import { baseConfig } from '@shared/rollup-config';
import alias from '@rollup/plugin-alias';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

import path from 'path';
import { fileURLToPath } from 'url';

import pkg from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = baseConfig({ input: 'src/index.ts', pkg });

// 添加 url 插件处理 svg
config.plugins.unshift(
  svgr(),
  url(),
  alias({
    entries: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  })
);

export default config;
