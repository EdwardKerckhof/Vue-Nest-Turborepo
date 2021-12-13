module.exports = {
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
  ],
  settings: {
    next: {
      rootDir: [
        'apps/api/',
        'apps/app/',
        'packages/config/',
        'packages/tsconfig/',
      ],
    },
  },
}
