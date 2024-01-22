'use strict';

const {
  isRelativePath,
  getCurrentFileLayer,
  getImportLayer,
} = require('../helpers');
const micromatch = require('micromatch');

module.exports = {
  meta: {
    messages: {
      layerImports:
        'Слой может импортировать в себя только нижележащие слои (shared, entities, features, widgets, pages, app)',
    },
    type: 'suggestion',
    docs: {
      description: 'prevent imports from upper layers',
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
        },
        ignoreImportPatterns: {
          type: 'array',
        },
      },
    ],
  },

  create(context) {
    const layers = {
      app: ['pages', 'widgets', 'features', 'shared', 'entities'],
      pages: ['widgets', 'features', 'shared', 'entities'],
      widgets: ['features', 'shared', 'entities'],
      features: ['shared', 'entities'],
      entities: ['shared', 'entities'],
      shared: ['shared'],
    };

    const availableLayers = {
      app: 'app',
      entities: 'entities',
      features: 'features',
      shared: 'shared',
      pages: 'pages',
      widgets: 'widgets',
    };

    const { alias = '', ignoreImportPatterns = [] } = context.options[0] ?? {};

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        const currentFileLayer = getCurrentFileLayer(context);
        const importLayer = getImportLayer(alias, importPath);

        if (isRelativePath(importPath)) return;

        if (!availableLayers[currentFileLayer] || !availableLayers[importLayer])
          return;

        const isIgnored = ignoreImportPatterns.some((pattern) =>
          micromatch.isMatch(importPath, pattern)
        );

        if (isIgnored) return;

        if (!layers[currentFileLayer]?.includes(importLayer)) {
          context.report({
            node,
            messageId: 'layerImports',
          });
        }
      },
    };
  },
};
