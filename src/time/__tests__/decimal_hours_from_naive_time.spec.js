const { NaiveTime } = require('../../chrono');
const {
  decimal_hours_from_naive_time,
} = require('../index');

describe('A test suite for: time/decimal_hours_from_naive_time', () => {
  test('decimal_hours_from_naive_time', () => {
    const naive = NaiveTime.from_hmsn(18, 31, 27, 0);
    // Actual: 18.524166666666666
    const hours = decimal_hours_from_naive_time(naive);
    // Checking 4th digit which
    // is '1', but is round up
    // to '2' because of '6'.
    expect(hours).toBeCloseTo(18.5242, 4); // 1e-5
  });
});
