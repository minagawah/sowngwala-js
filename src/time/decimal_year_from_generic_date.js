/**
 * @module sowngwala/time/decimal_year_from_generic_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/** @typedef {import('../types.js').DecimalYears} DecimalYears */

/**
 * Definition of `y` in this program
 * is as follows:
 *
 *   y = year + (month - 0.5) / 12
 *
 * This gives `y` for the middle of
 * the month, which is accurate enough
 * given the precision in the known
 * values of ΔT. The following
 * polynomial expressions can be used
 * to calculate the value of ΔT
 * (in seconds) over the time period
 * covered by of the Five Millennium
 * Canon of Solar Eclipses:
 * -1999 to +3000.
 *
 * Original:
 * - sowngwala::time::decimal_year_from_generic_date
 *
 * @public
 * @function
 * @param {NaiveDateContext} date
 * @returns {DecimalYears}
 */
export function decimal_year_from_generic_date(date) {
  const year = date.year();
  const month = date.month();
  return year + (month - 0.5) / 12.0;
}
