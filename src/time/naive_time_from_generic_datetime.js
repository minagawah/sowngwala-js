/**
 * @module sowngwala/time/naive_time_from_generic_datetime
 */

import { NaiveTime } from '../chrono';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @returns {NaiveTimeContext}
 */
export function naive_time_from_generic_datetime(dt) {
  return NaiveTime.from_hmsn(
    dt.hour(),
    dt.minute(),
    dt.second(),
    dt.nanosecond()
  );
}
