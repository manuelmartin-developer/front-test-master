module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.tsx'],
    setupFilesAfterEnv: [
        "<rootDir>/support/setupTests.js"
    ],
};