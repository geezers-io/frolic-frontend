module.exports = {
  root: true,
  extends: ['next', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
  plugins: ['unused-imports', 'import'],
  globals: {
    log: 'readonly',
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-else-return': 2,
    'react/prop-types': 2,
    'react/jsx-no-target-blank': 0,
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'unused-imports/no-unused-imports-ts': 2,
    'unused-imports/no-unused-vars-ts': 0,
    'react-hooks/exhaustive-deps': 2,
    'react/display-name': 0,
    'no-restricted-syntax': [
      2,
      {
        selector: "LogicalExpression[right.type='AssignmentExpression']",
        message: 'right-hand assign is not allowed',
      },
    ],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'unknown'],
        pathGroups: [
          {
            pattern: '{react*,react*/**,next*,next*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern:
              '{@types,layouts,layouts/**,components,components/**,hooks,hooks/**,pages/**,api/**,stores,stores/**,utils/**}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{styles,styles/**}',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-dom'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: '18',
    },
  },
};
