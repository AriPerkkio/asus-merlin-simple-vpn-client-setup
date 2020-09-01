module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    plugins: ['node', 'prettier'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'prettier'],
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:node/recommended-module',
                'prettier/@typescript-eslint',
            ],
        },
        {
            files: ['*.test.ts', '**/__mocks__/**.ts'],
            rules: {
                'node/no-unpublished-import': 'off',
            },
        },
    ],
    rules: {
        'node/no-extraneous-import': ['error', { allowModules: ['uuid'] }],
        'node/no-missing-import': [
            'error',
            {
                tryExtensions: ['.js', '.ts', '.d.ts'],
                resolvePaths: [__dirname + '/src'],
            },
        ],
        'prettier/prettier': 'error',
    },
};
