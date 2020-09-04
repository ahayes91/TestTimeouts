// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const integration =
  process.env.TEST_TYPE === 'integration'
    ? {
        testMatch: ['**/?(*.)+(integration.spec|integration.test).[tj]s?(x)'],
        testPathIgnorePatterns: [],
        coverageDirectory: 'coverage_integration',
        reporters: ['default', 'jest-junit'],
      }
    : {};

const pact =
  process.env.TEST_TYPE === 'pact'
    ? {
        testMatch: ['**/?(*.)+(pact.spec|pact.test).[tj]s?(x)'],
        testPathIgnorePatterns: [],
      }
    : {};

module.exports = {
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^(?!.*\\.([tj]sx?|css|json)$)': '../../../config/jest/fileTransform.js', // This is expecting all app jest.config.js files to live in packages/**/**/jest.config.js
  },
  testPathIgnorePatterns: [
    '[.](api.spec.js|api.test.js)$',
    '[.](pact.spec.js|pact.test.js)$',
  ],
  testTimeout: 30000,
  globalSetup: '../../../config/jest/set-tz-utc.js', // This is expecting all app jest.config.js files to live in packages/**/**/jest.config.js
  ...integration,
  ...pact,
};
