/**
 * @module sowngwala/time/naive_time_from_generic_datetime
 */

import { NaiveTime } from '../chrono';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @public
 * @function
 * @param {Moment} dt
 * @returns {NaiveTimeContext}
 */
export function naive_time_from_generic_datetime(dt) {
  return NaiveTime.from_hmsn(
    dt.hour(),
    dt.minute(),
    dt.second(),
    // NOTE: 'Moment' does not have 'nanosecond'
    dt.millisecond() * 1_000_000
  );
}
