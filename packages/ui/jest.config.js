const tsConfig = require('./tsconfig.json');

module.exports = {
    moduleDirectories: ['node_modules', tsConfig.compilerOptions.baseUrl],
    moduleNameMapper: {
        '@api/clients/ipleak-client': [
            '<rootDir>/../api/src/clients/ipleak-client',
        ],
        '@api/__mocks__/data': ['<rootDir>/../api/src/__mocks__/data'],
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
