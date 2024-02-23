const { angle_from_decimal_hours } = require('../index');

describe('A test suite for: time/angle_from_decimal_hours', () => {
  test('angle_from_decimal_hours', () => {
    let angle;

    angle = angle_from_decimal_hours(1);
    expect(angle.hour()).toBe(1);
    expect(angle.minute()).toBe(0);
    expect(angle.second()).toBe(0);

    angle = angle_from_decimal_hours(0.5);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(30);
    expect(angle.second()).toBe(0);

    angle = angle_from_decimal_hours(0.75);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(45);
    expect(angle.second()).toBe(0);

    angle = angle_from_decimal_hours(0.9833333333333333);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(59);
    expect(angle.second()).toBe(0);

    angle = angle_from_decimal_hours(0.016666666666666666);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(1);
    expect(angle.second()).toBe(0);

    angle = angle_from_decimal_hours(0.008333333333333333);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(0);
    expect(angle.second()).toBe(30);
  });
});
