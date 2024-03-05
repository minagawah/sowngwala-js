const { NaiveDateTime } = require('../../chrono');
const {
  mean_obliquity_of_the_ecliptic,
} = require('../index');

describe('A test suite for: coords/mean_obliquity_of_the_ecliptic', () => {
  test('mean_obliquity_of_the_ecliptic', () => {
    const dt = NaiveDateTime.from_ymd_hms(
      1979,
      12,
      31,
      0,
      0,
      0
    );
    const oblique = mean_obliquity_of_the_ecliptic(dt);
    expect(oblique).toBeCloseTo(23.441_893, 6);
  });
});
