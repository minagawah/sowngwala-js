/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_generic_datetime
 */

import { equatorial_from_ecliptic_with_obliquity } from './equatorial_from_ecliptic_with_obliquity';
import { mean_obliquity_of_the_ecliptic } from './mean_obliquity_of_the_ecliptic';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

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
 * Convert the ecliptic position
 * to the equatorial position.
 *
 * It takes 'latitude (β)' and
 * 'longitude (λ)'.
 * It returns 'right ascension (α)'
 * and 'declination (δ)'.
 * (Peter Duffett-Smith, pp.40-41)
 *
 * It also calculates the
 * obliquity of the ecliptic (ε)
 * from the given datetime.
 *
 * See
 * 'equatorial_from_ecliptic_with_obliquity'
 * for the actual calculations.
 *
 * The Rust version only takes
 * "date". This JS version also
 * takes "time" so the obliquity
 * can use the datetime value.
 *
 * Original:
 * - sowngwala::coords::equatorial_from_ecliptic_with_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic_with_obliquity}
 * @param {EcliCoordContext} coord
 * @param {NaiveDateTimeContext} dt
 * @returns {EquatorialFromEclipticWithGenericDateTimeReturned}
 */
export function equatorial_from_ecliptic_with_generic_datetime(
  coord,
  dt
) {
  // This is in degrees, not radians.
  let _obliquity = mean_obliquity_of_the_ecliptic(dt);
  // console.log('mean_obliquity:', _obliquity);

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
