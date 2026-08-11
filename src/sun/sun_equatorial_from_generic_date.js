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
 * Given a UTC date, return the
 * sun's equatorial position.
 * The time is set to 00:00:00.
 *
 * The result has "right ascension
 * (α)" and "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See 'sun_equatorial_from_generic_datetime'
 * for the actual calculation.
 *
 * This wrapper always returns the
 * midnight result for the given date.
 *
 * Original:
 * - sowngwala::sun::sun_equatorial_from_generic_date
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
