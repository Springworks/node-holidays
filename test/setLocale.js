

var should = require('should'),
    Holidays = require('../index.js');

describe('Holidays/locale', function() {
  var holidays;

  it('Should be possible to switch locale during runtime', function() {
    holidays = Holidays('en-US');
    holidays.getLocale().should.eql('en-US');

    holidays.setLocale('sv-SE');
    holidays.getLocale().should.eql('sv-SE');
  });

  it('Should throw error without locale', function() {
    holidays = Holidays();
    (function() {
      holidays.getHolidays(2014);
    }).should.throw();

    (function() {
      holidays.isHoliday('2014-04-04');
    }).should.throw();
  });

  it('Should return the correct holidays when locale is changed', function() {
    var holidays_2014;

    holidays = Holidays('sv-SE');
    holidays_2014 = holidays.getHolidays(2014);

    holidays_2014.should.be.an.Array;
    holidays_2014.should.have.length(13);

    holidays.setLocale('en-US');
    holidays_2014 = holidays.getHolidays(2014);

    holidays_2014.should.be.an.Array;
    holidays_2014.should.have.length(0);
  });

});
