module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn', { args: 'none' } // allows function params/arguments to not be used (e.g. Express middleware)
    ],
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, 'classes': false }]
  }
};


/**
 * LINK TO RECOMMENDED RULES IN EFFECT
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
 *
 * LINK TO ALL ESLINT RULE EXPLANATIONS
 * https://eslint.org/docs/rules/
 *
 */
