/**
 * @module sowngwala/time/julian_day_from_generic_date
 */

import { julian_day } from './julian_day';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 *
 * Original:
 * - sowngwala::time::julian_day_from_generic_date
 *
 * @param {NaiveDateContext} date
 * @returns {number}
 */
export function julian_day_from_generic_date(date) {
  return julian_day(date.year(), date.month(), date.day());
}
