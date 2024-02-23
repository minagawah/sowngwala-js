const { julian_day } = require('../index');

describe('A test suite for: time/julian_day', () => {
  test('julian_day', () => {
    expect(julian_day(1985, 2, 17.25)).toBe(2_446_113.75);
  });
});
