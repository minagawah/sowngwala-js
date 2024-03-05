const { NaiveDateTime } = require('../../chrono');
const { gst_from_utc } = require('../index');

describe('A test suite for: time/gst_from_utc', () => {
  test('gst_from_utc', () => {
    const utc = NaiveDateTime.from_ymd_hms(
      1980,
      4,
      22,
      14,
      36,
      51.67
    );
    const gst = gst_from_utc(utc);

    expect(gst.hour()).toBe(4);
    expect(gst.minute()).toBe(40);

    // (Rust) 5.229576759185761
    // (JS) 5.229576759
    expect(gst.second()).toBeCloseTo(5.23, 3);
  });
});
