// eslint.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tseslint = require('typescript-eslint');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    // Global ignores
    {
        ignores: ['dist/**', 'node_modules/**'],
    },

    // Base configuration from typescript-eslint
    ...tseslint.configs.recommended,

    // Prettier configuration to disable any rules that conflict with Prettier's formatting.
    // This should always be the last configuration in the array.
    prettierConfig,
];
