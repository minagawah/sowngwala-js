const moment = require('moment');

const {
  julian_day_from_generic_date,
} = require('../index');

describe('A test suite for: time/julian_day_from_generic_date', () => {
  test('julian_day_from_generic_date', () => {
    let date = Date.UTC(1985, 2 - 1, 17);
    let dt = moment(date).utc();
    let jd = julian_day_from_generic_date(dt);
    expect(jd).toBe(2_446_113.5);
  });
});
