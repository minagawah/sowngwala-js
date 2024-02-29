/**
 * @module sowngwala/sun/sun_pos_equatorial
 */

import { equatorial_from_ecliptic_with_generic_datetime } from '../coords';
import { sun_pos_ecliptic } from './sun_pos_ecliptic';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * ************************************
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
 * @returns {EquaCoordContext}
 */
export function sun_pos_equatorial(dt) {
  return equatorial_from_ecliptic_with_generic_datetime(
    sun_pos_ecliptic(dt),
    dt
  );
}
