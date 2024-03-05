/**
 * @module sowngwala/time/julian_day
 */

import { NUM_OF_DAYS_IN_A_YEAR } from '../constants';
import { NaiveDate } from '../chrono';
import { is_julian_date } from './is_julian_date';

/** @typedef {import('../types.js').Year} Year */
/** @typedef {import('../types.js').Month} Month */
/** @typedef {import('../types.js').Day} Day */

/**
 * Converts a generic datetime into
 * julian date. There are slight
 * differences for the codes bellow
 * from that of Duffett-Smith.
 * For one of the function arguments
 * `day`, Duffett-Smith suggests
 * a float (ex. 7.5). Whereas we
 * want `u32` because `NaiveDate`
 * would not accept float for `day`.
 * So, the idea is to use
 * `NaiveDateTime`, and include
 * the excess (which is 0.5)
 * into `NaiveTime` already.
 *
 * References:
 * - Peter Duffett-Smith, pp.6-7
 *
 * Original:
 * - sowngwala::time::julian_day
 *
 * @param {Year} year
 * @param {Month} month
 * @param {Day} day
 * @returns {number}
 */
export function julian_day(year, month, day) {
  let y;
  let m;

  if (month == 1 || month == 2) {
    y = year - 1;
    m = month + 12;
  } else {
    y = year;
    m = month;
  }

  let b;
  let c;

  if (
    is_julian_date(NaiveDate.from_ymd(year, month, day))
  ) {
    b = 0.0;
  } else {
    let a = Math.floor(y / 100.0);
    b = 2.0 - a + Math.floor(a / 4.0);
  }

  if (y < 0.0) {
    c = Math.floor(NUM_OF_DAYS_IN_A_YEAR * y - 0.75);
  } else {
    c = Math.floor(NUM_OF_DAYS_IN_A_YEAR * y);
  }

  let d = Math.floor(30.6001 * (m + 1.0));

  return b + c + d + day + 1_720_994.5;
}
