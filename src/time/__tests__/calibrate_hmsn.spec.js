const { calibrate_hmsn } = require('../index');

describe('A test suite for: time/', () => {
  test('calibrate_hmsn (1)', () => {
    const nano = 0;

    let hour;
    let min;
    let sec;
    let day_excess;

    ({
      hmsn: { sec },
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 0,
      nano,
    }));

    expect(sec).toBe(0);

    ({
      hmsn: { sec },
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 1,
      nano,
    }));

    expect(sec).toBe(1);

    ({
      hmsn: { min, sec },
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 60,
      nano,
    }));

    expect(sec).toBe(0);
    expect(min).toBe(1);

    ({
      hmsn: { min, sec },
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 62,
      nano,
    }));

    expect(sec).toBe(2);
    expect(min).toBe(1);

    ({
      hmsn: { min },
    } = calibrate_hmsn({
      hour: 0,
      min: 1,
      sec: 0,
      nano,
    }));

    expect(min).toBe(1);

    ({
      hmsn: { hour, min },
    } = calibrate_hmsn({
      hour: 0,
      min: 60,
      sec: 0,
      nano,
    }));

    expect(min).toBe(0);
    expect(hour).toBe(1);

    ({
      hmsn: { hour, min },
    } = calibrate_hmsn({
      hour: 0,
      min: 62,
      sec: 0,
      nano,
    }));

    expect(min).toBe(2);
    expect(hour).toBe(1);

    ({
      hmsn: { hour },
    } = calibrate_hmsn({
      hour: 1,
      min: 0,
      sec: 0,
      nano,
    }));

    expect(hour).toBe(1);

    ({
      hmsn: { hour },
      day_excess,
    } = calibrate_hmsn({
      hour: 24,
      min: 0,
      sec: 0,
      nano,
    }));

    expect(hour).toBe(0);
    expect(day_excess).toBe(1);

    ({
      hmsn: { hour },
      day_excess,
    } = calibrate_hmsn({
      hour: 48,
      min: 0,
      sec: 0,
      nano,
    }));

    expect(hour).toBe(0);
    expect(day_excess).toBe(2);

    ({
      hmsn: { sec },
    } = calibrate_hmsn({
      hour: 1,
      min: 1,
      sec: -1,
      nano,
    }));

    expect(sec).toBe(59);

    ({
      hmsn: { hour, min, sec },
      day_excess,
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: -1,
      nano,
    }));

    expect(sec).toBe(59);
    expect(min).toBe(59);
    expect(hour).toBe(23);
    expect(day_excess).toBe(-1);
  });

  test('calibrate_hmsn (2)', () => {
    const nano = 0;

    let hour;
    let day_excess;

    ({
      hmsn: { hour },
      day_excess,
    } = calibrate_hmsn({
      hour: 360,
      min: 0,
      sec: 0,
      nano,
      // Make 'hour' to overflow
      // only when it reached 360.
      angle: true,
    }));

    expect(hour).toBe(0);
    expect(day_excess).toBe(1);
  });
});
