/**
 * US public holidays.
 */

// Module dependencies.
var moment = require('moment');


/**
 * The current locale.
 *
 * @type {String}
 */
exports.locale = 'en-US';


/**
 * Gets all the holidays for a given year.
 *
 * @param  {Number} year The year.
 * @return {Array}       An array of dates that is holidays.
 */
exports.getHolidays = function(year) {
  return [];
};


/**
 * Checks if a single date is a Holiday.
 *
 * @param  {String}   date  A string of the date to check.
 * @return {Boolean}        True if the date is a holiday.
 */
exports.isHoliday = function(date) {
  return false;
};
