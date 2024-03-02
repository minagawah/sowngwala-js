const { NaiveTime } = require('../../chrono');
const { Longitude } = require('../../coords');
const { gst_from_local } = require('../gst_from_local');

describe('A test suite for: time/gst_from_local', () => {
  test('gst_from_local', () => {
    const lst = NaiveTime.from_hmsn(0, 24, 5.23, 0.0);
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const local = gst_from_local(lst, lng);

    expect(local.hour()).toBe(4);
    expect(local.minute()).toBe(40);

    // Actual: 5.230_000_000_000_956
    expect(local.second()).toBeCloseTo(5.23, 2);
  });
});
