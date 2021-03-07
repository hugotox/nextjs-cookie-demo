module.exports = {
  extends: ['@zcode'],
  rules: {
    'import/no-default-export': 'off',
    'jsdoc/require-jsdoc': 'off',
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
