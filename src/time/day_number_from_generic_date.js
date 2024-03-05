/**
 * @module sowngwala/time/day_number_from_generic_date
 */

import { is_leap_year } from './is_leap_year';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * Finds out the day number for the
 * given date.
 * (Peter Duffett-Smith, p.5)
 *
 * Original:
 * - sowngwala::time::day_number_from_generic_date
 *
 * @param {NaiveDateContext} date
 * @returns {number}
 */
export function day_number_from_generic_date(date) {
  let tmp = is_leap_year(date.year()) ? 62.0 : 63.0;

  let num = date.month();

  if (num <= 2.0) {
    num = Math.floor(((num - 1.0) * tmp) / 2.0);
  } else {
    num = Math.floor((num + 1.0) * 30.6) - tmp;
  }

  return num + date.day();
}
