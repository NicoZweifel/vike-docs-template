/*
in part from: https://github.com/preactjs/eslint-config-preact?tab=MIT-1-ov-file#readme

The MIT License (MIT)

Copyright (c) 2020-present The Preact Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  ignorePatterns: ['dist/**/*', 'node_modules'],

  // We don't use plugin:react/recommended here to avoid React-specific rules.
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest/recommended',
  ],

  plugins: [
    'prettier',
    '@typescript-eslint',
    'compat',
    'react',
    'react-hooks',
    'vitest',
  ],

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  globals: {
    expect: true,
    browser: true,
    global: true,
  },

  settings: {
    // Preact CLI provides these defaults
    targets: ['last 2 versions'],
    polyfills: ['fetch', 'Promise'],
    react: {
      // eslint-plugin-preact interprets this as "h.createElement",
      // however we only care about marking h() as being a used variable.
      pragma: 'h',
      version: '18.0',
    },
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    /**
     * Preact / JSX rules
     */
    'react/no-deprecated': 2,
    'react/react-in-jsx-scope': 0, // handled this automatically
    'react/display-name': [1, { ignoreTranspilerName: false }],
    'react/jsx-no-bind': [
      1,
      {
        ignoreRefs: true,
        allowFunctions: true,
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
    'react/jsx-uses-react': 2, // debatable
    'react/jsx-uses-vars': 2,
    'react/jsx-key': [2, { checkFragmentShorthand: true }],
    'react/self-closing-comp': 2,
    'react/prefer-es6-class': 2,
    'react/prefer-stateless-function': 1,
    'react/require-render-return': 2,
    'react/no-danger': 1,
    // Legacy APIs not supported in Preact:
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/no-string-refs': 2,

    /**
     * Hooks
     */
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: 'plugin:mdx/recommended',
      settings: {
        'mdx/code-blocks': true,
      },
      rules: {
        'react/jsx-no-undef': 0,
      },
    },
  ],
};
