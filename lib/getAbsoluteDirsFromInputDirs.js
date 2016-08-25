var resolve = require('path').resolve;
var pathExists = require('babel-resolver/lib/pathExists');
var pathIsRelative = require('babel-resolver/lib/pathIsRelative');
var glob = require('glob');

function getAbsoluteDirsFromInputDirs(inputDirs, appRootPath) {
  return inputDirs.reduce(function (absoluteDirs, inputDir) {
    var fromAppRoot = resolve(appRootPath, inputDir);

    if (glob.hasMagic(inputDir)) {
      var absoluteDirsOfGlob = getAbsoluteDirsFromInputDirs(glob.sync(inputDir), appRootPath);
      return absoluteDirs.concat(absoluteDirsOfGlob);
    }

    if (pathExists(fromAppRoot)) {
      return absoluteDirs.concat(fromAppRoot);
    }

    if (!pathIsRelative(inputDir) && pathExists(inputDir)) {
      return absoluteDirs.concat(inputDir);
    }

    throw new Error('ResolverPlugin Error: Unable to find path: "' + inputDir + '". Make sure it is either a valid relative path from your project\'s root directory or a valid absolute path.');
  }, []);
};

module.exports = getAbsoluteDirsFromInputDirs;
