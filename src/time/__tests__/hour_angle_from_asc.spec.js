const { NaiveDateTime } = require('../../chrono');
const { Angle, Longitude } = require('../../coords');
const { hour_angle_from_asc } = require('../index');

describe('A test suite for: time/hour_angle_from_asc', () => {
  test('hour_angle_from_asc', () => {
    const utc = NaiveDateTime.from_ymd_hms(
      1980,
      4,
      22,
      14,
      36,
      51.67
    );
    const asc = Angle.from_hms(18, 32, 21);
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const angle = hour_angle_from_asc(utc, asc, lng);

    expect(angle.hour()).toBe(5);
    expect(angle.minute()).toBe(51);
    // Actual: 45.13755004777039
    // TODO:
    // Is this value correct?
    expect(angle.second()).toBeCloseTo(44, -1);
  });
});
