const { NaiveDate } = require('../../chrono');
const { day_of_the_week } = require('../index');

describe('A test suite for: time/day_of_the_week', () => {
  test('day_of_the_week', () => {
    let date = NaiveDate.from_ymd(1985, 2, 17);
    expect(day_of_the_week(date)).toBe(0);
  });
});
