const { Angle } = require('../index');

describe('A test suite for: coords/angle', () => {
  it('Angle.calibrate (1)', () => {
    let angle;
    let day_excess;

    angle = Angle.from_hms(0, 0, 0);
    expect(angle.second()).toBe(0);

    angle = Angle.from_hms(0, 0, 1);
    expect(angle.second()).toBe(1);

    angle = Angle.from_hms(0, 0, 60);
    expect(angle.second()).toBe(0);
    expect(angle.minute()).toBe(1);

    angle = Angle.from_hms(0, 0, 62);
    expect(angle.second()).toBe(2);
    expect(angle.minute()).toBe(1);

    angle = Angle.from_hms(0, 1, 0);
    expect(angle.minute()).toBe(1);

    angle = Angle.from_hms(0, 60, 0);
    expect(angle.minute()).toBe(0);
    expect(angle.hour()).toBe(1);

    angle = Angle.from_hms(0, 62, 0);
    expect(angle.minute()).toBe(2);
    expect(angle.hour()).toBe(1);

    angle = Angle.from_hms(1, 0, 0);
    expect(angle.hour()).toBe(1);

    angle = Angle.from_hms(24, 0, 0);
    day_excess = angle.day_excess();
    expect(angle.hour()).toBe(0);
    expect(day_excess).toBe(1);

    angle = Angle.from_hms(48, 0, 0);
    day_excess = angle.day_excess();
    expect(angle.hour()).toBe(0);
    expect(day_excess).toBe(2);

    angle = Angle.from_hms(1, 1, -1);
    expect(angle.second()).toBe(59);

    angle = Angle.from_hms(0, 0, -1);
    day_excess = angle.day_excess();
    expect(angle.second()).toBe(59);
    expect(angle.minute()).toBe(59);
    expect(angle.hour()).toBe(23);
    expect(day_excess).toBe(-1);
  });

  // test('Angle.calibrate (2)', () => {
  //   // Peter Duffett-Smith, pp.40-41
  //   const angle = Angle.from_hms(139, 41, 10.0);
  //   const dec = decimal_hours_from_angle(angle);
  //   expect(dec).toBeCloseTo(139.686_111, 4);
  // });
});
