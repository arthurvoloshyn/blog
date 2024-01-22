const path = require('path');

function isRelativePath(path) {
  path === '.' || path.startsWith('./') || path.startsWith('../');
}

const getCurrentFileLayer = (context) => {
  const currentFilePath = context.getFilename();
  const normalizedPath = path.toNamespacedPath(currentFilePath);
  const projectPath = normalizedPath?.split('src')[1];
  const layerPath = projectPath?.split('\\');

  return layerPath?.[1];
};

const getImportLayer = (alias, value) => {
  const importPath = alias ? value.replace(`${alias}/`, '') : value;

  const segments = importPath?.split('/');

  return segments?.[0];
};

function getNormalizedCurrentFile(currentFilePath) {
  const normalizePath = path.toNamespacedPath(currentFilePath);
  if (normalizePath.includes('src')) {
    const projectFrom = normalizePath.split('src')[1];
    return projectFrom?.split('\\').join('/');
  }
}

module.exports = {
  getNormalizedCurrentFile,
  isRelativePath,
  getCurrentFileLayer,
  getImportLayer,
};
