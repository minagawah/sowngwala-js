const { NaiveDate } = require('../../chrono');
const {
  decimal_year_from_generic_date,
} = require('../index');

describe('A test suite for: time/decimal_year_from_generic_date', () => {
  const date = NaiveDate.from_ymd(2024, 1, 29);
  test('decimal_year_from_generic_date', () => {
    // Actual: 2024.0416666666667
    const years = decimal_year_from_generic_date(date);
    const expected = 2024.042;
    // Checking 3rd digit which
    // is '1', but is round up
    // to '2' because of '6'.
    expect(years).toBeCloseTo(expected, 3); // 1e-4
  });
});
