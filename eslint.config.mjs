import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import securityPlugin from 'eslint-plugin-security';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';
import boundariesPlugin from 'eslint-plugin-boundaries';

export default [
  // Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },

  // Security (mainly for backend)
  securityPlugin.configs.recommended,

  // Import plugin
  {
    plugins: { import: importPlugin },
    settings: {
      'import/internal-regex': '^@(common|identity|config)',
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
            orderImportKind: 'asc',
          },
          pathGroups: [
            {
              pattern: '@config/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@common/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@shared-kernel/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@identity-*/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'type'],
          distinctGroup: true,
          warnOnUnassignedImports: true,
        },
      ],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
    },
  },

  // TypeScript-specific rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['.*', '../*', './*'],
              message: 'Use absolute imports instead of relative imports',
            },
          ],
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      // '@typescript-eslint/consistent-type-imports': [
      //   'error',
      //   {
      //     prefer: 'type-imports',
      //     disallowTypeAnnotations: false,
      //     fixStyle: 'inline-type-imports',
      //   },
      // ],
    },
  },

  {
    plugins: {
      boundaries: boundariesPlugin,
    },

    settings: {
      'boundaries/elements': [
        { type: 'config', pattern: 'src/config/**' },

        { type: 'common', pattern: 'src/common/**' },

        { type: 'shared-kernel', pattern: 'src/shared-kernel/**' },

        {
          type: 'identity-domain',
          pattern: 'src/bounded-context/identity/domain/**',
        },
        {
          type: 'identity-application',
          pattern: 'src/bounded-context/identity/application/**',
        },
        {
          type: 'identity-infrastructure',
          pattern: 'src/bounded-context/identity/infrastructure/**',
        },
        {
          type: 'identity-presentation',
          pattern: 'src/bounded-context/identity/presentation/**',
        },
      ],
    },

    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['config'],
              allow: ['common'],
            },

            {
              from: ['common'],
              allow: ['config'],
            },

            {
              from: ['shared-kernel'],
              allow: [],
            },

            {
              from: ['identity-domain'],
              allow: ['shared-kernel'],
            },
            {
              from: ['identity-application'],
              allow: ['shared-kernel', 'identity-domain'],
            },
            {
              from: ['identity-infrastructure'],
              allow: [
                'config',
                'common',
                'shared-kernel',
                'identity-domain',
                'identity-application',
              ],
            },
            {
              from: ['identity-presentation'],
              allow: [
                'config',
                'common',
                'shared-kernel',
                'identity-domain',
                'identity-application',
                'identity-infrastructure',
              ],
            },
          ],
        },
      ],
    },
  },

  // Prettier integration
  prettierPlugin,

  // Ignore patterns
  {
    ignores: ['node_modules/', 'dist/', '.eslintrc.js', 'eslint.config.mjs'],
  },

  // Disable rules conflicting with Prettier (must be last)
  prettierConfig,
];
