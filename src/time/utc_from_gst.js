/**
 * @module sowngwala/time/utc_from_gst
 */

import { NaiveTime } from '../chrono';
import { overflow } from '../utils';

import { julian_day_from_generic_date } from './julian_day_from_generic_date';
import { decimal_hours_from_generic_time } from './decimal_hours_from_generic_time';
import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Given GST, returns UTC.
 *
 * Reference:
 * - (Peter Duffett-Smith, pp.18-19)
 * - sowngwala::time::utc_from_gst
 *
 * Example:
 * ```rust
 * use chrono::Timelike;
 * use chrono::naive::{NaiveDateTime, NaiveDate, NaiveTime};
 * use sowngwala::time::utc_from_gst;
 *
 * let nanosecond: u32 = 230_000_000;
 * let gst: NaiveDateTime =
 *     NaiveDate::from_ymd(1980, 4, 22)
 *         .and_hms_nano(4, 40, 5, nanosecond);
 *
 * let utc = utc_from_gst(gst);
 * assert_eq!(utc.hour(), 14);
 * assert_eq!(utc.minute(), 36);
 * assert_eq!(utc.second(), 51); // 51.67040214530175
 * assert_eq!(
 *     utc.nanosecond(),
 *     670_402_145
 * );
 * ```
 * @public
 * @function
 * @param {Moment} gst
 * @returns {NaiveTimeContext}
 */
export function utc_from_gst(gst) {
  // Luckily, we only need date, not datetime.
  let jd = julian_day_from_generic_date(gst);

  let s = jd - 2_451_545.0;
  let t = s / 36_525.0;

  let t0 =
    6.697_374_558 +
    2_400.051_336 * t +
    0.000_025_862 * t * t;

  ({ quotient: t0 } = overflow(t0, 24.0));

  let decimal = decimal_hours_from_generic_time(
    NaiveTime.from_hmsn(
      gst.hour(),
      gst.minute(),
      gst.second(),
      // NOTE: 'Moment' does not have 'nanosecond'
      gst.millisecond() * 1_000_000
    )
  );

  ({ quotient: decimal } = overflow(decimal - t0, 24.0));

  return naive_time_from_decimal_hours(
    decimal * 0.997_269_566_3
  );
}
