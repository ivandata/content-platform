import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import tsparser from '@typescript-eslint/parser'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
      '@stylistic/jsx': stylisticJsx
    },
    rules: {
      'indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/ts/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/quotes': ['error', 'single', {
        avoidEscape: true, allowTemplateLiterals: true
      }],
      '@stylistic/ts/quotes': ['error', 'single', {
        avoidEscape: true, allowTemplateLiterals: true
      }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/jsx/jsx-curly-spacing': [2,{ 'when': 'never', 'children': true }],
      '@stylistic/jsx/jsx-props-no-multi-spaces': ['error'],
      '@stylistic/jsx/jsx-function-call-newline': ['error', 'always'],
      '@stylistic/jsx/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx/jsx-newline': ['error', {
        'prevent': true, 'allowMultilines': true
      }],
      '@stylistic/jsx/jsx-one-expression-per-line': ['error', {
        'allow': 'single-child'
      }],
      '@stylistic/jsx/jsx-self-closing-comp': ['error', {
        'component': true,
        'html': true
      }],
      '@stylistic/jsx/jsx-equals-spacing': [2, 'never'],
      '@stylistic/jsx/jsx-indent': ['error', 2, {
        checkAttributes: true,
        indentLogicalExpressions: true,
      }],
      '@stylistic/jsx/jsx-tag-spacing': ['error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never'
      }],
      '@stylistic/js/object-curly-newline': ['error', {
        'ExportDeclaration': { 'multiline': true, 'minProperties': 5 },
        'ImportDeclaration': { 'multiline': true, 'minProperties': 5 }
      }]
    }
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          ignorePattern: [],
          groups: [],
          customGroups: {},
        },
      ],
    }
  },
)
