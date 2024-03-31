/**
 * @module sowngwala/sun/sun_equatorial_from_generic_date
 */

import { NaiveDateTime } from '../chrono';
import { sun_equatorial_from_generic_datetime } from './sun_equatorial_from_generic_datetime';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * @typedef SunEquatorialFromGenericDateTimeReturned
 * @type {import('./sun_equatorial_from_generic_datetime.js').SunEquatorialFromGenericDateTimeReturned}
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
 * See 'sun_equatorial_from_generic_datetime' for
 * actual calculations.
 *
 * Just as it is discussed in
 * 'ecliptic', the book only
 * talks about "date", but we want
 * "time" for accuracy. Hence,
 * I introduced 'ecliptic'.
 *
 * Yet, if you prefer to use the bellow
 * method instead, you should always be
 * aware that you will get the result
 * for that of "00:00:00" no matter
 * whatever "date" you provide.
 *
 * Original:
 * - sonwgwalla::sun::sun_equatorial_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.sun_equatorial_from_generic_datetime}
 * @see {@link: module:sowngwala/sun.sun_ecliptic_from_generic_datetime}
 * @see {@link: module:sowngwala/sun.sun_ecliptic_from_generic_date}
 * @param {NaiveDateContext} date - UTC date (w/o specific time)
 * @returns {SunEquatorialFromGenericDateTimeReturned}
 */
export function sun_equatorial_from_generic_date(date) {
  const dt = NaiveDateTime.from_ymd_hms(
    date.year(),
    date.month(),
    date.day(),
    0,
    0,
    0
  );
  return sun_equatorial_from_generic_datetime(dt);
}
