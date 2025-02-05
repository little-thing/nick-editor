import { config } from "@libs/eslint-config/base";
import tsParser from '@typescript-eslint/parser';
import importHelpersPlugin from 'eslint-plugin-import-helpers';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

/** @type {import("eslint").Linter.Config} */
const editorConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
    },
    globals: {
      node: true,
      browser: true,
    },
  },
  plugins: {
    'react-refresh': reactRefreshPlugin,
    'import-helpers': importHelpersPlugin,
  },
  settings: {},
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-param-reassign': 0,
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always', // new line between groups
        groups: ['module', '/^@//', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'import/prefer-default-export': ['off'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignores: ['dist/**', 'public/client/**', '.eslintrc.cjs'],
};

export default [...config, editorConfig];


