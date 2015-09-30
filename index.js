'use strict';

var path = require('path');


module.exports = exports = Holidays;



/**
 * Constructor for the holiday class.
 *
 * @constructor
 * @param {String} locale The locale to use.
 */
function Holidays(locale) {
  if (!(this instanceof Holidays)) {
    return new Holidays(locale);
  }
  if (locale) {
    this.setLocale(locale);
  }
}


/**
 * Gets all the holidays for a given year.
 * Must be overriden with l10n lib.
 *
 * @param  {Mixed} year  The year number of a moment object.
 * @return {Array}       An array of dates that is holidays.
 */
Holidays.prototype.getHolidays = function(year) {
  throw new Error('Not implemented');
};


/**
 * Checks if a single date is a Holiday.
 * Must be overriden with l10n lib.
 *
 * @param  {String}   date  A string of the date to check.
 * @return {Boolean}        True if the date is a holiday.
 */
Holidays.prototype.isHoliday = function(date) {
  throw new Error('Not implemented.');
};


/**
 * Gets the current locale.
 *
 * @return {String} The current locale
 */
Holidays.prototype.getLocale = function() {
  return this.locale;
};


/**
 * Sets the current locale and overrides the methods.
 *
 * @param {String} locale The local to set.
 */
Holidays.prototype.setLocale = function(locale) {
  var holiday_functions;

  locale = locale.toLowerCase() + '.js';
  holiday_functions = require(path.join(__dirname, 'lib', 'l10n', locale));
  Object.keys(holiday_functions).forEach(function(key) {
    this[key] = holiday_functions[key];
  }, this);
};
