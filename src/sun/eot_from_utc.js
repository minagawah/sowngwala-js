/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/sun/eot_from_utc
 */

import { eot_from_gst } from './eot_from_gst';

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef EOTFromUTCReturned
 * @type {Object}
 * @property {AngleContext} eot
 * @property {DecimalDays} day_excess
 */

/**
 * "eot" in the function name stands
 * for "THE EQUATION OF TIME".
 * In astrological calculation,
 * "The Equation of Time" is the
 * difference between the "mean sun"
 * and the real sun's position.
 * For this function will return the
 * value in degree angle.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * The function is referred from
 * 'eot_decimal_from_utc'.
 * Since this is only a wrapper
 * of 'eot_from_gst', if you are
 * looking for the actual
 * calculations, they are found in
 * 'eot_from_gst'.
 *
 * While "The Equation of Time" is
 * vital in finding sun's accurate
 * position in precision, it is
 * currently not in use...
 *
 * Original:
 * sowngwala::sun::eot_from_utc
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_decimal_from_utc}
 * @see {@link: sowngwala/sun.eot_from_gst}
 * @param {NaiveDateTimeContext} utc
 * @returns {EOTFromUTCReturned}
 */
export function eot_from_utc(utc) {
  const { angle: eot, day_excess } = eot_from_gst(utc);
  return { eot, day_excess };
}
