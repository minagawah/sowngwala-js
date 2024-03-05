const { NaiveDateTime } = require('../../chrono');
const {
  julian_day_from_generic_datetime,
  naive_time_from_decimal_hours,
} = require('../index');

describe('A test suite for: time/julian_day_from_generic_datetime', () => {
  test('julian_day_from_generic_datetime', () => {
    let time = naive_time_from_decimal_hours(6.0);
    let dt = NaiveDateTime.from_ymd_hmsn(
      1985,
      2,
      17,
      time.hour(),
      time.minute(),
      time.second(),
      time.nanosecond()
    );
    let jd = julian_day_from_generic_datetime(dt);
    expect(jd).toBe(2_446_113.75);
  });
});
