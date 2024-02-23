const moment = require('moment');

const {
  ISO8601_FORMAT,
  OFFSET_TOKYO,
} = require('../../constants');

// const { decimal_days_from_generic_datetime } = require('../index');

// +0900 --> ZZ
// +09:00 --> Z

describe('A test suite for: moment', () => {
  const utc = moment(Date.UTC(2024, 1 - 1, 29)).utc();

  test('convert UTC to local time', () => {
    const local = moment(utc)
      .utcOffset(OFFSET_TOKYO)
      .local()
      .format(ISO8601_FORMAT);
    const expected = `2024-01-29T09:00:00${OFFSET_TOKYO}`;
    expect(local).toBe(expected);
  });
});

// describe('A test suite for: time/', () => {
//   test('decimal_days_from_generic_datetime', () => {
//   });
// });
