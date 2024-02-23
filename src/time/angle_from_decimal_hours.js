/**
 * @module sowngwala/time/angle_from_decimal_hours
 */

import { Angle } from '../coords';
import { hms_from_decimal_hours } from './hms_from_decimal_hours';

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @public
 * @function
 * @param {DecimalHours} dec
 * @returns {AngleContext}
 */
export function angle_from_decimal_hours(dec) {
  let { hour, min, sec } = hms_from_decimal_hours(dec);
  return Angle.from_hms(hour, min, sec);
}
