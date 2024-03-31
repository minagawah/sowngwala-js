/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/sun/eot_decimal_from_utc
 */

import { eot_from_utc } from './eot_from_utc';
import { decimal_hours_from_angle } from '../time';

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EOTDecimalFromUTCReturned
 * @type {Object}
 * @property {DecimalHours} decimal
 * @property {DecimalHours} day_excess
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
 * As you can see, this is a wrapper
 * for 'eot_from_utc' which is also
 * a wrapper for 'eot_from_gst'.
 * So, if you are looking for the
 * actual calculations, they are
 * found in 'eot_from_gst'.
 *
 * While "The Equation of Time" is
 * vital in finding sun's accurate
 * position in precision, it is
 * currently not in use...
 *
 * Original:
 * sowngwala::sun::eot_decimal_from_utc
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_from_utc}
 * @param {NaiveDateTimeContext} utc
 * @returns {EOTDecimalFromUTCReturned}
 */
export function eot_decimal_from_utc(utc) {
  let { eot, day_excess } = eot_from_utc(utc);
  let decimal = decimal_hours_from_angle(eot);
  return { decimal, day_excess };
}
