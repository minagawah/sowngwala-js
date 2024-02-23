/**
 * @module sowngwala/time/day_number_from_generic_date
 */

import { is_leap_year } from './is_leap_year';

/** @typedef {import('moment').Moment} Moment */

/**
 * Finds out the day number for the
 * given date.
 * (Peter Duffett-Smith, p.5)
 *
 * Original:
 * - sowngwala::time::day_number_from_generic_date
 *
 * @param {Moment} date
 * @returns {number}
 */
export function day_number_from_generic_date(date) {
  let tmp = is_leap_year(date.year()) ? 62.0 : 63.0;

  // NOTE: 'month' is indexed in JS
  let num = date.month() + 1;
  if (num <= 2.0) {
    num = Math.floor(((num - 1.0) * tmp) / 2.0);
  } else {
    num = Math.floor((num + 1.0) * 30.6) - tmp;
  }
  // NOTE: 'day' in Rust is 'date' in JS
  return num + date.date();
}
