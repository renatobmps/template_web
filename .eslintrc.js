module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:primer-react/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'prettier',
    'standard',
    'standard-with-typescript',
  ],
  'overrides': [
  ],
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir : __dirname,
  },
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'jsx-a11y',
    'react',
  ],
  root: true,
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'import/extensions': [
      2,
      {
        'tsx': 'never'
      }
    ],
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/no-unresolved': [
      0,
      {
        'caseSensitiveStrict': true
      }
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img'],
        img: ['Image'],
      },
    ],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    'no-nonoctal-decimal-escape': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-useless-constructor': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        semi: true,
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 0,
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'semi': 0,
    'space-before-function-paren': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
  },
}
