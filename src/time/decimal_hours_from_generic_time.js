/**
 * @module sowngwala/time/decimal_hours_from_generic_time
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Converts `NativeTime` into decimal hours.
 *
 * Reference:
 * - (Peter Duffett-Smith, p.10)
 * - sowngwala::time::decimal_hours_from_time
 *
 * Example:
 * ```rust
 * use approx_eq::assert_approx_eq;
 * use chrono::naive::NaiveTime;
 * use sowngwala::time::decimal_hours_from_generic_time;
 *
 * let t = NaiveTime::from_hms_nano(18, 31, 27, 0);
 * let hours = decimal_hours_from_generic_time(t);
 * assert_approx_eq!(
 *     hours, // 18.524166666666666
 *     18.52417,
 *     1e-6
 * );
 * ```
 * @public
 * @function
 * @param {NaiveTimeContext} t
 * @returns {DecimalHours}
 */
export function decimal_hours_from_generic_time(t) {
  let hour = t.hour();
  let min = t.minute();

  // This is a bit different from
  // how it is calculated in
  // Peter Duffett-Smith's book.
  let sec_0 = t.nanosecond() / 1_000_000_000;
  let sec = t.second() + sec_0;
  let dec = hour + (min + sec / 60.0) / 60.0;

  return hour < 0.0 || min < 0.0 || sec < 0.0 ? -dec : dec;
}
