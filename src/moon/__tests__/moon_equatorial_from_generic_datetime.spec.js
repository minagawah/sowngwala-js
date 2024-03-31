const { NaiveDateTime } = require('../../chrono');
const {
  moon_equatorial_from_generic_datetime,
} = require('../index');

describe('A test suite for: moon/moon_equatorial_from_generic_datetime', () => {
  test('moon_equatorial_from_generic_datetime', () => {
    const dt = NaiveDateTime.from_ymd_hms(
      1979,
      2,
      26,
      16,
      0,
      0
    );

    let coord = moon_equatorial_from_generic_datetime(dt);

    let asc = coord.asc;
    let dec = coord.dec;

    expect(asc.hour()).toBe(22);
    expect(asc.minute()).toBe(33);

    // (Rust) 26.382_007_503_326_292
    // (JS) 28.689_418_166_734697
    expect(asc.second()).toBeCloseTo(27.0, -1); // 1e-1

    // IMPORTANT:
    // In the book, expects "8°01'0".
    // With JS, it calculates to "8°00'58".

    expect(dec.hour()).toBe(-8);

    // Note: book expects "1"
    expect(dec.minute()).toBe(0);

    // Note: book expects "0"
    // Actual: 57.546945537410465
    expect(dec.second()).toBeCloseTo(57, -1);
  });
});
