const { find_kepler } = require('../index');

describe('A test suite for: sun/find_kepler', () => {
  test('find_kepler', () => {
    const mean_anom = 3.527_781;
    // Actual: 3.521_581_853_477_305
    const ecc = find_kepler(mean_anom);
    expect(ecc).toBeCloseTo(3.521_582, 6);
  });
});
