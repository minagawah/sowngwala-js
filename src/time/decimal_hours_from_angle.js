/**
 * @module sowngwala/time/decimal_hours_from_angle
 */

import { decimal_hours_from_hms } from './decimal_hours_from_hms';

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * TODO:
 * For Rust version, I may probably want using
 * 'hms_from_decimal_hours' like the one
 * implemented here.
 *
 * Original:
 * - sowngwala::time::decimal_hours_from_angle
 *
 * @public
 * @function
 * @param {AngleContext} angle
 * @returns {DecimalHours}
 */
export function decimal_hours_from_angle(angle) {
  return decimal_hours_from_hms(
    angle.hour(),
    angle.minute(),
    angle.second()
  );
}
