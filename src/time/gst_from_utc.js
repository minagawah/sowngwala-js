/**
 * @module sowngwala/time/gst_from_utc
 */

import { overflow } from '../utils';

import { decimal_hours_from_generic_time } from './decimal_hours_from_generic_time';
import { julian_day_from_generic_date } from './julian_day_from_generic_date';
import { naive_time_from_generic_datetime } from './naive_time_from_generic_datetime';
import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Given UT, and retursn GST.
 *
 * References:
 * - (Peter Duffett-Smith, p.17)
 * - sowngwala::time::gst_from_ut
 *
 * Example:
 * ```rust
 * use chrono::{DateTime, Timelike};
 * use chrono::naive::NaiveTime;
 * use chrono::offset::Utc;
 * use sowngwala::time::{
 *     build_utc,
 *     gst_from_utc,
 * };
 *
 * let nanosecond: u32 = 670_000_000;
 * let utc: DateTime<Utc> =
 *     build_utc(1980, 4, 22, 14, 36, 51, nanosecond);
 * let gst: NaiveTime = gst_from_utc(utc);
 *
 * assert_eq!(gst.hour(), 4);
 * assert_eq!(gst.minute(), 40);
 * assert_eq!(gst.second(), 5); // 5.229576759185761
 * assert_eq!(gst.nanosecond(), 229_576_759);
 * ```
 * @public
 * @function
 * @param {Moment} utc
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

  // mosaikekkan
  // ({ quotient: t0 } = overflow(t0, 24.0));
  ({ remainder: t0 } = overflow(t0, 24.0));

  let naive_time = naive_time_from_generic_datetime(utc);

  let decimal = decimal_hours_from_generic_time(naive_time);
  decimal *= 1.002_737_909;
  decimal += t0;

  // mosaikekkan
  // ({ quotient: decimal } = overflow(decimal, 24.0));
  ({ remainder: decimal } = overflow(decimal, 24.0));

  return naive_time_from_decimal_hours(decimal);
}
