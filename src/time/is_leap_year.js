/**
 * @module sowngwala/time/is_leap_year
 */

/** @typedef {import('../types.js').Year} Year */

/**
 * Checks for the leap year.
 *
 * Original:
 * - sowngwala::time::is_leap_year
 *
 * @param {Year} year
 * @returns {boolean}
 */
export function is_leap_year(year) {
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      return year % 400 == 0;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
