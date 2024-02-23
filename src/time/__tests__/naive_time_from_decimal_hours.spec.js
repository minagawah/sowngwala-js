const {
  naive_time_from_decimal_hours,
} = require('../index');

describe('A test suite for: time/naive_time_from_decimal_hours', () => {
  test('naive_time_from_decimal_hours', () => {
    let naive;

    naive = naive_time_from_decimal_hours(1);
    expect(naive.hour()).toBe(1);
    expect(naive.minute()).toBe(0);
    expect(naive.second()).toBe(0);

    naive = naive_time_from_decimal_hours(0.5);
    expect(naive.hour()).toBe(0);
    expect(naive.minute()).toBe(30);
    expect(naive.second()).toBe(0);

    naive = naive_time_from_decimal_hours(0.01666666666);
    expect(naive.hour()).toBe(0);
    expect(naive.minute()).toBe(0);
    // Actual: 59.999999976
    expect(naive.second()).toBeCloseTo(60, 0); // 1e-1

    naive = naive_time_from_decimal_hours(18.52417);
    expect(naive.hour()).toBe(18);
    expect(naive.minute()).toBe(31);
    // Actual: 27.012000000005685
    expect(naive.second()).toBeCloseTo(27, 0); // 1e-1
  });
});
