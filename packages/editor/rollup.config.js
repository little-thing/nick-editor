import { baseConfig } from '@shared/rollup-config';
import alias from '@rollup/plugin-alias';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';

import path from 'path';
import { fileURLToPath } from 'url';

import pkg from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = baseConfig({ input: 'src/index.ts', pkg });

// 添加 visualizer 插件
// config.plugins.push(
//   visualizer({
//     filename: 'dist/stats.html', // 分析文件的输出路径
//     open: true,  // 自动打开分析页面
//     gzipSize: true, // 显示 gzip 后的大小
//     brotliSize: true, // 显示 brotli 压缩后的大小
//     template: 'treemap', // 可选: sunburst, treemap, network
//     sourcemap: true,
//   })
// );

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

config.plugins.push(
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
    },
  })
);

export default config;
