const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
    testMatch: ['<rootDir>/force-app/**/__tests__/**/*.test.js'],
    collectCoverageFrom: [
        '**/force-app/**/*.js',
        '!**/__tests__/**',
        '!**/node_modules/**'
    ]
};
