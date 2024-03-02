const moment = require('moment');

const { Angle, Longitude } = require('../../coords');
const {
  asc_from_hour_angle,
} = require('../asc_from_hour_angle');

describe('A test suite for: time/asc_from_hour_angle', () => {
  test('asc_from_hour_angle', () => {
    const utc = moment(
      Date.UTC(1980, 4 - 1, 22, 14, 36, 51.67)
    ).utc();

    const hour_angle = Angle.from_hms(5, 51, 44);
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const angle = asc_from_hour_angle(utc, hour_angle, lng);

    expect(angle.hour()).toBe(18);
    expect(angle.minute()).toBe(32);
    // Actual: 20.5577423601585
    expect(angle.second()).toBeCloseTo(21, 0);
  });
});
