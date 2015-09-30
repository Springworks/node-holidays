'use strict';

var moment = require('moment');

var DATE_FORMAT = 'YYYY-MM-DD';

var STATIC_HOLIDAYS = {
  'Nyårsdagen': {'month': 1, 'day': 1},
  'Trettondedag jul': {'month': 1, 'day': 6},
  'Första maj': {'month': 5, 'day': 1},
  'Nationaldagen': {'month': 6, 'day': 6},
  'Juldagen': {'month': 12, 'day': 25},
  'Annandag jul': {'month': 12, 'day': 26}
};

var DYNAMIC_HOLIDAYS = [
  isGoodFriday, isEasterSunday, isEasterMonday,
  isAscensionDay, isPentecost, isMidsummerDay,
  isAllSaintsDay
];


/**
 * The current locale.
 *
 * @type {String}
 */
exports.locale = 'sv-SE';


/**
 * Gets all the holidays for a given year.
 *
 * @param  {Mixed} year  The year number of a moment object.
 * @return {Array}       An array of dates that is holidays.
 */
exports.getHolidays = function(year) {
  var output = [];

  // Add all the static days
  Object.keys(STATIC_HOLIDAYS).forEach(function(el, idx, arr) {
    var date = moment({
      y: year,
      M: (STATIC_HOLIDAYS[el].month - 1), // 0 based month
      d: STATIC_HOLIDAYS[el].day
    }).format(DATE_FORMAT);
    output.push(date);
  });

  // Add the dynamic dates
  output.push(getEasterSunday(year).subtract(2, 'days').format(DATE_FORMAT));
  output.push(getEasterSunday(year).format(DATE_FORMAT));
  output.push(getEasterSunday(year).add(1, 'days').format(DATE_FORMAT));
  output.push(getEasterSunday(year).add(4, 'days').add((7 * 5), 'days').format(DATE_FORMAT));
  output.push(getEasterSunday(year).add((7 * 7), 'days').format(DATE_FORMAT));
  output.push(getMidsummerDay(year).format(DATE_FORMAT));
  output.push(getAllSaintsDay(year).format(DATE_FORMAT));

  // Return the holidays
  return output;
};


/**
 * Checks if a single date is a Holiday.
 *
 * @param  {Mixed}   date   A string of a moment object.
 * @return {Boolean}        True if the date is a holiday.
 */
exports.isHoliday = function(date) {
  var output = false;

  // Get a date object.
  date = moment(date, DATE_FORMAT);

  // Loop through the static date holidays
  Object.keys(STATIC_HOLIDAYS).forEach(function(element, index, array) {
    // Months in javascript are 0 based index.
    if (STATIC_HOLIDAYS[element].month === (date.month() + 1) &&
        STATIC_HOLIDAYS[element].day === date.date()) {
      output = true;
    }
  });

  // Check the dynamic holidays.
  DYNAMIC_HOLIDAYS.map(function(val) {
    var isDynamic = val.call(this, date);
    if (!output) {
      output = isDynamic;
    }
  });

  return output;
};



// ----- Private functions for dynamic holidays


/**
 * Checks if a given date is "Långfredag".
 * This is the closest friday before Easter Sunday.
 *
 * @param  {Moment}  date The date to check.
 * @return {Boolean}      True if the given date is good friday.
 */
function isGoodFriday(date) {
  var easterSunday = getEasterSunday(date.year()),
      goodFriday;

  // Get the closest friday back from easter sunday.
  // Since easter sunday is always a sunday, we can
  // subtract 2 days and get the correct day.
  goodFriday = easterSunday.subtract(2, 'days');

  // Check all the variables.
  return (date.year() === goodFriday.year() &&
      date.month() === goodFriday.month() &&
      date.date() === goodFriday.date());
}


/**
 * Checks if a given date is the easter sunday.
 *
 * @param  {Moment}  date The date to check.
 * @return {Boolean}      True if Easter Sunday.
 */
function isEasterSunday(date) {
  var easterSunday = getEasterSunday(date.year());
  return (date.year() === easterSunday.year() &&
      date.month() === easterSunday.month() &&
      date.date() === easterSunday.date());
}


/**
 * Checks if a given date is the easter monday.
 * This is always the day after easter sunday.
 *
 * @param  {Moment}  date The date to check.
 * @return {Boolean}      True if the date is easter monday.
 */
function isEasterMonday(date) {
  var easterSunday = getEasterSunday(date.year()),
      easterMonday;

  // Easter monday is always the day after easter sunday.
  easterMonday = easterSunday.add(1, 'days');

  // Check all the variables.
  return (date.year() === easterMonday.year() &&
      date.month() === easterMonday.month() &&
      date.date() === easterMonday.date());
}


/**
 * Checks if a given date is Ascension Day (Kristi himmelsfärdsdag).
 * 6th thursday after easter sunday.
 *
 * @param  {Moment}  date The date to check.
 * @return {Boolean}      True if the given date is Ascension day.
 */
function isAscensionDay(date) {
  var easterSunday = getEasterSunday(date.year()),
      ascensionDay;

  // Ascension Day is always the 6th thursday after easter Sunday.
  ascensionDay = easterSunday.add(4, 'days'); // Get the first thursday.
  ascensionDay = ascensionDay.add((7 * 5), 'days'); // Add 5 weeks to the thursday.

  // Check all the variables.
  return (date.year() === ascensionDay.year() &&
      date.month() === ascensionDay.month() &&
      date.date() === ascensionDay.date());
}


/**
 * Checks if a given date is Pentecost. (Pingstdagen)
 *
 * @param  {Moment}  date The date to check.
 * @return {Boolean}      True if the date is Pentecost.
 */
function isPentecost(date) {
  var easterSunday = getEasterSunday(date.year()),
      pentecost;

  // Ascension Day is always the 7th sunday after easter Sunday.
  pentecost = easterSunday.add((7 * 7), 'days'); // Add 7 weeks to the easter sunday.

  // Check all the variables.
  return (date.year() === pentecost.year() &&
      date.month() === pentecost.month() &&
      date.date() === pentecost.date());
}


/**
 * Checks if the given date is the midsummer day.
 * The midsummer day is always the saturday between 20th to the 26th of june.
 *
 * @param  {Moment}  date The date to check.
 * @return {Boolean}      True if the given date is midsummer day.
 */
function isMidsummerDay(date) {
  var midsummerDay = getMidsummerDay(date.year());

  // Check all the variables.
  return (date.year() === midsummerDay.year() &&
      date.month() === midsummerDay.month() &&
      date.date() === midsummerDay.date());
}


/**
 * Checks if a given date is the All Saints Day (Alla helgons dag).
 *
 * @param  {Moment}  date The date to check.
 * @return {Boolean}      True if the given date is all saints day.
 */
function isAllSaintsDay(date) {
  var allSaintsDay = getAllSaintsDay(date.year());

  // Check all the variables.
  return (date.year() === allSaintsDay.year() &&
      date.month() === allSaintsDay.month() &&
      date.date() === allSaintsDay.date());
}


/**
 * Gets the easter sunday for a given year.
 * Based on: http://www.smart.net/~mmontes/nature1876.html
 *
 * @param  {Number} year The year in which to get the easter sunday.
 * @return {Moment}      Moment object containing the date.
 */
function getEasterSunday(year) {
  var a = Math.floor(year % 19),
      b = Math.floor(year / 100),
      c = Math.floor(year % 100),
      d = Math.floor(b / 4),
      e = Math.floor(b % 4),
      f = Math.floor((b + 8) / 25),
      g = Math.floor((b - f + 1) / 3),
      h = Math.floor((19 * a + b - d - g + 15) % 30),
      i = Math.floor(c / 4),
      k = Math.floor(c % 4),
      l = Math.floor((32 + 2 * e + 2 * i - h - k) % 7),
      m = Math.floor((a + 11 * h + 22 * l) / 451),
      month = Math.floor((h + l - 7 * m + 114) / 31),
      day = Math.floor((h + l - 7 * m + 114) % 31);
  return moment({y: year, M: (month - 1), d: (day + 1)});
}


/**
 * Gets the midsummer day for a given year.
 *
 * @param  {Number} year The year.
 * @return {Moment}      The date.
 */
function getMidsummerDay(year) {
  var midsummerDay = moment({y: year, M: 5, d: 20}); // Months are 0 index.

  // Get the first saturday between yyyy-06-20 and yyyy-06-26
  while (midsummerDay.isoWeekday() !== 6 && midsummerDay.date() <= 26) {
    midsummerDay.add(1, 'days');
  }

  return midsummerDay;
}


/**
 * Gets the all saints day for a given year.
 *
 * @param  {Number} year The year.
 * @return {Moment}      The date.
 */
function getAllSaintsDay(year) {
  var allSaintsDay = moment({y: year, M: 9, d: 31}); // Months are 0 index.

  // Get the saturday between yyyy-10-31 and yyyy-11-06
  while (allSaintsDay.isoWeekday() !== 6 &&
      ((allSaintsDay.month() >= 9 && allSaintsDay.date() >= 31) ||
      (allSaintsDay.month() <= 10 && allSaintsDay.date() <= 6))) {
    allSaintsDay.add(1, 'days');
  }

  return allSaintsDay;
}

