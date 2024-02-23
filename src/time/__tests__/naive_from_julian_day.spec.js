const { naive_from_julian_day } = require('../index');

describe('A test suite for: time/naive_from_julian_day', () => {
  test('naive_from_julian_day', () => {
    let dt = naive_from_julian_day(2_446_113.75);
    expect(dt.year()).toBe(1985);
    // NOTE: 'month' is indexed in JS
    expect(dt.month() + 1).toBe(2);
    // NOTE: 'day' in Rust is 'date' in JS
    expect(dt.date()).toBe(17);
    expect(dt.hour()).toBe(6);
  });
});
