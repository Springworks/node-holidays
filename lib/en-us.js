/**
 * US public holidays.
 */

// Module dependencies.
var moment = require('moment');


/** @see Holiday */
module.exports = new Holiday();



/**
 * Constructor for the Holidays class.
 *
 * @constructor
 */
function Holiday() {}


/**
 * Gets all the holidays for a given year.
 *
 * @param  {Number} year The year.
 * @return {Array}       An array of dates that is holidays.
 */
Holiday.prototype.getHolidays = function(year) {
  return [];
};


/**
 * Checks if a single date is a Holiday.
 *
 * @param  {String}   date  A string of the date to check.
 * @return {Boolean}        True if the date is a holiday.
 */
Holiday.prototype.isHoliday = function(date) {
  return false;
};
