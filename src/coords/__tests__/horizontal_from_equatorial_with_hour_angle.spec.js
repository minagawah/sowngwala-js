const {
  Angle,
  Latitude,
  horizontal_from_equatorial_with_hour_angle,
} = require('../index');

describe('A test suite for: coords/horizontal_from_equatorial_with_hour_angle', () => {
  test('horizontal_from_equatorial_with_hour_angle', () => {
    // Peter Duffett-Smith, p.36

    const hour_angle = Angle.from_hms(5, 51, 44);
    const dec = Angle.from_hms(23, 13, 10);
    const lat = Latitude({ degrees: 52, bound: 'N' });

    const {
      coord: { azimuth, altitude },
    } = horizontal_from_equatorial_with_hour_angle(
      hour_angle,
      dec,
      lat
    );

    // Azimuth (A)
    expect(azimuth.hour()).toBe(283);
    expect(azimuth.minute()).toBe(16);
    expect(azimuth.minute()).toBeCloseTo(16, 0);

    // Altitude (α)
    expect(altitude.hour()).toBe(19);
    expect(altitude.minute()).toBe(20);
    expect(altitude.second()).toBeCloseTo(4, 0);
  });
});
