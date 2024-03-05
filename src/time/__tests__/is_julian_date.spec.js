const { NaiveDate } = require('../../chrono');
const { is_julian_date } = require('../index');

describe('A test suite for: time/', () => {
  test('is_julian_date', () => {
    let date;

    date = NaiveDate.from_ymd(1582, 10, 14);
    expect(is_julian_date(date)).toBe(true);

    date = NaiveDate.from_ymd(1582, 10, 15);
    expect(is_julian_date(date)).toBe(false);
  });
});
