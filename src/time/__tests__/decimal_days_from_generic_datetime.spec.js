const { NaiveDateTime } = require('../../chrono');
const { decimal_days_from_generic_datetime } = require('../index');

describe('A test suite for: time/decimal_days_from_generic_datetime', () => {
  test('changes with subsecond precision', () => {
    const base = NaiveDateTime.from_ymd_hmsn(
      1985,
      2,
      17,
      6,
      0,
      0,
      0
    );
    const shifted = NaiveDateTime.from_ymd_hmsn(
      1985,
      2,
      17,
      6,
      0,
      0,
      500_000_000
    );

    const base_days = decimal_days_from_generic_datetime(base);
    const shifted_days = decimal_days_from_generic_datetime(shifted);

    expect(shifted_days).not.toBeCloseTo(base_days, 12);
  });
});
