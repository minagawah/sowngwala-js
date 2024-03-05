/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/sun/sun_pos_ecliptic
 */

import {
  day_number_from_generic_date,
  days_since_1990,
  decimal_hours_from_naive_time,
} from '../time';

import { NaiveTime } from '../chrono';
import { EcliCoord } from '../coords';
import { sun_longitude_and_mean_anomaly } from './sun_longitude_and_mean_anomaly';

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
 * @typedef SunPosEclipticReturned
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
 * To calculate the Ecliptic position,
 * Peter Duffett-Smith's book only
 * takes "date", but does not take
 * "time" into consideration. The book
 * calculates "sun's longitude (λ)" and
 * "mean anomaly (M)" for when "time"
 * is "00:00:00". Since we want to
 * specify "time" as well, so did I
 * slightly change the implementation
 * so that we take "time".
 *
 * In our repo, what implemented in
 * 'sun_pos_ecliptic_from_generic_date'
 * strictly follows the book. In another
 * word, it only takes "date".
 *
 * Whether we want "time" or not,
 * calculations are mostly the same,
 * and Peter Duffett-Smith explains the
 * calculation logic in 10 easy steps.
 * As you can see, bellow codes are
 * commented so that to show the
 * correspondances to the book.
 *
 * Original:
 * - sowngwalla::sun::ecliptic_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt - UTC datetime
 * @returns {SunPosEclipticReturned}
 */
export function sun_pos_ecliptic(dt) {
  const date = dt.date();

  // [Step 1]
  // (p.91)
  // Find out the "day number" for
  // the specified date.

  let day_number = day_number_from_generic_date(date);
  // console.log('day_number:', day_number);

  // [Step 2]
  // (p.91)
  // Find out days since 1990.

  /** @type {DecimalHours} */
  let days = days_since_1990(dt.year()) + day_number;
  // console.log('days[0]:', days);

  // You can see bellow that we prepare
  // the decimal hours to find out
  // "sun's longitude (λ)" and "mean
  // anomaly (M)". While the book only
  // takes "date", we want to specify
  // "time" so that we would get more
  // accurate values.

  /** @type {DecimalHours} */
  let decimal_hours = decimal_hours_from_naive_time(
    NaiveTime.from_hmsn(
      dt.hour(),
      dt.minute(),
      dt.second(),
      0.0
    )
  );

  // So, we are adding "time" as well.
  days + decimal_hours / 24.0;

  // console.log('days[1]:', days);

  // [Step 3] to [Step 10]
  // (p.91)
  // For the given number of days
  // since 1990, we will find out
  // "sun's/ longitude (λ)" and
  // "mean anomaly (M)".

  let { lng: _lng, mean_anom: _mean_anom } =
    sun_longitude_and_mean_anomaly(days);

  // console.log('lng:', _lng);
  // console.log('mean_anom:', _mean_anom);

  // Note: "latitude (β)" in Ecliptic
  // will always become "0.0" because
  // that is the definition of what
  // the Ecliptic coordinate system is.
  // See:
  // Peter Duffett-Smith, p.85.

  const coord = EcliCoord({ lat: 0.0, lng: _lng });

  // console.log('coord:', coord);

  return {
    coord,
    _mean_anom,
  };
}
