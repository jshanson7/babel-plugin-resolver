var resolve = require('path').resolve;
var createBabelResolver = require('babel-resolver');
var findNodeModulesPaths = require('babel-resolver/lib/findNodeModulesPaths');
var getPluginOptsFromBabelOpts = require('./getPluginOptsFromBabelOpts');
var getAbsoluteDirsFromInputDirs = require('./getAbsoluteDirsFromInputDirs');

module.exports = function ResolverPlugin() {
  var nodeModulesPaths = findNodeModulesPaths(__dirname);
  var appRootPath = resolve(nodeModulesPaths[0], '..');
  var resolver;
  return {
    manipulateOptions: function (babelOpts) {
      if (!resolver) {
        var pluginOpts = getPluginOptsFromBabelOpts(babelOpts);
        var absoluteDirs = getAbsoluteDirsFromInputDirs(pluginOpts.resolveDirs, appRootPath);
        resolver = createBabelResolver.apply(null, absoluteDirs);
      }

      var previousResolver = babelOpts.resolveModuleSource;
      var hasPreviousResolver = typeof previousResolver === 'function';

      babelOpts.resolveModuleSource = function (source) {
        var resolvedFromPrevious = hasPreviousResolver ?
          previousResolver.apply(null, arguments) :
          source;
        return resolver(resolvedFromPrevious);
      };
    }
  };
};
