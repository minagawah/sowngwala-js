/**
 * @module sowngwala/time/gst_from_local
 */

import { decimal_hours_from_naive_time } from './decimal_hours_from_naive_time';
import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * Given GST LST (Local Sidereal Time)
 * in NaiveTime and Longitude for
 * the site, returns GST.
 *
 * References:
 * - Peter Duffett-Smith, p.21
 *
 * @public
 * @function
 * @param {NaiveTimeContext} lst
 * @param {LongitudeContext} lng
 * @returns {NaiveTimeContext}
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

  if (decimal_hours > 24) {
    decimal_hours -= 24;
  }
  if (decimal_hours < 0) {
    decimal_hours += 24;
  }

  return naive_time_from_decimal_hours(decimal_hours);
}
