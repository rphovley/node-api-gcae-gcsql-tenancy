// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: './tsconfig.json',
//   },
//   extends: ['plugin:@typescript-eslint/recommended'],
//   plugins: ['@typescript-eslint'],
//   rules: {
//     '@typescript-eslint/no-unused-vars': [
//       'warn', { args: 'none' } // allows function params/arguments to not be used (e.g. Express middleware)
//     ],
//     '@typescript-eslint/ban-types': 0,
//     '@typescript-eslint/no-namespace': 0,
//     '@typescript-eslint/semi': 0,
//     '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, 'classes': false }]
//   }
// };

module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  //   rules: {
  //   '@typescript-eslint/no-unused-vars': [
  //     'warn', { args: 'none' } // allows function params/arguments to not be used (e.g. Express middleware)
  //   ],
  //   '@typescript-eslint/ban-types': 0,
  //   '@typescript-eslint/no-namespace': 0,
  //   '@typescript-eslint/semi': 0,
  //   '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, 'classes': false }]
  // }
  rules: {
    'semi': [2, "never"],
    'eqeqeq': 0,
    'lines-between-class-members': 0,
    'arrow-parens': 0,
    'no-param-reassign': 0,
    'max-classes-per-file': 0,
    'object-curly-newline': 0,
    'consistent-return': 0,
    'max-len': 0,
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/semi': [2, "never"],
    '@typescript-eslint/no-unused-vars': [
      'warn', { args: 'none' } // allows function params/arguments to not be used (e.g. Express middleware)
    ],
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/camelcase': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
   "import/prefer-default-export": 0
  },
};

/**
 * LINK TO RECOMMENDED RULES IN EFFECT
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
 *
 * LINK TO ALL ESLINT RULE EXPLANATIONS
 * https://eslint.org/docs/rules/
 *
 */
