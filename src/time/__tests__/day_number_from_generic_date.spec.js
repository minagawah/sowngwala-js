const moment = require('moment');

const {
  day_number_from_generic_date,
} = require('../index');

describe('A test suite for: time/day_number_from_generic_date', () => {
  test('day_number_from_generic_date', () => {
    let date;

    date = moment(Date.UTC(1985, 2 - 1, 17)).utc();
    expect(day_number_from_generic_date(date)).toBe(48);

    date = moment(Date.UTC(1988, 7 - 1, 27)).utc();
    expect(day_number_from_generic_date(date)).toBe(209);
  });
});
