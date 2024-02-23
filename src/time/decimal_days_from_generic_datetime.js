/**
 * @module sowngwala/time/decimal_days_from_generic_datetime
 */

import { NaiveTime } from '../chrono';
import { decimal_hours_from_naive_time } from './decimal_hours_from_naive_time';

/** @typedef {import('moment').Moment} Moment */
/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 *
 * @public
 * @function
 * @param {Moment} dt
 * @returns {DecimalDays}
 */
export function decimal_days_from_generic_datetime(dt) {
  let naive = NaiveTime.from_hmsn(
    dt.hour(),
    dt.minute(),
    dt.second(),
    0.0
  );

  let decimal = decimal_hours_from_naive_time(naive);

  // NOTE: 'day' in Rust is 'date' in JS
  return dt.date() + decimal / 24.0;
}
