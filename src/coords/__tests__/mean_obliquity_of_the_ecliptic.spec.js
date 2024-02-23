const moment = require('moment');

const {
  mean_obliquity_of_the_ecliptic,
} = require('../index');

describe('A test suite for: coords/mean_obliquity_of_the_ecliptic', () => {
  test('mean_obliquity_of_the_ecliptic', () => {
    const date = moment(Date.UTC(1979, 12 - 1, 31)).utc();
    const oblique = mean_obliquity_of_the_ecliptic(date);
    expect(oblique).toBeCloseTo(23.441_893, 6);
  });
});
