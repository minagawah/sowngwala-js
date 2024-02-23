/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_generic_date
 */

import { equatorial_from_ecliptic } from './equatorial_from_ecliptic';
import { mean_obliquity_of_the_ecliptic } from './mean_obliquity_of_the_ecliptic';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EquaCoordContext
 * @type {import('./equatorial.js').EquaCoordContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('./ecliptic.js').EcliCoordContext}
 */

/**
 * See 'equatorial_from_ecliptic' for
 * it has the actual calculations.
 * It will convert the Ecliptic
 * coordinate position into that of
 * the Equatorial.
 * (Peter Duffett-Smith, pp.40-41)
 *
 * Note, also, just by giving
 * a specific date, it calculates
 * "obliquity (of the ecliptic) (ε)"
 * for you.
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic}
 * @param {EcliCoordContext} coord
 * @param {Moment} date
 * @returns {EquaCoordContext}
 */
export function equatorial_from_ecliptic_with_generic_date(
  coord,
  date
) {
  // This is in degrees, not radians.
  let oblique = mean_obliquity_of_the_ecliptic(date);
  return equatorial_from_ecliptic(coord, oblique);
}
