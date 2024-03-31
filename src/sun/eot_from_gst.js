/**
 * @module sowngwala/sun/eot_from_gst
 */

import { NaiveDateTime } from '../chrono';
import {
  utc_from_gst,
  decimal_hours_from_naive_time,
  angle_from_decimal_hours,
} from '../time';
import { sun_equatorial_from_generic_datetime } from './sun_equatorial_from_generic_datetime';

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
 * "eot" in the function name stands
 * for "THE EQUATION OF TIME".
 * In astrological calculation,
 * "The Equation of Time" is the
 * difference between the "mean sun"
 * and the real sun's position.
 * For this function will return the
 * value in degree angle.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * The function is referred from
 * 'eot_from_utc'.
 *
 * While "The Equation of Time" is
 * vital in finding sun's accurate
 * position in precision, it is
 * currently not in use...
 *
 * Original:
 * sowngwala::sun::eot_from_gst
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

  /*
   * In the book, we get the Equatorial
   * from "date". However, we want to
   * manage "time" as well.
   */
  let { coord } = sun_equatorial_from_generic_datetime(gst);

  /*
   * 'asc' in 'EquaCoord' is 'Angle'
   * which is the right ascension (α).
   * @type {AngleContext}
   */
  let asc_0 = coord.asc;

  /** @type {NaiveTimeContext} */
  let asc_1 = asc_0.to_naive_time();

  /*
   * TODO: Do we want the following in
   * datetime?
   */

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
