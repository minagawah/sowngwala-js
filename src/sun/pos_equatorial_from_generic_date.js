/**
 * @module sowngwala/sun/pos_equatorial_from_generic_date
 */

import { equatorial_from_ecliptic_with_generic_date } from '../coords';
import { pos_ecliptic_from_generic_date } from './pos_ecliptic_from_generic_date';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * Given a specific date, it will
 * return the equatorial coordinate
 * position which consists of "right
 * ascension (α)" and "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See
 * 'pos_ecliptic_from_generic_date'
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
 * @see {@link: sowngwala/sun.pos_ecliptic_from_generic_date}
 * @see {@link: sowngwala/coords.equatorial_from_ecliptic_with_generic_date}
 * @param {Moment} date
 * @returns {EquaCoordContext}
 */
export function pos_equatorial_from_generic_date(date) {
  return equatorial_from_ecliptic_with_generic_date(
    pos_ecliptic_from_generic_date(date),
    date
  );
}
