'use strict';

const path = require('path');
const { isRelativePath, getNormalizedCurrentFile } = require('../helpers');

module.exports = {
  meta: {
    messages: {
      someMessageId: 'В рамках одного модуля путь должен быть относительным',
    },
    type: 'suggestion',
    docs: {
      description: 'checking absolute paths in fsd slices',
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
      },
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {
        try {
          const value = node.source.value;

          const pathTo = alias ? value.replace(`${alias}/`, '') : value;

          const pathFrom = context.getFilename();

          if (shouldRelativePath(pathTo, pathFrom)) {
            context.report({
              node,
              messageId: 'someMessageId',
              fix: (fixer) => {
                const pathWithoutExtension = getNormalizedCurrentFile(pathFrom)
                  .split('/')
                  .slice(0, -1)
                  .join('/');

                let relativePath = path
                  .relative(pathWithoutExtension, `/${pathTo}`)
                  .split('\\')
                  .join('/');

                if (!relativePath.startsWith('.')) {
                  relativePath = './' + relativePath;
                }

                return fixer.replaceText(node.source, `'${relativePath}'`);
              },
            });
          }
        } catch (e) {
        }
      },
    };
  },
};

const pathList = {
  pages: 'pages',
  widgets: 'widgets',
  features: 'features',
  entities: 'entities',
  shared: 'shared',
};

function shouldRelativePath(to, from) {
  if (isRelativePath(to)) {
    return false;
  }

  const toArray = to.split('/');
  const toLayer = toArray[0];
  const toSlice = toArray[1];

  if (!toLayer || !toSlice || !pathList[toLayer]) {
    return false;
  }

  const fromArray = getNormalizedCurrentFile(from)?.split('/');

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !pathList[fromLayer]) {
    return false;
  }

  return toLayer === fromLayer && toSlice === fromSlice;
}
