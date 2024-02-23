const moment = require('moment');

const { is_julian_date } = require('../index');

describe('A test suite for: time/', () => {
  test('is_julian_date', () => {
    let date;

    date = moment(Date.UTC(1582, 10 - 1, 14)).utc();
    expect(is_julian_date(date)).toBe(true);

    date = moment(Date.UTC(1582, 10 - 1, 15)).utc();
    expect(is_julian_date(date)).toBe(false);
  });
});
