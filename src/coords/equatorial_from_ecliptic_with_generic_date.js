/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_generic_date
 */

import { NaiveDateTime } from '../chrono';
import { equatorial_from_ecliptic_with_generic_datetime } from './equatorial_from_ecliptic_with_generic_datetime';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('./ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquatorialFromEclipticWithGenericDateReturned
 * @type {import('./equatorial_from_ecliptic_with_generic_datetime.js').EquatorialFromEclipticWithGenericDateTimeReturned}
 */

/**
 * See
 * 'equatorial_from_ecliptic_with_generic_datetime'
 *
 * In Rust version, it only takes "date".
 *
 * Original:
 * - sowngwala::coords::equatorial_from_ecliptic_with_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic_with_generic_datetime}
 * @param {EcliCoordContext} coord
 * @param {NaiveDateContext} date
 * @returns {EquatorialFromEclipticWithGenericDateReturned}
 */
export function equatorial_from_ecliptic_with_generic_date(
  coord,
  date
) {
  return equatorial_from_ecliptic_with_generic_datetime(
    coord,
    NaiveDateTime.from_date(date)
  );
}
