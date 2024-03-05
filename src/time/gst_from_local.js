/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/time/gst_from_local
 */

import { decimal_hours_from_naive_time } from './decimal_hours_from_naive_time';
import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';
import { overflow } from '../utils';

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * @typedef GstFromLocalReturned
 * @type {Object}
 * @property {NaiveTimeContext} gst - GST
 * @property {DecimalDays} day_excess - Carry-over when exceeds 24 hours.
 */

/**
 * Given GST LST (Local Sidereal Time)
 * in NaiveTime and Longitude for
 * the site, returns GST and excess
 * days when exceeds 24 hours.
 *
 * References:
 * - Peter Duffett-Smith, p.21
 *
 * @public
 * @function
 * @param {NaiveTimeContext} lst
 * @param {LongitudeContext} lng
 * @returns {GstFromLocalReturned}
 */
export function gst_from_local(lst, lng) {
  const lst_hours = decimal_hours_from_naive_time(lst);
  const lng_hours = lng.degrees / 15;

  let decimal_hours = lst_hours;

  if (lng.bound === 'W') {
    decimal_hours += lng_hours;
  } else {
    decimal_hours -= lng_hours;
  }

  const { remainder, quotient } = overflow(
    decimal_hours,
    24
  );

  decimal_hours = remainder;

  return {
    gst: naive_time_from_decimal_hours(decimal_hours),
    day_excess: quotient,
  };
}
