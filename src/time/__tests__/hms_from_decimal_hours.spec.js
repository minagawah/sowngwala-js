const { hms_from_decimal_hours } = require('../index');

describe('A test suite for: time/hms_from_decimal_hours', () => {
  test('hms_from_decimal_hours', () => {
    let hour;
    let min;
    let sec;

    ({ hour, min, sec } = hms_from_decimal_hours(1));
    expect(hour).toBe(1);
    expect(min).toBe(0);
    expect(sec).toBe(0);

    ({ hour, min, sec } = hms_from_decimal_hours(0.5));
    expect(hour).toBe(0);
    expect(min).toBe(30);
    expect(sec).toBe(0);

    ({ hour, min, sec } = hms_from_decimal_hours(0.75));
    expect(hour).toBe(0);
    expect(min).toBe(45);
    expect(sec).toBe(0);

    ({ hour, min, sec } =
      hms_from_decimal_hours(0.9833333333333333));
    expect(hour).toBe(0);
    expect(min).toBe(59);
    expect(sec).toBe(0);

    ({ hour, min, sec } =
      hms_from_decimal_hours(0.016666666666666666));
    expect(hour).toBe(0);
    expect(min).toBe(1);
    expect(sec).toBe(0);

    ({ hour, min, sec } =
      hms_from_decimal_hours(0.008333333333333333));
    expect(hour).toBe(0);
    expect(min).toBe(0);
    expect(sec).toBe(30);
  });
});
