/**
 * @module sowngwala/sun/sun_pos_equatorial
 */

import { equatorial_from_ecliptic_with_generic_date } from '../coords';
import { sun_pos_ecliptic } from './sun_pos_ecliptic';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * Given a specific date, it will
 * return the Equatorial coordinate
 * position which consists of "right
 * ascension (α)" and "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See
 * 'sun_pos_ecliptic'
 * because the actual calculations are
 * done there.
 *
 * See, also
 * 'equatorial_from_ecliptic_with_generic_date'
 * for it converts the Ecliptic
 * coordinate position to the
 * corresponding Equatorial position.
 *
 * Original:
 * - sonwgwalla::sun::equatorial_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.sun_pos_ecliptic}
 * @see {@link: sowngwala/coords.equatorial_from_ecliptic_with_generic_date}
 * @param {Moment} date
 * @returns {EquaCoordContext}
 */
export function sun_pos_equatorial(date) {
  return equatorial_from_ecliptic_with_generic_date(
    sun_pos_ecliptic(date),
    date
  );
}
