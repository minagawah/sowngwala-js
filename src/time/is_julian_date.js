/**
 * @module sowngwala/time/is_julian_date
 */

/** @typedef {import('moment').Moment} Moment */

/**
 * Checks if the given date is julian date.
 *
 * Original:
 * - sowngwala::time::is_julian_date
 *
 * @public
 * @function
 * @param {Moment} date
 * @returns {boolean}
 */
export function is_julian_date(date) {
  if (date.year() > 1582) {
    return false;
  }
  if (date.year() < 1582) {
    return true;
  }
  // NOTE: 'month' is indexed in JS
  if (date.month() + 1 > 10) {
    return false;
  }
  // NOTE: 'month' is indexed in JS
  if (date.month() + 1 < 10) {
    return true;
  }
  // NOTE: 'day' in Rust is 'date' in JS different
  if (date.date() > 14) {
    return false;
  }
  return true;
}
