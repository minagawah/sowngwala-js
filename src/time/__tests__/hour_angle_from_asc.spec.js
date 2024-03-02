const moment = require('moment');

// const { NaiveTime } = require('../../chrono');
const { Angle, Longitude } = require('../../coords');
const {
  hour_angle_from_asc,
} = require('../hour_angle_from_asc');

describe('A test suite for: time/hour_angle_from_asc', () => {
  test('hour_angle_from_asc', () => {
    const utc = moment(
      Date.UTC(1980, 4 - 1, 22, 14, 36, 51.67)
    ).utc();

    const asc = Angle.from_hms(18, 32, 21);
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const angle = hour_angle_from_asc(utc, asc, lng);

    expect(angle.hour()).toBe(5);
    expect(angle.minute()).toBe(51);
    // Actual: 43.557742360158045
    expect(angle.second()).toBeCloseTo(44, 0);
  });
});
