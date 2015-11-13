var resolve = require('path').resolve;
var resolver = require('babel-resolver')(
  resolve(__dirname, '../example-app'),
  resolve(__dirname, '../example-app/lib')
);

var optionsManipulated = false;
var pluginOptions;

module.exports = ResolverPlugin;
function ResolverPlugin(babel, arg2) {
  // console.log('babel.OptionManager', babel.OptionManager);
  console.log('OptionManager', new babel.OptionManager());
  return {
    pre: function() {
      if (!pluginOptions && this.opts) {
        pluginOptions = this.opts;
      }
    },
    manipulateOptions: function (opts, parserOpts) {
      // if (optionsManipulated) {
      //   return;
      // }
      // if (!pluginOptions) {
      //   return;
      // }

      // console.log('pluginOptions', pluginOptions);
      // console.log('opts.plugins[0][0]', opts.plugins[0][0]);
      var previous = opts.resolveModuleSource;
      var hasPrevious = typeof previous === 'function';

      opts.resolveModuleSource = function(source) {
        var resolvedFromPrevious = hasPrevious ? previous.apply(null, arguments) : source;
        var result = resolver(source);
        return result;
      }
      optionsManipulated = true;
    }
  };
}

ResolverPlugin.pluginName = 'resolver';
