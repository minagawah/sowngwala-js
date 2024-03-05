/**
 * @module sowngwala/time/asc_from_hour_angle
 */

import { Angle } from '../coords';
import { gst_from_utc } from './gst_from_utc';
import { local_from_gst } from './local_from_gst';
import { decimal_hours_from_angle } from './decimal_hours_from_angle';
import { decimal_hours_from_naive_time } from './decimal_hours_from_naive_time';
import { hms_from_decimal_hours } from './hms_from_decimal_hours';

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * Given the datetime in UTC, and
 * the hour angle in AngleContext,
 * returns "right ascension (α)".
 * (Peter Duffett-Smith, p.35)
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc
 * @param {AngleContext} hour_angle
 * @param {LongitudeContext} lng
 * @returns {AngleContext}
 */
export function asc_from_hour_angle(utc, hour_angle, lng) {
  const gst = gst_from_utc(utc);
  const lst = local_from_gst(gst, lng);
  const lst_hours = decimal_hours_from_naive_time(lst);
  const hour_angle_decimal =
    decimal_hours_from_angle(hour_angle);

  let hour_angle_1 = lst_hours;
  hour_angle_1 -= hour_angle_decimal;

  if (hour_angle_1 < 0) {
    hour_angle_1 += 24;
  }

  const { hour, min, sec } =
    hms_from_decimal_hours(hour_angle_1);

  return Angle.from_hms(hour, min, sec);
}
