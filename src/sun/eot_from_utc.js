/**
 * @module sowngwala/sun/eot_from_utc
 */

/** @typedef {import('moment').Moment} Moment */

import { eot_from_gst } from './eot_from_gst';

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

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
 * EOT, or "the equation of time" is
 * the difference (in degree angle)
 * between the mean sun and the real
 * sun.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * This function is called from
 * 'eot_decimal_from_utc'.
 * However, as you can see, it further
 * relies on 'eot_from_gst' where
 * everything takes place for EOT.
 * See 'eot_from_gst' for it has the
 * actual calculations for EOT.
 *
 * Although EOT is vital to finding
 * sun's position in precision, however,
 * EOT is currently not used from any
 * functions implemented anywhere
 * in the program...
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_decimal_from_utc}
 * @see {@link: sowngwala/sun.eot_from_gst}
 * @param {Moment} utc
 * @returns {EOTFromUTCReturned}
 */
export function eot_from_utc(utc) {
  // Originally, the function takes 'utc'
  // in 'DateTime', and convert it using
  // 'naive_utc' to 'NaiveDateTime'.
  // For JS, we can simply pass Moment
  // datetime.
  //
  // DateTime.naive_utc
  // https://docs.rs/chrono/latest/chrono/struct.DateTime.html#method.naive_utc
  const { angle: eot, day_excess } = eot_from_gst(utc);

  return { eot, day_excess };
}
