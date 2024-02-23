/**
 * @module sowngwala/sun/eot_decimal_from_utc
 */

import { eot_from_utc } from './eot_from_utc';
import { decimal_hours_from_angle } from '../time';

/** @typedef {import('moment').Moment} Moment */
/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef EOTDecimalFromUTCReturned
 * @type {Object}
 * @property {DecimalHours} decimal
 * @property {DecimalHours} day_excess
 */

/**
 * EOT, or "the equation of time" is
 * the difference (in degree angle)
 * between the mean sun and the real
 * sun.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * This is a wrapper for 'eot_from_utc'.
 * See 'eot_from_utc' for it has the
 * actual calculations for EOT.
 * (or it further has the actual
 * calculations in 'eot_from_gst')
 *
 * Although EOT is vital to finding
 * sun's position in precision, however,
 * EOT is currently not used from any
 * functions implemented anywhere
 * in the program...
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_from_utc}
 * @param {Moment} utc
 * @returns {EOTDecimalFromUTCReturned}
 */
export function eot_decimal_from_utc(utc) {
  let { eot, day_excess } = eot_from_utc(utc);
  let decimal = decimal_hours_from_angle(eot);
  return { decimal, day_excess };
}
