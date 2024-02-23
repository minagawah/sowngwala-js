const moment = require('moment');

const {
  julian_day_from_generic_datetime,
  naive_time_from_decimal_hours,
} = require('../index');

describe('A test suite for: time/julian_day_from_generic_datetime', () => {
  test('julian_day_from_generic_datetime', () => {
    let naive = naive_time_from_decimal_hours(6.0);
    let date = Date.UTC(
      1985,
      2 - 1,
      17,
      naive.hour(),
      naive.minute(),
      naive.second()
    );
    let dt = moment(date).utc();
    let jd = julian_day_from_generic_datetime(dt);
    expect(jd).toBe(2_446_113.75);
  });
});
