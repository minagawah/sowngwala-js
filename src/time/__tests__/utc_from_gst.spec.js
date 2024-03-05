const { NaiveDateTime } = require('../../chrono');
const { utc_from_gst } = require('../utc_from_gst');

describe('A test suite for: time/utc_from_gst', () => {
  test('utc_from_gst', () => {
    const gst = NaiveDateTime.from_ymd_hms(
      1980,
      4,
      22,
      4,
      40,
      5.23
    );
    const { utc_time: tt } = utc_from_gst(gst);

    expect(tt.hour()).toBe(14);
    expect(tt.minute()).toBe(36);
    expect(tt.second()).toBeCloseTo(51.67, 2);
  });
});
