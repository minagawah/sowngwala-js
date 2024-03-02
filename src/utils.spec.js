const { unsigned_zero, overflow } = require('./utils');

describe('A test suite on: utils.js', () => {
  it('should have "unsigned_zero" work fine', () => {
    expect(unsigned_zero(-0)).toBe(0);
    expect(unsigned_zero(+0)).toBe(0);
  });

  it('should have "overflow" work fine', () => {
    let remainder = 0;
    let quotient = 0;

    ({ remainder, quotient } = overflow(59.0, 60.0));
    expect(remainder).toBe(59.0);
    expect(quotient).toBe(0.0);

    ({ remainder, quotient } = overflow(60.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(1.0);

    ({ remainder, quotient } = overflow(120.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(2.0);

    ({ remainder, quotient } = overflow(121.0, 60.0));
    expect(remainder).toBe(1.0);
    expect(quotient).toBe(2.0);

    ({ remainder, quotient } = overflow(120.1, 60.0));
    expect(remainder).toBeCloseTo(0.1, 0); // 1e-1
    expect(quotient).toBe(2.0);

    ({ remainder, quotient } = overflow(-60.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(-1.0);

    ({ remainder, quotient } = overflow(-120.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(-2.0);

    ({ remainder, quotient } = overflow(-59.0, 60.0));
    // expect(remainder).toBe(-59.0);
    // expect(quotient).toBe(0);
    expect(remainder).toBe(1);
    expect(quotient).toBe(-1);

    ({ remainder, quotient } = overflow(-61.0, 60.0));
    // expect(remainder).toBe(-1.0);
    // expect(quotient).toBe(-1.0);
    expect(remainder).toBe(59.0);
    expect(quotient).toBe(-2.0);

    ({ remainder, quotient } = overflow(-60.1, 60.0));
    // expect(remainder).toBeCloseTo(-0.1, 0);
    // expect(quotient).toBe(-1.0);
    expect(remainder).toBeCloseTo(59.9, 0); // 1e-1
    expect(quotient).toBe(-2.0);
  });
});
