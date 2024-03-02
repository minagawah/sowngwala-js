/**
 * @module sowngwala/time/hms_from_decimal_hours
 */

import { fract } from '../utils';

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * Note it is different from the Rust version.
 * See 'decimal_hours_from_angle' for
 * it depends on this version.
 *
 * References:
 * - Peter Duffett-Smith, p.11
 *
 * @private
 * @function
 * @param {DecimalHours} dec
 * @returns {{ hour: Hour, min: Minute, sec: Second }}
 */
export function hms_from_decimal_hours(dec) {
  let sign = dec < 0.0 ? -1 : 1;
  let dec_absolute = Math.abs(dec);

  let hour = Math.floor(dec_absolute);
  let fractional_part = fract(dec_absolute) * 60.0;
  let min = Math.floor(fractional_part);
  let sec = fract(fractional_part) * 60.0;

  if (hour != 0) {
    hour *= sign;
  } else if (min != 0) {
    min *= sign;
  } else {
    sec *= sign;
  }

  return { hour, min, sec };
}
