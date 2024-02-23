const { is_leap_year } = require('../index');

describe('A test suite for: time/is_leap_year', () => {
  test('is_leap_year', () => {
    expect(is_leap_year(1582)).toBe(false);
    expect(is_leap_year(1583)).toBe(false);
    expect(is_leap_year(1584)).toBe(true);
    expect(is_leap_year(1984)).toBe(true);
    expect(is_leap_year(1985)).toBe(false);
    expect(is_leap_year(1986)).toBe(false);
    expect(is_leap_year(1987)).toBe(false);
    expect(is_leap_year(1988)).toBe(true);
    expect(is_leap_year(2023)).toBe(false);
    expect(is_leap_year(2024)).toBe(true);
    expect(is_leap_year(2025)).toBe(false);
  });
});
