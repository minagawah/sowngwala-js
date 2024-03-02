/**
 * @module sowngwala/sun/sun_pos_ecliptic_from_generic_date
 */

import { sun_pos_ecliptic } from './sun_pos_ecliptic';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef SunPosEclipticFromGenericDateReturned
 * @type {import('./sun_pos_ecliptic').SunPosEclipticReturned}
 */

/**
 * Given a 'date' in UTC (for which
 * '00:00:00' will automatically be set
 * for time), and will return
 * Ecliptic the position of the sun
 * which consists of "latitude (β)"
 * and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See 'sun_pos_ecliptic' for that is
 * where the actual calculation are
 * to be carried out.
 *
 * Original:
 * - sowngwalla::sun::ecliptic_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun/sun_pos_ecliptic}
 * @param {Moment} date - UTC date (w/o specific time)
 * @returns {SunPosEclipticFromGenericDateReturned}
 */
export function sun_pos_ecliptic_from_generic_date(date) {
  const dt = date;
  dt.set({ hour: 0, minute: 0, second: 0 });
  return sun_pos_ecliptic(dt);
}
