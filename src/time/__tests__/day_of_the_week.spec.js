const moment = require('moment');

const { day_of_the_week } = require('../index');

describe('A test suite for: time/day_of_the_week', () => {
  test('day_of_the_week', () => {
    let date = Date.UTC(1985, 2 - 1, 17);
    let dt = moment(date).utc();
    expect(day_of_the_week(dt)).toBe(0);
  });
});
