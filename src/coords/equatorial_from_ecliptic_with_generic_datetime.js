/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_generic_datetime
 */

import { equatorial_from_ecliptic_with_obliquity } from './equatorial_from_ecliptic_with_obliquity';
import { mean_obliquity_of_the_ecliptic } from './mean_obliquity_of_the_ecliptic';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EcliCoordContext
 * @type {import('./ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('./equatorial.js').EquaCoordContext}
 */

/**
 * @typedef EquatorialFromEclipticWithGenericDateTimeReturned
 * @type {Object}
 * @property {EquaCoordContext} coord - Equatorial position of the sun
 * @property {number} _obliquity - (optional) Mean obliquity of the ecliptic (ε)
 */

/**
 * Converts the Ecliptic coordinate
 * position into that of the Equatorial.
 * See 'equatorial_from_ecliptic' for
 * actual calculations.
 * (Peter Duffett-Smith, pp.40-41)
 *
 * Also, notice how it automatically
 * calculates for "obliquity of the
 * ecliptic (ε)" from the given date.
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic}
 * @param {EcliCoordContext} coord
 * @param {Moment} dt
 * @returns {EquatorialFromEclipticWithGenericDateTimeReturned}
 */
export function equatorial_from_ecliptic_with_generic_datetime(
  coord,
  dt
) {
  // This is in degrees, not radians.
  let _obliquity = mean_obliquity_of_the_ecliptic(dt);

  const equatorial =
    equatorial_from_ecliptic_with_obliquity(
      coord,
      _obliquity
    );

  return {
    coord: equatorial,
    _obliquity,
  };
}
