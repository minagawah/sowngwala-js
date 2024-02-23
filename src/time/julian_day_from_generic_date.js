/**
 * @module sowngwala/time/julian_day_from_generic_date
 */

import { julian_day } from './julian_day';

/** @typedef {import('moment').Moment} Moment */

/**
 *
 * Original:
 * - sowngwala::time::julian_day_from_generic_date
 *
 * @param {Moment} date
 * @returns {number}
 */
export function julian_day_from_generic_date(date) {
  return julian_day(
    date.year(),
    // NOTE: 'month' is indexed in JS
    date.month() + 1,
    // NOTE: 'day' in Rust is 'date' in JS
    date.date()
  );
}
