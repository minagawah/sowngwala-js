/**
 * @module sowngwala/sun/eot_from_gst
 */

import { NaiveDateTime } from '../chrono';
import {
  utc_from_gst,
  decimal_hours_from_naive_time,
  angle_from_decimal_hours,
} from '../time';
import { sun_pos_equatorial } from './sun_pos_equatorial';

/** @typedef {import('moment').Moment} Moment */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * @typedef EOTFromGSTReturned
 * @type {Object}
 * @property {AngleContext} angle
 * @property {DecimalDays} day_excess
 */

/**
 * EOT, or "the equation of time" is
 * the difference (in degree angle)
 * between the mean sun and the real
 * sun.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * Used in 'eot_from_utc', however, is
 * further used in 'eot_decimal_from_utc'.
 *
 * Although EOT is vital to finding
 * sun's position in precision, however,
 * EOT is currently not used from any
 * functions implemented anywhere
 * in the program...
 *
 * Original:
 * - sowngwala::sun::equation_of_time_from_gst
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_from_utc}
 * @see {@link: sowngwala/sun.eot_decimal_from_utc}
 * @param {NaiveDateTimeContext} gst
 * @returns {EOTFromGSTReturned}
 */
export function eot_from_gst(gst) {
  let date = gst.date();

  // In the book, we get
  // the Equatorial from
  // "date". However,
  // we want to manage
  // "time" as well.
  let { coord } = sun_pos_equatorial(gst);

  /**
   * 'asc' in 'EquaCoord' is 'Angle'
   * which is the right ascension (α).
   * @type {AngleContext}
   */
  let asc_0 = coord.asc;

  /** @type {NaiveTimeContext} */
  let asc_1 = asc_0.to_naive_time();

  // TODO:
  // Do we want the following
  // in datetime?

  /** @type {NaiveDateTimeContext} */
  let naivedatetime = NaiveDateTime.from_ymd_hmsn(
    date.year(),
    date.month(),
    date.day(),
    asc_1.hour(),
    asc_1.minute(),
    asc_1.second(),
    asc_1.nanosecond()
  );

  let day_excess = 0;

  /** @type {NaiveTimeContext} */
  let utc_time;

  ({ utc_time, day_excess } = utc_from_gst(naivedatetime));

  let decimal = decimal_hours_from_naive_time(utc_time);
  let e = 12.0 - decimal;

  let angle_0 = angle_from_decimal_hours(e);

  day_excess += angle_0.day_excess();

  return { angle: angle_0, day_excess };
}
