const { NaiveDateTime } = require('../../chrono');
const {
  sun_ecliptic_from_generic_datetime,
} = require('../index');

describe('A test suite for: sun/sun_ecliptic_from_generic_datetime', () => {
  test('changes with time of day', () => {
    const midnight = NaiveDateTime.from_ymd_hms(
      1988,
      7,
      27,
      0,
      0,
      0
    );
    const noon = NaiveDateTime.from_ymd_hms(
      1988,
      7,
      27,
      12,
      0,
      0
    );

    const midnight_lng =
      sun_ecliptic_from_generic_datetime(midnight).coord
        .lng;
    const noon_lng =
      sun_ecliptic_from_generic_datetime(noon).coord.lng;

    expect(noon_lng).not.toBeCloseTo(midnight_lng, 6);
  });

  test('keeps subsecond precision', () => {
    const base = NaiveDateTime.from_ymd_hmsn(
      1988,
      7,
      27,
      0,
      0,
      0,
      0
    );
    const shifted = NaiveDateTime.from_ymd_hmsn(
      1988,
      7,
      27,
      0,
      0,
      0,
      500_000_000
    );

    const base_lng =
      sun_ecliptic_from_generic_datetime(base).coord.lng;
    const shifted_lng =
      sun_ecliptic_from_generic_datetime(shifted).coord.lng;

    expect(shifted_lng).not.toBeCloseTo(base_lng, 9);
  });
});
