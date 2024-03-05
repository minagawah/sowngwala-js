/**
 * @module sowngwala/time/is_julian_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * Checks if the given date is julian date.
 *
 * Original:
 * - sowngwala::time::is_julian_date
 *
 * @public
 * @function
 * @param {NaiveDateContext} date
 * @returns {boolean}
 */
export function is_julian_date(date) {
  if (date.year() > 1582) {
    return false;
  }
  if (date.year() < 1582) {
    return true;
  }
  if (date.month() > 10) {
    return false;
  }
  if (date.month() < 10) {
    return true;
  }
  if (date.day() > 14) {
    return false;
  }
  return true;
}
