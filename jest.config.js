// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Match the path alias from tsconfig.json
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
