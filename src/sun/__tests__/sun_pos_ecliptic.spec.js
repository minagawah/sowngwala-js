const moment = require('moment');

const { sun_pos_ecliptic } = require('../index');

describe('A test suite for: sun/sun_pos_ecliptic', () => {
  test('sun_pos_ecliptic', () => {
    const utc = moment(Date.UTC(1988, 7 - 1, 27)).utc();
    const { coord } = sun_pos_ecliptic(utc);
    // Actual: 124.187_731_829_979_58
    expect(coord.lng).toBeCloseTo(124.187_732, 6);
  });
});
