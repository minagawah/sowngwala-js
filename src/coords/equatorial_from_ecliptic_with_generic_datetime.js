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
 * It will convert the Ecliptic position
 * (which consists of 'latitude (β)' and
 * 'longitude (λ)') into the Equatorial
 * position (which consists of
 * 'ascension (α)' and 'declination (δ)').
 * (Peter Duffett-Smith, pp.40-41)
 *
 * Notice, also, how it calculates
 * "obliquity of the ecliptic (ε)"
 * automatically from the given date.
 *
 * See
 * 'equatorial_from_ecliptic'
 * for it has the actual calculations.
 *
 * In Rust version, it only takes
 * "date". However, we want to also
 * take "time" into consideration.
 * Hence, introducing this method
 * in JS version. It will become
 * a matter when we attempt to calculate
 * the mean obliquity. For this,
 * instead of passing only "date",
 * we are passing "datetime".
 *
 * Original:
 * - sowngwala::coords::equatorial_from_ecliptic_with_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic}
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
