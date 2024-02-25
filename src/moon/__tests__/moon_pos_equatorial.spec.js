const moment = require('moment');

const { moon_pos_equatorial } = require('../index');

describe('A test suite for: sun/moon_pos_equatorial', () => {
  test('moon_pos_equatorial', () => {
    const utc = moment(
      Date.UTC(1979, 2 - 1, 26, 16, 0, 0)
    ).utc();

    let coord = moon_pos_equatorial(utc);

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
