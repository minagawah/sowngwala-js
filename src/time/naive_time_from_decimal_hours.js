/**
 * @module sowngwala/time/naive_time_from_decimal_hours
 */

import { angle_from_decimal_hours } from './angle_from_decimal_hours';

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Convert decimal hours into `NaiveTime`.
 *
 * Original:
 * - sowngwala::time::naive_time_from_decimal_hours
 *
 * References:
 * - Peter Duffett-Smith, p.11
 *
 * @public
 * @function
 * @param {DecimalHours} dec
 * @returns {NaiveTimeContext}
 */
export function naive_time_from_decimal_hours(dec) {
  return angle_from_decimal_hours(dec).to_naive_time();
}
