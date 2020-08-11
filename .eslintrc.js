module.exports = {
  env: {
    node: true,
  },
  extends: ['prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true,
    },
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    curly: 2,
    'dot-notation': 2,
    'func-names': 0,
    'id-length': [
      2,
      {
        exceptions: ['i', 'a', 'b', 'x', 'y'],
      },
    ],
    'linebreak-style': 0,
    'no-alert': 0,
    'no-await-in-loop': 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-const-assign': 2,
    'no-debugger': 0,
    'no-dupe-class-members': 2,
    'no-else-return': 2,
    'no-inner-declarations': 2,
    'no-lonely-if': 2,
    'no-magic-numbers': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-return-assign': ['error', 'except-parens'],
    'no-restricted-syntax': [
      2,
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-shadow': [
      2,
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    'no-unneeded-ternary': 2,
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': [
      2,
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err',
      },
    ],
    'no-useless-return': 2,
    'no-var': 2,
    'one-var': [2, 'never'],
    'prefer-arrow-callback': 2,
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'prefer-promise-reject-errors': 2,
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSpacing: true,
        endOfLine: 'auto',
        jsxBracketSameLine: false,
        printWidth: 80,
        proseWrap: 'preserve',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
        overrides: [
          {
            files: '*.json',
            options: {
              printWidth: 200,
            },
          },
        ],
      },
    ],
    radix: 0,
    'sort-imports': 0,
    'sort-keys': [
      2,
      'asc',
      {
        caseSensitive: true,
        natural: true,
      },
    ],
    'sort-vars': 2,
    'space-before-function-paren': 0,
    strict: [2, 'global'],
  },
};
