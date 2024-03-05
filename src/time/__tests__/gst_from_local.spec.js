const { NaiveTime } = require('../../chrono');
const { Longitude } = require('../../coords');
const { gst_from_local } = require('../index');

describe('A test suite for: time/gst_from_local', () => {
  test('gst_from_local', () => {
    const local = NaiveTime.from_hms(0, 24, 5.23);
    const lng = Longitude({ degrees: 64, bound: 'W' });
    const { gst } = gst_from_local(local, lng);

    expect(gst.hour()).toBe(4);
    expect(gst.minute()).toBe(40);

    // Actual: 5.230_000_000_000_956
    expect(gst.second()).toBeCloseTo(5.23, 2);
  });
});
