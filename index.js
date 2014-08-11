/**
 * Bootstrap for the Holidays module.
 */


// Module dependencies
var path = require('path');


/** @see bootStrap */
module.exports = exports = bootStrap;


/**
 * Bootstraps the library with a given locale
 *
 * @param  {[type]} locale [description]
 * @return {[type]}        [description]
 */
function bootStrap(locale) {
  if (!locale) {
    locale = 'en-US';
  }
  locale = locale.toLowerCase() + '.js';
  return require(path.join(process.cwd(), 'lib', locale));
}
