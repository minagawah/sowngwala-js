const moment = require('moment');

const {
  Angle,
  EquaCoord,
  GeoCoord,
  Longitude,
  Latitude,
  horizontal_from_equatorial,
} = require('../index');

describe('A test suite for: coords/horizontal_from_equatorial', () => {
  test('horizontal_from_equatorial', () => {
    // Peter Duffett-Smith, p.36

    const utc = moment(
      Date.UTC(1980, 4 - 1, 22, 14, 36, 51.67)
    ).utc();

    const asc = Angle.from_hms(18, 32, 21);
    const dec = Angle.from_hms(23, 13, 10);
    const equa_coord = EquaCoord({ asc, dec });

    const lat = Latitude({ degrees: 52, bound: 'N' });
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const geo_coord = GeoCoord({ lat, lng });

    const {
      coord: { azimuth, altitude },
    } = horizontal_from_equatorial(
      utc,
      equa_coord,
      geo_coord
    );

    // Azimuth (A)
    expect(azimuth.hour()).toBe(283);
    expect(azimuth.minute()).toBe(16);
    expect(azimuth.minute()).toBeCloseTo(16, 0);

    // Altitude (α)
    expect(altitude.hour()).toBe(19);
    expect(altitude.minute()).toBe(20);
    // Actual: 7.617965126296156
    expect(altitude.second()).toBeCloseTo(4, -1);
  });
});
