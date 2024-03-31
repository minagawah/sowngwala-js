/**
 * @module sowngwala/time/day_of_the_week
 */

import { fract } from '../utils';
import { julian_day } from './julian_day';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * Finds day of the week out of
 * a generic datetime.
 *
 * Sunday = 0
 * Monday = 1
 * Tuesday = 2
 * Wednesday = 3
 * Thursday = 4
 * Friday = 5
 * Saturday = 6
 *
 * References:
 * - (Peter Duffett-Smith, p.9)
 *
 * Original:
 * - sowngwala::time::day_of_the_week
 *
 * @public
 * @function
 * @param {NaiveDateContext} date
 * @returns {number}
 */
export function day_of_the_week(date) {
  /*
   * Rust implementation would be:
   * ----------------------------------
   * date.weekday().num_days_from_sunday()
   * // Sunday = 0
   * // Monday = 1
   * ----------------------------------
   */

  let jd = julian_day(
    date.year(),
    date.month(),
    date.day()
  );
  let a = (jd + 1.5) / 7.0;

  return Math.round(fract(Math.abs(a)) * 7.0);
}
