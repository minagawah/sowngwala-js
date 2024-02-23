/**
 * @module sowngwala/time/decimal_hours_from_naive_time
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Convert `NaiveTime` into
 * decimal hours.
 *
 * Original:
 * - sowngwala::time::decimal_hours_from_naive_time
 *
 * Reference:
 * - (Peter Duffett-Smith, p.10)
 * - sowngwala::time::decimal_hours_from_time
 *
 * @public
 * @function
 * @param {NaiveTimeContext} naive
 * @returns {DecimalHours}
 */
export function decimal_hours_from_naive_time(naive) {
  let hour = naive.hour();
  let min = naive.minute();

  let sec_0 = naive.nanosecond() / 1_000_000_000;
  let sec = naive.second() + sec_0;
  let dec = hour + (min + sec / 60.0) / 60.0;

  return hour < 0.0 || min < 0.0 || sec < 0.0 ? -dec : dec;
}
