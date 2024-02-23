const { days_since_1990 } = require('../index');

describe('A test suite for: time/', () => {
  test('days_since_1990', () => {
    expect(days_since_1990(1988)).toBe(-731);
  });
});
