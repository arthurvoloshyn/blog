/**
 * @fileoverview checking absolute paths
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/paths-checker'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run('paths-checker', rule, {
  valid: [
    {
      filename:
        'C:\\study\\production_project\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename:
        'C:\\study\\production_project\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { fetchProfileData } from 'features/EditableProfileCard/model/services/fetchProfileData/fetchProfileData'",
      errors: [{ message: 'Within a single module, the path must be relative' }],
      output:
        "import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'",
    },
    {
      filename:
        'C:\\study\\production_project\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { fetchProfileData } from '@/features/EditableProfileCard/model/services/fetchProfileData/fetchProfileData'",
      errors: [{ message: 'Within a single module, the path must be relative' }],
      options: [
        {
          alias: '@',
        },
      ],
      output:
        "import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'",
    },
    {
      filename:
        'C:\\study\\production_project\\src\\features\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { fetchProfileData } from '@/features/EditableProfileCard/fetchProfileData'",
      errors: [{ message: 'Within a single module, the path must be relative' }],
      options: [
        {
          alias: '@',
        },
      ],
      output: "import { fetchProfileData } from './fetchProfileData'",
    },
  ],
});
