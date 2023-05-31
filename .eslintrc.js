module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
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
  overrides: [],
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'jsx-a11y',
    'react',
    '@typescript-eslint'
  ],
  root: true,
  rules: {
    '@typescript-eslint/comma-dangle': ['off', 'always'],
    "@typescript-eslint/indent": ["off"],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/space-before-function-paren': ['off'],
    'class-methods-use-this': ['warn'],
    'import/extensions': [
      2,
      {
        'tsx': 'never'
      }
    ],
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
    indent: ['error', 2],
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img'],
        img: ['Image'],
      },
    ],
    'jsx-a11y/aria-props': ['warn'],
    'jsx-a11y/aria-proptypes': ['warn'],
    'jsx-a11y/aria-unsupported-elements': ['warn'],
    'jsx-a11y/role-has-required-aria-props': ['warn'],
    'jsx-a11y/role-supports-aria-props': ['warn'],
    'linebreak-style': ['error', 'unix'],
    'no-console': ['error'],
    'no-duplicate-imports': ['error'],
    'no-param-reassign': ['error'],
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
    quotes: ['error', 'single'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': ['off'],
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
