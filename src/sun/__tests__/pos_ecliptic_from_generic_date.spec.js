const moment = require('moment');

const {
  pos_ecliptic_from_generic_date,
} = require('../index');

describe('A test suite for: sun/pos_ecliptic_from_generic_date', () => {
  test('pos_ecliptic_from_generic_date', () => {
    const utc = moment(Date.UTC(1988, 7 - 1, 27)).utc();
    const coord = pos_ecliptic_from_generic_date(utc);
    // Actual: 124.187_731_829_979_58
    expect(coord.lng).toBeCloseTo(124.187_732, 6);
  });
});
