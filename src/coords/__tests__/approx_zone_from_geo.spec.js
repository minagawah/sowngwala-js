const moment = require('moment-timezone');

const { NaiveDateTime } = require('../../chrono');
const {
  Latitude,
  Longitude,
  GeoCoord,
  approx_zone_from_geo,
  zone_format,
} = require('../index');

describe('A test suite for: coords/approx_zone_from_geo', () => {
  const now = new Date();

  it('approx_zone_from_geo (1) - tz.names', () => {
    const list = moment.tz.names();
    expect(list[321]).toBe('Asia/Tokyo');
  });

  it('approx_zone_from_geo (2) - tz(Japan)', () => {
    const zone = moment(now).tz('Japan').format('Z');
    expect(zone).toBe('+09:00');
  });

  it('approx_zone_from_geo (3) - approx', () => {
    const d = moment(now);
    const lat = Latitude({ degrees: 35.67, bound: 'N' });
    const lng = Longitude({ degrees: 139.65, bound: 'E' });
    const geo = GeoCoord({ lat, lng });

    const local = NaiveDateTime.from_ymd_hms(
      d.year(),
      d.month() + 1,
      d.date(),
      d.hour(),
      d.minute(),
      d.second()
    );

    const zone = approx_zone_from_geo(local, geo);
    expect(zone).toBe(9);

    const zone_1 = zone_format(zone);
    expect(zone_1).toBe('+09:00');
  });
});
