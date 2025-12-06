import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: [
            'node_modules/',
            'vendor/',
            'public/',
            'storage/',
            'bootstrap/',
            '*.min.js',
            '*.min.css',
            'build/',
            'dist/',
            'coverage/',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        files: ['resources/js/**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
        },
    }
);

