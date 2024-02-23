const { longitude_and_mean_anomaly } = require('../index');

describe('A test suite for: sun/longitude_and_mean_anomaly', () => {
  test('longitude_and_mean_anomaly', () => {
    const days = -522;
    const { lng, mean_anom } =
      longitude_and_mean_anomaly(days);

    // Actual: 124.18773182997958
    expect(lng).toBeCloseTo(124.187_732, 6);

    // Actual: 3.5277809759101495
    expect(mean_anom).toBeCloseTo(3.527_781, 5);
  });
});
