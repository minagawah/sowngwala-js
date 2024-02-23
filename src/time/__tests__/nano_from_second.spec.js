const { nano_from_second } = require('../index');

describe('A test suite for: time/nano_from_second', () => {
  test('nano_from_second', () => {
    let nano;
    let sec;

    ({ sec, nano } = nano_from_second(1));
    expect(sec).toBe(1);
    expect(nano).toBe(0);

    ({ sec, nano } = nano_from_second(0.1));
    expect(sec).toBe(0);
    expect(nano).toBe(100000000);

    ({ sec, nano } = nano_from_second(0.01));
    expect(sec).toBe(0);
    expect(nano).toBe(10000000);

    ({ sec, nano } = nano_from_second(0.001));
    expect(sec).toBe(0);
    expect(nano).toBe(1000000);

    ({ sec, nano } = nano_from_second(0.0001));
    expect(sec).toBe(0);
    expect(nano).toBe(100000);

    ({ sec, nano } = nano_from_second(0.00001));
    expect(sec).toBe(0);
    expect(nano).toBe(10000);

    ({ sec, nano } = nano_from_second(0.000001));
    expect(sec).toBe(0);
    expect(nano).toBe(1000);

    ({ sec, nano } = nano_from_second(0.0000001));
    expect(sec).toBe(0);
    expect(nano).toBe(100);

    ({ sec, nano } = nano_from_second(0.00000001));
    expect(sec).toBe(0);
    expect(nano).toBe(10);

    ({ sec, nano } = nano_from_second(0.000000001));
    expect(sec).toBe(0);
    expect(nano).toBe(1);
  });
});
