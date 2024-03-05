/**
 * @module sowngwala/sun/sun_pos_equatorial_from_generic_date
 */

import { NaiveDateTime } from '../chrono';
import { sun_pos_equatorial } from './sun_pos_equatorial';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

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
 * See 'sun_pos_equatorial' for
 * actual calculations.
 *
 * Just as it is discussed in
 * 'sun_pos_ecliptic', the book only
 * talks about "date", but we want
 * "time" for accuracy. Hence,
 * I introduced 'sun_pos_ecliptic'.
 *
 * Yet, if you prefer to use the bellow
 * method instead, you should always be
 * aware that you will get the result
 * for that of "00:00:00" no matter
 * whatever "date" you provide.
 *
 * Original:
 * - sonwgwalla::sun::equatorial_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.sun_pos_equatorial}
 * @see {@link: module:sowngwala/sun.sun_pos_ecliptic}
 * @see {@link: module:sowngwala/sun.sun_pos_ecliptic_from_generic_date}
 * @param {NaiveDateContext} date - UTC date (w/o specific time)
 * @returns {SunPosEquatorialFromGenericDateReturned}
 */
export function sun_pos_equatorial_from_generic_date(date) {
  const dt = NaiveDateTime.from_ymd_hms(
    date.year(),
    date.month(),
    date.day(),
    0,
    0,
    0
  );
  return sun_pos_equatorial(dt);
}
