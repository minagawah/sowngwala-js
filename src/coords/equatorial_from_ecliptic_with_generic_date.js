/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_generic_date
 */

import { equatorial_from_ecliptic_with_generic_datetime } from './equatorial_from_ecliptic_with_generic_datetime';

/** @typedef {import('moment').Moment} Moment */

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
 * for details.
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic_with_generic_datetime}
 * @param {EcliCoordContext} coord
 * @param {Moment} date
 * @returns {EquatorialFromEclipticWithGenericDateReturned}
 */
export function equatorial_from_ecliptic_with_generic_date(
  coord,
  date
) {
  const dt = date;
  dt.set({ hour: 0, minute: 0, second: 0 });
  return equatorial_from_ecliptic_with_generic_datetime(
    coord,
    dt
  );
}
