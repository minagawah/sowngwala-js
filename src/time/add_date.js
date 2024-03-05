/**
 * @module sowngwala/time/add_date
 */

import { NaiveDateTime } from '../chrono';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * References:
 * - sowngwala::time::add_date
 *
 * Example:
 * ```rust
 * use chrono::{DateTime, Datelike, Timelike};
 * use chrono::naive::{NaiveDate, NaiveDateTime};
 * use chrono::offset::{FixedOffset, Utc};
 * use sowngwala::time::{
 *     build_fixed,
 *     build_utc,
 *     add_date
 * };
 *
 * let days: i64 = 1;
 * let zone: i32 = 4;
 *
 * let naive: NaiveDateTime =
 *     NaiveDate::from_ymd(2021, 1, 1)
 *         .and_hms(22, 37, 0);
 * let naive: NaiveDateTime = add_date(naive, days);
 *
 * assert_eq!(naive.day(), 2);
 * assert_eq!(naive.hour(), 22);
 * assert_eq!(naive.minute(), 37);
 * assert_eq!(naive.second(), 0);
 *
 * let fixed: DateTime<FixedOffset> =
 *     build_fixed(2021, 1, 1, 22, 37, 0, 0, zone);
 * let fixed: DateTime<FixedOffset> =
 *     add_date(fixed, days);
 *
 * assert_eq!(fixed.day(), 2);
 * assert_eq!(fixed.hour(), 22);
 * assert_eq!(fixed.minute(), 37);
 * assert_eq!(fixed.second(), 0);
 *
 * let utc: DateTime<Utc> =
 *     build_utc(2021, 1, 1, 22, 37, 0, 0);
 * let utc: DateTime<Utc> = add_date(utc, 1);
 *
 * assert_eq!(utc.day(), 2);
 * assert_eq!(utc.hour(), 22);
 * assert_eq!(utc.minute(), 37);
 * assert_eq!(utc.second(), 0);
 * ```
 *
 * Original:
 * - sowngwala::time::add_date
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @param {number} days
 * @returns {NaiveDateTimeContext}
 */
export function add_date(dt, days) {
  // Rust implementation would be:
  // ----------------------------------
  // dt + Duration::days(days)
  // ----------------------------------
  const added = dt.to_moment().add(days, 'days');
  return NaiveDateTime.from_moment(added);
}
