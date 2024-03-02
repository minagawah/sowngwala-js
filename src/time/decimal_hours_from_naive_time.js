/**
 * @module sowngwala/time/decimal_hours_from_naive_time
 */

import { decimal_hours_from_hms } from './decimal_hours_from_hms';

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
  let sec_0 = naive.nanosecond() / 1_000_000_000;
  let sec_1 = naive.second() + sec_0;

  return decimal_hours_from_hms(
    naive.hour(),
    naive.minute(),
    sec_1
  );
}
