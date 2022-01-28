module.exports = {
  extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'func-names': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    'no-await-in-loop': 0,
    'prefer-rest-params': 0,
    'consistent-return': 0,
    'max-len': ['error', { code: 1000 }],
    'no-console': 0,
    'no-param-reassign': 0,
    'vue/multi-word-component-names': 0,
    'vue/script-setup-uses-vars': 0,
  },
  overrides: [
    {
      files: ['*.js', '*.vue'],
    },
  ],
  globals: {
    $t: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
      extensions: ['.js', '.less', '.json', '.vue'],
    },
  },
};
