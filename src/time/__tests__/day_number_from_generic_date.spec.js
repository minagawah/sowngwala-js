const { NaiveDate } = require('../../chrono');

const {
  day_number_from_generic_date,
} = require('../index');

describe('A test suite for: time/day_number_from_generic_date', () => {
  test('day_number_from_generic_date', () => {
    let date;

    date = NaiveDate.from_ymd(1985, 2, 17);
    expect(day_number_from_generic_date(date)).toBe(48);

    date = NaiveDate.from_ymd(1988, 7, 27);

    expect(day_number_from_generic_date(date)).toBe(209);
  });
});
