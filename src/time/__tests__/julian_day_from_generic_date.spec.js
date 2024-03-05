const { NaiveDate } = require('../../chrono');
const {
  julian_day_from_generic_date,
} = require('../index');

describe('A test suite for: time/julian_day_from_generic_date', () => {
  test('julian_day_from_generic_date', () => {
    let date = NaiveDate.from_ymd(1985, 2, 17);
    let jd = julian_day_from_generic_date(date);
    expect(jd).toBe(2_446_113.5);
  });
});
