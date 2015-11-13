var _ = require('lodash');

// Sadly this is the only way to get a plugin's options from within `manipulateOptions`...
// In `pre()`, they can be accessed by `this.opts`, but unfortunately `manipulateOptions` gets
// called *before* `pre()` and isn't supplied with `this`
module.exports = function getPluginOptsFromBabelOpts(babelOpts) {
  var plugin = _.findWhere(babelOpts.plugins, function (plugin) {
    // hack: assume it's the correct plugin if it's options have a `resolveDirs` property
    return _.isArray(plugin) &&
      _.isObject(plugin[1]) &&
      _.isArray(plugin[1].resolveDirs);
  });

  if (!plugin) {
    throw new Error('ResolverPlugin Error: Invalid (or no) options passed. Make sure your plugin config looks something like this: ["resolver", { "resolveDirs": ["example-app/lib"] }]');
  }

  return plugin[1];
}
