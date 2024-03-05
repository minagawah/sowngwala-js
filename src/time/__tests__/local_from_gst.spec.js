const { NaiveTime } = require('../../chrono');
const { Longitude } = require('../../coords');
const { local_from_gst } = require('../local_from_gst');

describe('A test suite for: time/local_from_gst', () => {
  test('local_from_gst', () => {
    const gst = NaiveTime.from_hms(4, 40, 5.23);
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const local = local_from_gst(gst, lng);

    expect(local.hour()).toBe(0);
    expect(local.minute()).toBe(24);

    // Actual: 5.230_000_000_001_169
    expect(local.second()).toBeCloseTo(5.23, 2);
  });
});
