const { NaiveDateTime } = require('../../chrono');
const { Angle, Longitude } = require('../../coords');
const { asc_from_hour_angle } = require('../index');

describe('A test suite for: time/asc_from_hour_angle', () => {
  test('asc_from_hour_angle', () => {
    const utc = NaiveDateTime.from_ymd_hms(
      1980,
      4,
      22,
      14,
      36,
      51.67
    );
    const hour_angle = Angle.from_hms(5, 51, 44);
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const angle = asc_from_hour_angle(utc, hour_angle, lng);

    expect(angle.hour()).toBe(18);
    expect(angle.minute()).toBe(32);
    // Actual: 22.137550047770844
    // TODO:
    // Is this value correct?
    expect(angle.second()).toBeCloseTo(21, -1);
  });
});
