const { decimal_hours_from_hms } = require('../../time');
const {
  EcliCoord,
  equatorial_from_ecliptic,
} = require('../index');

describe('A test suite for: coords/equatorial_from_ecliptic', () => {
  test('equatorial_from_ecliptic', () => {
    // Peter Duffett-Smith, pp.40-41

    const oblique = 23.441_884;

    // See in Peter Duffett-Smith's, it first
    // converts lat and lng into decimal degrees.
    const lat_0_dec = decimal_hours_from_hms(4, 52, 31.0);
    const lng_0_dec = decimal_hours_from_hms(139, 41, 10.0);

    const coord_0 = EcliCoord({
      lat: lat_0_dec,
      lng: lng_0_dec,
    });

    const coord = equatorial_from_ecliptic(
      coord_0,
      oblique
    );

    const asc = coord.asc; // right ascension (α)
    const dec = coord.dec; // declination (δ)

    expect(asc.hour()).toBe(9);
    expect(asc.minute()).toBe(34);
    // (Rust) 53.582_162_535_99352 (yet, different 'oblique')
    // (JS)   53.584_282_299_16811
    expect(asc.second()).toBeCloseTo(53.6, 1); // 1e-2

    expect(dec.hour()).toBe(19);
    expect(dec.minute()).toBe(32);
    // (Rust) 14.100_993_558_899972 (yet, different 'oblique')
    // (JS)   14.166_759_104_165578
    expect(dec.second()).toBeCloseTo(14.2, 1); // 1e-2
  });
});
