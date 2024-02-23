const { Angle } = require('../../coords');
const { decimal_hours_from_angle } = require('../index');

describe('A test suite for: time/decimal_hours_from_angle', () => {
  test('decimal_hours_from_angle', () => {
    let decimal;

    decimal = decimal_hours_from_angle(
      Angle.from_hms(1, 0, 0)
    );
    expect(decimal).toBe(1);

    decimal = decimal_hours_from_angle(
      Angle.from_hms(0, 30, 0)
    );
    expect(decimal).toBe(0.5);

    decimal = decimal_hours_from_angle(
      Angle.from_hms(0, 45, 0)
    );
    expect(decimal).toBe(0.75);

    // Actual: 0.9833333333333333
    // Checking 2nd digit which is '8'.
    decimal = decimal_hours_from_angle(
      Angle.from_hms(0, 59, 0)
    );
    expect(decimal).toBeCloseTo(0.98, 2); // 1e-3

    // Actual: 0.016666666666666666
    // Checking 2nd digit which
    // is '1', but is round up
    // to '2' because of '7'.
    decimal = decimal_hours_from_angle(
      Angle.from_hms(0, 1, 0)
    );
    expect(decimal).toBeCloseTo(0.02, 2); // 1e-3

    // Actual: 0.008333333333333333
    // Checking 3rd digit which is '8'.
    decimal = decimal_hours_from_angle(
      Angle.from_hms(0, 0, 30)
    );
    expect(decimal).toBeCloseTo(0.008, 3); // 1e-4
  });
});
