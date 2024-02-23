/**
 * @module sowngwala/time/decimal_year_from_generic_date
 */

/** @typedef {import('moment').Moment} Moment */
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
 * @param {Moment} date
 * @returns {DecimalYears}
 */
export function decimal_year_from_generic_date(date) {
  const year = date.year();
  // NOTE: 'month' in JS is indexed
  const month = date.month() + 1;
  return year + (month - 0.5) / 12.0;
}
