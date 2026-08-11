/**
 * @module sowngwala/sun/sun_ecliptic_from_generic_date
 */

import { NaiveDateTime } from '../chrono';
import { sun_ecliptic_from_generic_datetime } from './sun_ecliptic_from_generic_datetime';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * @typedef SunEclipticFromGenericDateTimeReturned
 * @type {import('./sun_ecliptic_from_generic_datetime').SunEclipticFromGenericDateTimeReturned}
 */

/**
 * Given a UTC date, return the
 * sun's ecliptic position.
 * The time is set to 00:00:00.
 *
 * The result has "latitude (β)"
 * and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * Use 'sun_ecliptic_from_generic_datetime'
 * when you need a specific time.
 *
 * Original:
 * - sowngwala::sun::sun_ecliptic_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun/sun_ecliptic_from_generic_datetime}
 * @param {NaiveDateContext} date - UTC date (w/o specific time)
 * @returns {SunEclipticFromGenericDateTimeReturned}
 */
export function sun_ecliptic_from_generic_date(date) {
  const dt = NaiveDateTime.from_ymd_hms(
    date.year(),
    date.month(),
    date.day(),
    0,
    0,
    0
  );
  return sun_ecliptic_from_generic_datetime(dt);
}
