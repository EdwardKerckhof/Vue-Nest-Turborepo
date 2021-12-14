module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'prettier',
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', 'simple-import-sort'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': ['off'],
    'vue/no-unused-vars': 'error',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off'
  },
  settings: {
    next: {
      rootDir: [
        'apps/api/',
        'apps/app/',
        'packages/config/',
        'packages/tsconfig/'
      ]
    }
  }
}
