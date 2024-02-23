/**
 * @module sowngwala/time/naive_time_from_decimal_days
 */

import { fract } from '../utils';

import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Original:
 * - sowngwala::time::naive_time_from_decimal_days
 *
 * @public
 * @function
 * @param {DecimalDays} days
 * @returns {{ day: number, naive: NaiveTimeContext }}
 */
export function naive_time_from_decimal_days(days) {
  let integer_part_of_days = Math.floor(days);
  let hours = fract(days) * 24.0;
  let naive = naive_time_from_decimal_hours(hours);
  return { day: integer_part_of_days, naive };
}
