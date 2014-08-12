/**
 * Tests for the swedish localized version.
 */


// Module dependencies
var should = require('should');
var moment = require('moment');
var holidays = require('../index.js')('sv-SE');

describe('node-holidays/sv-SE.js', function() {

  it('Should handle both strings and moment objects as input.', function() {
    var momentHolidayDate = moment('2014-12-26', 'YYYY-MM-DD'),
        momentNonHolidayDate = moment('2014-12-24', 'YYYY-MM-DD');

    // isHoliday
    holidays.isHoliday(momentHolidayDate).should.be.true;
    holidays.isHoliday(momentNonHolidayDate).should.be.false;
    holidays.isHoliday('2014-12-26').should.be.true;
    holidays.isHoliday('2014-12-24').should.be.false;

    // getHolidays
    holidays.getHolidays(momentHolidayDate).should.be.an.Array;
    holidays.getHolidays(2014).should.be.an.Array;
  });

  it('Should return an array with all the holidays for a given year.', function() {
    var expected = {
      '2014': [
        '2014-01-01', '2014-01-06', '2014-05-01', '2014-06-06', '2014-12-25',
        '2014-12-26', '2014-04-18', '2014-04-20', '2014-04-21', '2014-05-29',
        '2014-06-08', '2014-06-21', '2014-11-01'
      ],
      '2015': [
        '2015-01-01', '2015-01-06', '2015-05-01', '2015-06-06', '2015-12-25',
        '2015-12-26', '2015-04-03', '2015-04-05', '2015-04-06', '2015-05-14',
        '2015-05-24', '2015-06-20', '2015-10-31'
      ]
    };

    Object.keys(expected).forEach(function(el, idx, arr) {
      var actual = holidays.getHolidays(el);
      actual.should.eql(expected[el]);
    });
  });

  it('Should be possible to check static date holidays', function() {
    // Nyårsdagen
    holidays.isHoliday('2013-01-01').should.be.true;
    holidays.isHoliday('2014-01-01').should.be.true;
    holidays.isHoliday('2015-01-01').should.be.true;

    // Trettondedag jul
    holidays.isHoliday('2013-01-06').should.be.true;
    holidays.isHoliday('2014-01-06').should.be.true;
    holidays.isHoliday('2015-01-06').should.be.true;

    // Första maj
    holidays.isHoliday('2013-05-01').should.be.true;
    holidays.isHoliday('2014-05-01').should.be.true;
    holidays.isHoliday('2015-05-01').should.be.true;

    // Nationaldagen
    holidays.isHoliday('2013-06-06').should.be.true;
    holidays.isHoliday('2014-06-06').should.be.true;
    holidays.isHoliday('2015-06-06').should.be.true;

    // Juldagen
    holidays.isHoliday('2013-12-25').should.be.true;
    holidays.isHoliday('2014-12-25').should.be.true;
    holidays.isHoliday('2015-12-25').should.be.true;

    // Annandag jul
    holidays.isHoliday('2013-12-26').should.be.true;
    holidays.isHoliday('2014-12-26').should.be.true;
    holidays.isHoliday('2015-12-26').should.be.true;
  });

  it('Should be possible to check if given date is good friday', function() {
    // Fixture dates taken from http://www.kalender-365.se/helgdagar/l%C3%A5ngfredagen.html
    var fixture = [
      '2014-04-18', '2015-04-03', '2016-03-25', '2017-04-14', '2018-03-30',
      '2019-04-19', '2020-04-10', '2021-04-02', '2022-04-15', '2023-04-07',
      '2024-03-29'
    ];

    // Check each date in the array.
    fixture.map(function(el, idx, arr) {
      holidays.isHoliday(el).should.be.true;
    });
  });

  it('Should be possible to check if given date is easter sunday.', function() {
    // Fixture dates taken from http://sv.wikipedia.org/wiki/P%C3%A5skdagen
    var fixture = [
      '2014-04-20', '2015-04-05', '2016-03-27', '2017-04-16', '2018-04-01',
      '2019-04-21', '2020-04-12', '2021-04-04', '2022-04-17', '2023-04-09',
      '2024-03-31'
    ];

    // Check each date in the array.
    fixture.map(function(el, idx, arr) {
      holidays.isHoliday(el).should.be.true;
    });
  });

  it('Should be possible to check if given date is easter monday.', function() {
    // Fixture dates taken from http://sv.wikipedia.org/wiki/P%C3%A5skdagen
    // Always the day after easter sunday.
    var fixture = [
      '2014-04-21', '2015-04-06', '2016-03-28', '2017-04-17', '2018-04-02',
      '2019-04-22', '2020-04-13', '2021-04-05', '2022-04-18', '2023-04-10',
      '2024-04-01'
    ];

    // Check each date in the array.
    fixture.map(function(el, idx, arr) {
      holidays.isHoliday(el).should.be.true;
    });
  });

  it('Should be possible to check if given date is Ascension day.', function() {
    // Fixture dates taken from http://sv.wikipedia.org/wiki/Kristi_himmelsf%C3%A4rdsdag
    // Always the day after easter sunday.
    var fixture = [
      '2014-05-29', '2015-05-14', '2016-05-05', '2017-05-25', '2018-05-10',
      '2019-05-30', '2020-05-21', '2021-05-13', '2022-05-26', '2023-05-18',
      '2024-05-09'
    ];

    // Check each date in the array.
    fixture.map(function(el, idx, arr) {
      holidays.isHoliday(el).should.be.true;
    });
  });

  it('Should be possible to check if given date is Pentecost.', function() {
    // Fixture dates taken from http://sv.wikipedia.org/wiki/Kristi_himmelsf%C3%A4rdsdag
    // Always the day after easter sunday.
    var fixture = [
      '2014-06-08', '2015-05-24', '2016-05-15', '2017-06-04', '2018-05-20',
      '2019-06-09', '2020-05-31', '2021-05-23', '2022-06-05', '2023-05-28',
      '2024-05-19'
    ];

    // Check each date in the array.
    fixture.map(function(el, idx, arr) {
      holidays.isHoliday(el).should.be.true;
    });
  });

  it('Should be possible to check if given date is midsummer day', function() {
    // Fixture dates taken from http://www.kalender-365.se/helgdagar/midsommardagen.html
    var fixture = [
      '2014-06-21', '2015-06-20', '2016-06-25', '2017-06-24', '2018-06-23',
      '2019-06-22', '2020-06-20', '2021-06-26', '2022-06-25', '2023-06-24',
      '2024-06-22'
    ];

    // Check each date in the array.
    fixture.map(function(el, idx, arr) {
      holidays.isHoliday(el).should.be.true;
    });
  });

  it('Should be possible to check if given date is all saints day', function() {
    // Fixture dates taken from http://www.kalender-365.se/helgdagar/alla-helgons-dag.html
    var fixture = [
      '2014-11-01', '2015-10-31', '2016-11-05', '2017-11-04', '2018-11-03',
      '2019-11-02', '2020-10-31', '2021-11-06', '2022-11-05', '2023-11-04',
      '2024-11-02'
    ];

    // Check each date in the array.
    fixture.map(function(el, idx, arr) {
      holidays.isHoliday(el).should.be.true;
    });
  });

});
