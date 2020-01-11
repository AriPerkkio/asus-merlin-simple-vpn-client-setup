module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'react-app',
    ],
    plugins: ['eslint-plugin', 'prettier'],
    settings: {
        react: {
            version: 'detect',
        },
    },
};
