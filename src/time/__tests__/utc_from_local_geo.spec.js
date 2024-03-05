const { NaiveDateTime } = require('../../chrono');
const {
  Latitude,
  Longitude,
  GeoCoord,
} = require('../../coords');

const { utc_from_local_geo } = require('../index');

describe('A test suite for: time/utc_from_local_geo', () => {
  test('utc_from_local_geo', () => {
    const local = NaiveDateTime.from_ymd_hms(
      2024,
      3,
      12,
      21,
      14,
      0
    );

    const lat = Latitude({ degrees: 35.67, bound: 'N' });
    const lng = Longitude({ degrees: 139.65, bound: 'E' });
    const geo = GeoCoord({ lat, lng });
    const utc = utc_from_local_geo(local, geo);

    expect(utc.hour()).toBe(12);
  });
});
