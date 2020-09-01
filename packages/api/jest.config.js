const tsConfig = require('./tsconfig.json');

module.exports = {
    moduleDirectories: ['node_modules', tsConfig.compilerOptions.baseUrl],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
