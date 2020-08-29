const tsConfig = require('./tsconfig.json');

module.exports = {
    moduleDirectories: ['node_modules', tsConfig.compilerOptions.baseUrl],
    moduleNameMapper: {
        '@api/ipleak-client': ['<rootDir>/../api/src/ipleak-client'],
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
