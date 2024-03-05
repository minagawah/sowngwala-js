/**
 * @module sowngwala/time/naive_from_julian_day
 */

import { NUM_OF_DAYS_IN_A_YEAR } from '../constants';
import { fract } from '../utils';
import { NaiveDateTime } from '../chrono';
import { naive_time_from_decimal_days } from './naive_time_from_decimal_days';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * Converts julian day to datetime of
 * Moment. Duffett-Smith suggests
 * a float value (ex. 17.5) for `day`
 * for the returned result, but we
 * want the excess (which is 0.5)
 * being separate. Thus, instead of
 * returning `NaiveDate`, returning
 * `NaiveDateTime`.
 *
 * References:
 * - (Peter Duffett-Smith, p.8)
 * - sowngwala::time::date_from_julian_day
 *
 * Original:
 * - sowngwala::time::naive_from_julian_day
 *
 * @public
 * @function
 * @param {number} jd
 * @returns {NaiveDateTimeContext}
 */
export function naive_from_julian_day(jd) {
  let jd_0 = jd + 0.5;

  let i = Math.floor(jd_0);
  let f = fract(Math.abs(jd_0));

  let b;

  if (i > 2_299_160.0) {
    let a = Math.floor((i - 1_867_216.25) / 36_524.25);
    b = i + 1.0 + a - Math.floor(a / 4.0);
  } else {
    b = i;
  }

  let c = b + 1524.0;
  let d = Math.floor((c - 122.1) / NUM_OF_DAYS_IN_A_YEAR);
  let e = Math.floor(d * NUM_OF_DAYS_IN_A_YEAR);
  let g = Math.floor((c - e) / 30.6001);

  let decimal_days = c - e + f - Math.floor(g * 30.6001);

  // This is where it differs from Duffett-Smith.
  let { day, naive: naive_time } =
    naive_time_from_decimal_days(decimal_days);

  let month = g < 13.5 ? g - 1.0 : g - 13.0;
  let year = month > 2.5 ? d - 4716.0 : d - 4715.0;

  return NaiveDateTime.from_ymd_hmsn(
    year,
    month,
    day,
    naive_time.hour(),
    naive_time.minute(),
    naive_time.second(),
    naive_time.nanosecond()
  );
}
