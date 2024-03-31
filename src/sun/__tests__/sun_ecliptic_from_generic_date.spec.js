const { NaiveDate } = require('../../chrono');
const {
  sun_ecliptic_from_generic_date,
} = require('../index');

describe('A test suite for: sun/sun_ecliptic_from_generic_date', () => {
  test('sun_ecliptic_from_generic_date', () => {
    const date = NaiveDate.from_ymd(1988, 7, 27);
    // console.log('date:', date.print());

    const { coord } = sun_ecliptic_from_generic_date(date);

    // Actual: 124.187_731_829_979_58
    expect(coord.lng).toBeCloseTo(124.187_732, 6);
  });
});
