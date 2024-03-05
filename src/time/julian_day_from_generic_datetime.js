/**
 * @module sowngwala/time/julian_day_from_generic_datetime
 */

import { julian_day } from './julian_day';
import { decimal_days_from_generic_datetime } from './decimal_days_from_generic_datetime';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * Converts a generic datetime into julian day.
 *
 * Original:
 * - sowngwala::time::julian_day_from_generic_datetime
 *
 * @param {NaiveDateTimeContext} dt
 * @returns {number}
 */
export function julian_day_from_generic_datetime(dt) {
  return julian_day(
    dt.year(),
    dt.month(),
    // NOTE: Currently, it is bit
    // problematic in the Rust
    // version...
    decimal_days_from_generic_datetime(dt)
  );
}
