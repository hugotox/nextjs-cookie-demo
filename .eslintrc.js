module.exports = {
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'react-app',
    'standard-with-typescript',
    'standard-react',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:jsdoc/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'jsdoc'],
  rules: {
    'import/no-default-export': 'off',
    'jsdoc/require-jsdoc': 'off',
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
