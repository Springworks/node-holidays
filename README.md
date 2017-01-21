node-holidays
=============

[![Greenkeeper badge](https://badges.greenkeeper.io/Springworks/node-holidays.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/Springworks/node-holidays.svg?branch=master)](https://travis-ci.org/Springworks/node-holidays)
[![Coverage Status](https://coveralls.io/repos/Springworks/node-holidays/badge.png?branch=master)](https://coveralls.io/r/Springworks/node-holidays?branch=master)

A node module for managing local public holidays.

**Example 1:**
```js
var holidays = require('node-holidays')('sv-SE');

if(holidays.isHoliday('2014-12-25')) {
  // The 25th of December is a holiday.
}
```

**Example 2:**
```js
var Holidays = require('node-holidays'),
    holidays = Holidays('sv-SE');

if(holidays.isHoliday('2014-12-25')) {
  // The 25th of December is a holiday.
}
```

**Example 3:**
```js
var Holidays = require('node-holidays'),
    holidays = Holidays('sv-SE');

holidays.setLocale('en-US'); // Set the locale to en-US.
if(holidays.isHoliday('2014-12-25')) {
  // The 25th of December is a holiday.
}
```

## API

### `getLocale()`
Returns the current locale.

```js
var holidays = require('node-holidays')('en-US');
assert(holidays.getLocale() === 'en-US');
```

### `setLocale(locale)`
Sets the current locale for the module.

```js
var holidays = require('node-holidays')('en-US');
assert(holidays.getLocale() === 'en-US');
holidays.setLocale('sv-SE');
assert(holidays.getLocale() === 'sv-SE');
```

### `isHoliday(date)`
Checks if a given date is a holiday.

```js
var is_holiday = holidays.isHoliday('2014-12-25');
assert(is_holiday === true);
```

### `getHolidays(year)`
Gets an array of all holidays for a given year.

```js
var 2014_holidays = holidays.getHolidays(2014);
assert(2014_holidays.indexOf('2014-12-25') > -1);
```

## Extending

Look at `/lib/l10n/_template.js` for an example.


## sv-SE
* [Lag (1989:253) om allmänna helgdagar](http://www.riksdagen.se/sv/Dokument-Lagar/Lagar/Svenskforfattningssamling/Lag-1989253-om-allmanna-hel_sfs-1989-253/)
* [Helgdagar i Sverige](http://sv.wikipedia.org/wiki/Helgdagar_i_Sverige)
