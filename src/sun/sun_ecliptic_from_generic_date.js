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
 * Given a 'date' in UTC (for which
 * '00:00:00' will automatically be set
 * for time), and will return
 * Ecliptic the position of the sun
 * which consists of "latitude (β)"
 * and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * Consider using
 * 'sun_ecliptic_from_generic_datetime'
 * for it provides you more accurate
 * results. In Peter Duffett-Smith's
 * it takes only "date". Obviously,
 * it does not take "time" into
 * consideration. However, for
 * 'sun_ecliptic_from_generic_date'
 * takes "datetime", it gives you
 * more accurate result when you
 * want a result for a specific time.
 *
 * Original:
 * - sowngwalla::sun::sun_ecliptic_from_generic_date
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
