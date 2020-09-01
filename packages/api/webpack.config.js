const path = require('path');
const tsconfig = require('./tsconfig.json');

module.exports = (_, { mode }) => ({
    mode,
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    target: 'node',
    optimization: {
        minimize: false,
    },
    watch: mode === 'development',
    module: {
        rules: [
            {
                test: /\.(js|mjs|ts)$/,
                include: [path.resolve('src')],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.mjs', '.js'],
        modules: ['node_modules', tsconfig.compilerOptions.baseUrl],
    },
});
