var fs = require('fs');

module.exports = function getFilenameFromBabelOpts(babelOpts) {
  try {
    fs.lstatSync(babelOpts.filename);
  } catch (e) {
    // File doesn't exist
    return null;
  }

  return babelOpts.filename;
};
