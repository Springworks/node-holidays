/**
 * Tests for the US localized version.
 */


// Module dependencies
var should = require('should');
var Holidays = require('../../index.js');

describe('node-holidays/en-US.js', function() {
  var holidays;

  before(function() {
    holidays = Holidays('');
  });

  it('Should return an array with all the holidays for a given year.', function() {
    holidays.getHolidays().should.eql([]);
  });

  it('Should be possible to check static date holidays', function() {
    holidays.isHoliday('10/01/2014').should.be.false;
  });

});
