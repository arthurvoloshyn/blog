'use strict';

const { isRelativePath } = require('../helpers');
const micromatch = require('micromatch');

module.exports = {
  meta: {
    messages: {
      publicApi: 'Абсолютный импорт разрешен только из PublicApi (index.ts)',
      testingPublicApi:
        'Тестовые данные необходимо импортировать из PublicApi (testing.ts)',
    },
    type: 'problem',
    docs: {
      description: 'Prohibits imports not from public api',
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
        },
        testFilesPatterns: {
          type: 'array',
        },
      },
    ],
  },

  create(context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {};

    return {
      ImportDeclaration(node) {
        const checkingLayers = {
          pages: 'pages',
          widgets: 'widgets',
          features: 'features',
          entities: 'entities',
        };

        const value = node.source.value;

        const currentFilePath = context.getFilename();

        const isCurrentFileTesting = testFilesPatterns.some((pattern) =>
          micromatch.isMatch(currentFilePath, pattern)
        );

        const pathTo = alias ? value.replace(`${alias}/`, '') : value;

        if (isRelativePath(pathTo)) return;

        // [entities, Article, model, ...other]
        const segments = pathTo.split('/');

        const layer = segments[0];
        const slice = segments[1];

        if (!checkingLayers[layer]) return;

        const isNotImportFromPublicApi = segments.length > 2;

        // [entities, Article, testing]
        const isTestingPublicApi =
          segments[2] === 'testing';

        if (isNotImportFromPublicApi && !isTestingPublicApi && !isCurrentFileTesting) {
          context.report({
            node,
            messageId: 'publicApi',
            fix(fixer) {
              return fixer.replaceText(
                node.source,
                `'${alias}/${layer}/${slice}'`
              );
            },
          });
        }

        if (isTestingPublicApi) {
          if (!isCurrentFileTesting) {
            context.report({
              node,
              messageId: 'testingPublicApi',
            });
          } else if (segments.length >= 4) {
            context.report({
              node,
              messageId: 'testingPublicApi',
              fix(fixer) {
                return fixer.replaceText(
                  node.source,
                  `'${alias}/${layer}/${slice}/testing'`
                );
              },
            });
          }
        }

        if (!isTestingPublicApi && isCurrentFileTesting) {
          context.report({
            node,
            messageId: 'testingPublicApi',
            fix(fixer) {
              return fixer.replaceText(
                node.source,
                `'${alias}/${layer}/${slice}/testing'`
              );
            },
          });
        }
      },
    };
  },
};
