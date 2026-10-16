import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  { ignores: ['dist/**', 'dev-dist/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-console': isProduction ? 'warn' : 'off',
      'no-debugger': isProduction ? 'warn' : 'off',
    },
  },
];
