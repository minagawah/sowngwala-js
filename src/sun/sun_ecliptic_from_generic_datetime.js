/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/sun/sun_ecliptic_from_generic_datetime
 */

import {
  day_number_from_generic_date,
  days_since_1990,
  decimal_hours_from_naive_time,
} from '../time';

import { EcliCoord } from '../coords';
import { longitude_and_mean_anomaly } from './longitude_and_mean_anomaly';

/** @typedef {import('../types.js').DecimalDays} DecimalDays */
/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef SunEclipticFromGenericDateTimeReturned
 * @type {Object}
 * @property {EcliCoordContext} coord - Ecliptic position of the Sun
 * @property {number} _mean_anom - (optional) Mean anomaly (M) (in degrees)
 */

/**
 * Given a datetime in UTC, it will
 * return the Ecliptic position of
 * the sun (which consists of "latitude
 * (β)" and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * The book uses only "date".
 * It does not use "time".
 *
 * This JS version also uses "time".
 * That gives a more exact result.
 *
 * In this repo,
 * 'sun_ecliptic_from_generic_date'
 * follows the book.
 * It uses 00:00:00.
 *
 * The math is mostly the same.
 * Peter Duffett-Smith explains it in
 * 10 easy steps.
 *
 * The comments below map the code to
 * the book's steps.
 *
 * Original:
 * - sowngwala::sun::sun_ecliptic_from_generic_date
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt - UTC datetime
 * @returns {SunEclipticFromGenericDateTimeReturned}
 */
export function sun_ecliptic_from_generic_datetime(dt) {
  const date = dt.date();

  /*
   * [Step 1]
   * (p.91)
   * Find out the "day number" for
   * the specified date.
   */

  let day_number = day_number_from_generic_date(date);
  // console.log('day_number:', day_number);

  /*
   *  [Step 2]
   *  (p.91)
   *  Find out days since 1990.
   */

  /** @type {DecimalHours} */
  let days = days_since_1990(dt.year()) + day_number;
  // console.log('days[0]:', days);

  /*
   * Prepare decimal hours here.
   * The book only uses "date".
   * This version also uses "time".
   */

  /** @type {DecimalHours} */
  let decimal_hours = decimal_hours_from_naive_time(
    dt.time()
  );

  // Add the time offset here.
  days += decimal_hours / 24.0;

  // console.log('days[1]:', days);

  /*
   * [Step 3] to [Step 10]
   * (p.91)
   * For the given number of days
   * since 1990, we will find out
   * "sun's/ longitude (λ)" and
   * "mean anomaly (M)".
   */

  let { lng: _lng, mean_anom: _mean_anom } =
    longitude_and_mean_anomaly(days);

  // console.log('lng:', _lng);
  // console.log('mean_anom:', _mean_anom);

  /*
   * Note: "latitude (β)" in Ecliptic
   * will always become "0.0" because
   * that is the definition of what
   * the Ecliptic coordinate system is.
   * See:
   * Peter Duffett-Smith, p.85.
   */

  const coord = EcliCoord({ lat: 0.0, lng: _lng });

  // console.log('coord:', coord);

  return {
    coord,
    _mean_anom,
  };
}
