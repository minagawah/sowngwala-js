const {
  naive_time_from_decimal_days,
} = require('../index');

describe('A test suite for: time/naive_time_from_decimal_days', () => {
  test('naive_time_from_decimal_days', () => {
    const { day, naive } =
      naive_time_from_decimal_days(17.25);
    expect(day).toBe(17);
    expect(naive.hour()).toBe(6);
  });
});
