import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'
import sourcemaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss';

export const baseConfig = ({
  input = 'src/index.ts',
  pkg,
}) => ({
  external: [/@tiptap\/pm\/.*/],
  input,
  output: [
    {
      name: pkg.name,
      file: pkg.umd,
      format: 'umd',
      sourcemap: true,
      exports: 'named',
    },
    {
      name: pkg.name,
      file: pkg.main,
      format: 'cjs',
      interop: 'compat',
      sourcemap: true,
      exports: 'named',
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    autoExternal({
      packagePath: './package.json',
    }),
    sourcemaps(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: '../../node_modules/**',
    }),

    postcss({
      extract: true,  // 提取 CSS 到独立文件
      config: true    // 自动使用 postcss.config.cjs
    }),
    
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          rootDir: `./src`,
          declarationMap: true,
          paths: {
            '@nick-editor/*': ['packages/*/dist', 'packages/*/src'],
          },
          noEmit: false,
        },
        include: null,
      },
    }),
  ],
})
