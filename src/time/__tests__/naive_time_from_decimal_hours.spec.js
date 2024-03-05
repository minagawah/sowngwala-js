const {
  naive_time_from_decimal_hours,
} = require('../index');

describe('A test suite for: time/naive_time_from_decimal_hours', () => {
  test('naive_time_from_decimal_hours', () => {
    let time;

    time = naive_time_from_decimal_hours(1);
    expect(time.hour()).toBe(1);
    expect(time.minute()).toBe(0);
    expect(time.second()).toBe(0);

    time = naive_time_from_decimal_hours(0.5);
    expect(time.hour()).toBe(0);
    expect(time.minute()).toBe(30);
    expect(time.second()).toBe(0);

    time = naive_time_from_decimal_hours(0.01666666666);
    expect(time.hour()).toBe(0);
    expect(time.minute()).toBe(0);
    // Actual: 59.999999976
    expect(time.second()).toBeCloseTo(60, 0); // 1e-1

    time = naive_time_from_decimal_hours(18.52417);
    expect(time.hour()).toBe(18);
    expect(time.minute()).toBe(31);
    // Actual: 27.012000000005685
    expect(time.second()).toBeCloseTo(27, 0); // 1e-1
  });
});
