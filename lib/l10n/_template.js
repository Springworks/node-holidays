/**
 * Template public holidays.
 */

// Module dependencies.
var moment = require('moment');


/**
 * The current locale.
 *
 * @type {String}
 */
exports.locale = 'en-US'; // Change to your locale


/**
 * Gets all the holidays for a given year.
 *
 * @param  {Number} year The year.
 * @return {Array}       An array of dates that is holidays.
 */
exports.getHolidays = function(year) {
  // This function should return all the public holidays
  // for a given year. It's up to the implementer if he
  // or she want to sort the output.
  return [];
};


/**
 * Checks if a single date is a Holiday.
 *
 * @param  {String}   date  A string of the date to check.
 * @return {Boolean}        True if the date is a holiday.
 */
exports.isHoliday = function(date) {
  // This function should check if a single date is a public holiday.
  return false;
};
