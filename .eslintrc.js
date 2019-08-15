/**
 * Airbnb and react hooks linting
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'no-param-reassign': 0,
    "react-hooks/rules-of-hooks": "error",
    'no-restricted-syntax': 0,
    "no-await-in-loop": 0,
    "import/no-extraneous-dependencies": 0,
    'no-return-assign': 0,
    'guard-for-in': 0,
    'lines-between-class-members': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
