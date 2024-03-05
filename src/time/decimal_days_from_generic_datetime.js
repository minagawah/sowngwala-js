/**
 * @module sowngwala/time/decimal_days_from_generic_datetime
 */

import { NaiveTime } from '../chrono';
import { decimal_hours_from_naive_time } from './decimal_hours_from_naive_time';

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @returns {DecimalDays}
 */
export function decimal_days_from_generic_datetime(dt) {
  let naive = NaiveTime.from_hmsn(
    dt.hour(),
    dt.minute(),
    dt.second(),
    0.0
  );

  let decimal_hours = decimal_hours_from_naive_time(naive);

  return dt.day() + decimal_hours / 24.0;
}
