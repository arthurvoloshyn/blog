/**
 * @fileoverview Prohibits imports not from public api
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/public-api-imports'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run('public-api-imports', rule, {
  valid: [
    {
      code: "import { getArticleData } from '@/entities/Article';",
      errors: [],
      options: [
        {
          alias: '@',
        },
      ],
    },
    {
      code: "import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';",
      errors: [],
      options: [
        {
          alias: '@',
        },
      ],
    },
    {
      filename:
        'E:\\study\\production_project\\src\\shared\\config\\storybook\\StoreDecorator.tsx',
      code: "import { articleCommentReducer } from '@/pages/ArticleDetailsPage/testing';",
      errors: [],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
    {
      filename:
        'E:\\study\\production_project\\src\\features\\EditableProfileCard\\model\\slice\\profileCardSlice.test.ts',
      code: "import { ProfileCardSchema } from '@/features/ProfileCardSchema/testing';",
      errors: [],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
    {
      filename:
        'E:\\study\\production_project\\src\\features\\EditableProfileCard\\model\\slice\\profileCardSlice.test.ts',
      code: "import { ProfileCardSchema } from './ProfileCardSchema';",
      errors: [],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
  ],

  invalid: [
    {
      code: "import { getArticleData } from '@/entities/Article/model/selectors/getArticleData/getArticleData';",
      errors: [
        {
          messageId: 'publicApi',
        },
      ],
      output: "import { getArticleData } from '@/entities/Article';",
      options: [
        {
          alias: '@',
        },
      ],
    },
    {
      filename:
        'E:\\study\\production_project\\src\\features\\EditableProfileCard\\forbidden.ts',
      code: "import { ProfileCardSchema } from '@/features/ProfileCardSchema/testing'",
      errors: [
        {
          messageId: 'testingPublicApi',
        },
      ],
      output: null,
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
    {
      filename:
        'E:\\study\\production_project\\src\\shared\\StoreDecorator.tsx',
      code: "import { ProfileCardSchema } from '@/features/ProfileCardSchema/testing/file.tsx'",
      errors: [
        {
          messageId: 'testingPublicApi',
        },
      ],
      output: "import { ProfileCardSchema } from '@/features/ProfileCardSchema/testing'",
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
    {
      filename:
        'E:\\study\\production_project\\src\\shared\\config\\storybook\\StoreDecorator.tsx',
      code: "import { articleReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [
        {
          messageId: 'testingPublicApi',
        },
      ],
      output: "import { articleReducer } from '@/entities/Article/testing'",
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
    {
      filename:
        'E:\\study\\production_project\\src\\shared\\config\\storybook\\StoreDecorator.tsx',
      code: "import { articleReducer } from '@/entities/Article'",
      errors: [
        {
          messageId: 'testingPublicApi',
        },
      ],
      output: "import { articleReducer } from '@/entities/Article/testing'",
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/StoreDecorator.tsx',
          ],
        },
      ],
    },
  ],
});
