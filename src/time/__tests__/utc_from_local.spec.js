const { NaiveDateTime } = require('../../chrono');
const { utc_from_local } = require('../index');

describe('A test suite for: time/utc_from_local', () => {
  test('utc_from_local', () => {
    const zone = 4;
    const daylight_saving = 1;
    const local = NaiveDateTime.from_ymd_hms(
      1988,
      7,
      1,
      3 - daylight_saving,
      37
    );
    const utc = utc_from_local(local, zone);
    expect(utc.hour()).toBe(22);
    expect(utc.minute()).toBe(37);
  });
});
