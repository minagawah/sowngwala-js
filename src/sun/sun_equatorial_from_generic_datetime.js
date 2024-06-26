/**
 * @module sowngwala/sun/sun_equatorial_from_generic_datetime
 */

import { equatorial_from_ecliptic_with_generic_datetime } from '../coords';
import { sun_ecliptic_from_generic_datetime } from './sun_ecliptic_from_generic_datetime';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * @typedef SunEquatorialFromGenericDateTimeReturned
 * @type {Object}
 * @property {EquaCoordContext} coord - Equatorial position of the sun
 * @property {EcliCoordContext} _ecliptic - (optional) Ecliptic position of the sun
 * @property {number} _mean_anom - (optional) Mean anomaly (M) (in degrees)
 * @property {number} _obliquity - (optional) Mean obliquity of the ecliptic (ε)
 */

/**
 * Given a datetime in UTC, it will
 * return the Equatorial position of
 * the sun (which consists of "right
 * ascension (α)" and "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See 'sun_ecliptic_from_generic_datetime' for most of
 * the calculations are done there.
 *
 * Just as explained fully in
 * 'sun_ecliptic_from_generic_datetime', the book does
 * not take "time" into consideration
 * but only "date". So,
 * 'sun_equatorial_from_generic_date'
 * is the method which strictly follows
 * the book, but the method provided
 * here takes "time".
 *
 * Also, notice how
 * 'equatorial_from_ecliptic_with_generic_date'
 * converts the Ecliptic into Equatorial.
 *
 * Original:
 * - sonwgwalla::sun::sun_equatorial_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.sun_ecliptic_from_generic_datetime}
 * @see {@link: module:sowngwala/coords.equatorial_from_ecliptic_with_generic_datetime}
 * @param {NaiveDateTimeContext} utc - UTC datetime (for specific time as well)
 * @returns {SunEquatorialFromGenericDateTimeReturned}
 */
export function sun_equatorial_from_generic_datetime(utc) {
  /*
   * In the book, we get the Equatorial
   * from "date". However, we want to
   * manage "time" as well.
   */
  const { coord: _ecliptic, _mean_anom } =
    sun_ecliptic_from_generic_datetime(utc);

  /*
   * Same here. We want to take "time"
   * into consideration. To be specific,
   * we are passing "time" to
   * 'mean_obliquity_of_the_ecliptic'
   * so that we would improve accuracy.
   */
  const { coord, _obliquity } =
    equatorial_from_ecliptic_with_generic_datetime(
      _ecliptic,
      utc
    );

  return {
    coord,
    _ecliptic,
    _mean_anom,
    _obliquity,
  };
}
