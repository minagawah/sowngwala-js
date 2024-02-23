/**
 * @module sowngwala/sun/eot_from_gst
 */

import moment from 'moment';

import {
  utc_from_gst,
  decimal_hours_from_naive_time,
  angle_from_decimal_hours,
} from '../time';

import { pos_equatorial_from_generic_date } from './pos_equatorial_from_generic_date';

/** @typedef {import('moment').Moment} Moment */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
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
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_from_utc}
 * @see {@link: sowngwala/sun.eot_decimal_from_utc}
 * @param {Moment} gst
 * @returns {EOTFromGSTReturned}
 */
export function eot_from_gst(gst) {
  // While we had 'gst.date()'
  // in the original Rust code to extract
  // 'NaiveDate' from 'NaiveDateTime',
  // DATE and DATETIME are essentially
  // the same in JS. Hence, we simply
  // pass 'gst' to the next.
  let date = gst;

  /** @type {EquaCoordContext} */
  let coord = pos_equatorial_from_generic_date(date);

  /**
   * 'asc' in 'EquaCoord' is 'Angle'
   * which is the right ascension (α).
   * @type {AngleContext}
   */
  let asc_0 = coord.asc;

  /** @type {NaiveTimeContext} */
  let asc_1 = asc_0.to_naive_time();

  /** @type {Moment} */
  let naivetime = moment(
    Date.UTC(
      date.year(),
      // NOTE: 'month' in JS is indexed
      date.month() - 1,
      // NOTE: 'day' in Rust is 'date' in JS
      date.date(),
      asc_1.hour(),
      asc_1.minute(),
      asc_1.second()
    )
  ).utc(); // TODO: Do we want this in UTC?

  /** @type {NaiveTimeContext} */
  let utc = utc_from_gst(naivetime);
  let decimal = decimal_hours_from_naive_time(utc);
  let e = 12.0 - decimal;

  let angle_0 = angle_from_decimal_hours(e);
  let day_excess = angle_0.day_excess();

  return { angle: angle_0, day_excess };
}
