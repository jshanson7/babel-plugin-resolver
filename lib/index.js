var resolve = require('path').resolve;
var createBabelResolver = require('babel-resolver');
var findNodeModulesPath = require('babel-resolver/lib/findNodeModulesPath');
var getPluginOptsFromBabelOpts = require('./getPluginOptsFromBabelOpts');
var getAbsoluteDirsFromInputDirs = require('./getAbsoluteDirsFromInputDirs');

module.exports = ResolverPlugin;

function ResolverPlugin() {
  var nodeModulesPath = findNodeModulesPath(__dirname);
  var appRootPath = resolve(nodeModulesPath, '..');
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
}
