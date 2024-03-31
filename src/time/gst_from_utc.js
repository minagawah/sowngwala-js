/**
 * @module sowngwala/time/gst_from_utc
 */

import { overflow } from '../utils';

import { decimal_hours_from_generic_time } from './decimal_hours_from_generic_time';
import { julian_day_from_generic_date } from './julian_day_from_generic_date';
import { naive_time_from_generic_datetime } from './naive_time_from_generic_datetime';
import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Given UT, and returns GST.
 *
 * References:
 * - (Peter Duffett-Smith, p.17)
 * - sowngwala::time::gst_from_ut
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc
 * @returns {NaiveTimeContext}
 */
export function gst_from_utc(utc) {
  let jd = julian_day_from_generic_date(utc);

  let s = jd - 2_451_545.0;
  let t = s / 36_525.0;

  let t0 =
    6.697_374_558 +
    2_400.051_336 * t +
    0.000_025_862 * t * t;

  ({ remainder: t0 } = overflow(t0, 24));

  // NOTE:
  // This will take 'millisecond' into consideration.
  let naive_time = naive_time_from_generic_datetime(utc);

  let decimal_hours =
    decimal_hours_from_generic_time(naive_time);
  decimal_hours *= 1.002_737_909;
  decimal_hours += t0;

  ({ remainder: decimal_hours } = overflow(
    decimal_hours,
    24
  ));

  /*
   * NOTE:
   * This will extract 'nano' from 'sec'.
   */
  return naive_time_from_decimal_hours(decimal_hours);
}
