import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';

import svgr from '@svgr/rollup';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr() as PluginOption],
});
