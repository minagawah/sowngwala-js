/**
 * @module sowngwala/sun/sun_pos_equatorial_from_generic_date
 */

import { sun_pos_equatorial } from './sun_pos_equatorial';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef SunPosEquatorialFromGenericDateReturned
 * @type {import('./sun_pos_equatorial.js').SunPosEquatorialReturned}
 */

/**
 * Given a specific 'date' (for which
 * '00:00:00' will automatically be set
 * for time) in UTC, it will return
 * the Equatorial position of the sun
 * which consists of "right ascension
 * (α)" and "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See 'sun_pos_equatorial' for that is
 * where the actual calculation are
 * to be carried out.
 *
 * Original:
 * - sonwgwalla::sun::equatorial_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.sun_pos_equatorial}
 * @param {Moment} date - UTC date (w/o specific time)
 * @returns {SunPosEquatorialFromGenericDateReturned}
 */
export function sun_pos_equatorial_from_generic_date(date) {
  const dt = date;
  dt.set({ hour: 0, minute: 0, second: 0 });
  return sun_pos_equatorial(dt);
}
