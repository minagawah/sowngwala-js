/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/time/hour_angle_from_asc
 */

import { Angle } from '../coords';
import { gst_from_utc } from './gst_from_utc';
import { local_from_gst } from './local_from_gst';
import { decimal_hours_from_angle } from './decimal_hours_from_angle';
import { decimal_hours_from_naive_time } from './decimal_hours_from_naive_time';
import { hms_from_decimal_hours } from './hms_from_decimal_hours';

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * Given the date time in UTC, and
 * "right ascension (α)", it will return
 * the hour angle (H) as 'AngleContext'.
 * (Peter Duffett-Smith, p.35)
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc
 * @param {AngleContext} asc
 * @param {LongitudeContext} lng
 * @returns {AngleContext}
 */
export function hour_angle_from_asc(utc, asc, lng) {
  /** @type {NaiveTimeContext} */
  const gst = gst_from_utc(utc);

  /** @type {NaiveTimeContext} */
  const lst = local_from_gst(gst, lng);

  /** @type {DecimalHours} */
  const lst_hours = decimal_hours_from_naive_time(lst);

  /** @type {DecimalHours} */
  const asc_decimal = decimal_hours_from_angle(asc);

  /** @type {DecimalHours} */
  let hour_angle = lst_hours - asc_decimal;

  if (hour_angle < 0) {
    hour_angle += 24;
  }

  const { hour, min, sec } =
    hms_from_decimal_hours(hour_angle);

  return Angle.from_hms(hour, min, sec);
}
