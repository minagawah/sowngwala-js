/**
 * @module sowngwala/sun/sun_pos_equatorial
 */

import { equatorial_from_ecliptic_with_generic_datetime } from '../coords';
import { sun_pos_ecliptic } from './sun_pos_ecliptic';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * @typedef SunPosEquatorialReturned
 * @type {Object}
 * @property {EquaCoordContext} coord - Equatorial position of the sun
 * @property {EcliCoordContext} _ecliptic - (optional) Ecliptic position of the sun
 * @property {number} _mean_anom - (optional) Mean anomaly (M) (in degrees)
 * @property {number} _obliquity - (optional) Mean obliquity of the ecliptic (ε)
 */

/**
 * Given a specific 'dt' (datetime)
 * in UTC, it will return the Equatorial
 * position of the sun which consists
 * of "right ascension (α)" and
 * "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See 'sun_pos_ecliptic' for that is
 * where the actual calculations are
 * to be carried out.
 *
 * See, also
 * 'equatorial_from_ecliptic_with_generic_date'
 * for it converts the Ecliptic
 * coordinate position to that of
 * the Equatorial.
 *
 * Original:
 * - sonwgwalla::sun::equatorial_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.sun_pos_ecliptic}
 * @see {@link: module:sowngwala/coords.equatorial_from_ecliptic_with_generic_datetime}
 * @param {Moment} dt - UTC datetime (for specific time as well)
 * @returns {SunPosEquatorialReturned}
 */
export function sun_pos_equatorial(dt) {
  const { coord: _ecliptic, _mean_anom } =
    sun_pos_ecliptic(dt);

  const { coord, _obliquity } =
    equatorial_from_ecliptic_with_generic_datetime(
      _ecliptic,
      dt
    );

  return {
    coord,
    _ecliptic,
    _mean_anom,
    _obliquity,
  };
}
