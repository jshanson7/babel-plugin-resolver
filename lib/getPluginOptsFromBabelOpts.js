var find = require('lodash/find');
var isArray = require('lodash/isArray');
var isObject = require('lodash/isObject');

// Sadly this is the only way to get a plugin's options from within `manipulateOptions`...
// In `pre()`, they can be accessed by `this.opts`, but unfortunately `manipulateOptions` gets
// called *before* `pre()` and isn't supplied with `this`
module.exports = function getPluginOptsFromBabelOpts(babelOpts) {
  var plugin = find(babelOpts.plugins, function (plugin) {
    // hack: assume it's the correct plugin if it's options have a `resolveDirs` property
    return isArray(plugin) &&
      isObject(plugin[1]) &&
      isArray(plugin[1].resolveDirs);
  });

  if (!plugin) {
    throw new Error('ResolverPlugin Error: Invalid (or no) options passed. Make sure your plugin config looks something like this: ["resolver", { "resolveDirs": ["lib"] }]');
  }

  return plugin[1];
};
