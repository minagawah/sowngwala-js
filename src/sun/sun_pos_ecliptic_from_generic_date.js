/**
 * @module sowngwala/sun/sun_pos_ecliptic_from_generic_date
 */

import { NaiveDateTime } from '../chrono';
import { sun_pos_ecliptic } from './sun_pos_ecliptic';

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

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
 * Consider using
 * 'sun_pos_ecliptic_from_generic_date'
 * because it gives you accurate
 * a result. In Peter Duffett-Smith's
 * it takes only "date". Obviously,
 * it does not take "time" into
 * consideration. However, for
 * 'sun_pos_ecliptic_from_generic_date'
 * takes "datetime", it gives you
 * more accurate result when you
 * want a result for a specific time.
 *
 * Original:
 * - sowngwalla::sun::ecliptic_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun/sun_pos_ecliptic}
 * @param {NaiveDateContext} date - UTC date (w/o specific time)
 * @returns {SunPosEclipticFromGenericDateReturned}
 */
export function sun_pos_ecliptic_from_generic_date(date) {
  const dt = NaiveDateTime.from_ymd_hms(
    date.year(),
    date.month(),
    date.day(),
    0,
    0,
    0
  );
  return sun_pos_ecliptic(dt);
}
