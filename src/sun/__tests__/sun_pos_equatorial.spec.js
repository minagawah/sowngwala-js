const moment = require('moment');

const { sun_pos_equatorial } = require('../index');

describe('A test suite for: sun/sun_pos_equatorial', () => {
  test('sun_pos_equatorial', () => {
    const utc = moment(Date.UTC(1988, 7 - 1, 27)).utc();
    const { coord } = sun_pos_equatorial(utc);

    const asc = coord.asc; // right ascension (α)
    const dec = coord.dec; // declination (δ)

    expect(asc.hour()).toBe(8);
    expect(asc.minute()).toBe(26);
    // (Rust) 3.805_0320_752_654_443
    // (JS)   3.805_0320_752_590_494
    expect(asc.second()).toBeCloseTo(4.0, 0); // 1e-1

    expect(dec.hour()).toBe(19);
    expect(dec.minute()).toBe(12);
    // (Rust) 42.522_657_925_921_976
    // (JS)   42.522_657_925_921_976
    expect(dec.second()).toBeCloseTo(42.5, 1); // 5e-2
  });
});
