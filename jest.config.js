module.exports = {
  modulePaths: ['.', './src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
}
