module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
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
    'vue/require-default-prop': 0,
    'vue/v-on-event-hyphenation': 0,
    'vue/require-explicit-emits': 0,
    'vue/require-prop-types': 0,
  },
  globals: {
    $t: 'readonly',
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
  overrides: [
    {
      files: ['*.js', '*.vue'],
    },
  ],
};
