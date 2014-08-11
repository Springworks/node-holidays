node-holidays
=============

[![Build Status](https://travis-ci.org/Springworks/node-holidays.svg?branch=master)](https://travis-ci.org/Springworks/node-holidays)
[![Coverage Status](https://coveralls.io/repos/Springworks/node-holidays/badge.png?branch=master)](https://coveralls.io/r/Springworks/node-holidays?branch=master)

A node module for managing local holidays.


Example:

```js
var holidays = require('node-holidays')('sv-SE'); // For swedish holidays.

if(holidays.isHoliday('2014-12-25')) {
  // The 25th of December is a holiday.
}
```



## API

### `isHoliday(date)`
Checks if a given date is a holiday.

```js
var is_holiday = holidays.isHoliday('2014-12-25');
assert(is_holiday === true);
````

### `getHolidays(year)`
Gets an array of all holidays for a given year.

```js
var 2014_holidays = holidays.getHolidays(2014);
assert(2014_holidays.indexOf('2014-12-25') > -1);
```