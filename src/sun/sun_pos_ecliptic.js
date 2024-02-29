/**
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

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef DecimalDays
 * @type {import('../types.js').DecimalDays}
 */

/**
 * @typedef DecimalHours
 * @type {import('../types.js').DecimalHours}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * Given a specific 'dt' (datetime)
 * in UTC, it will return the Ecliptic
 * position of the sun which consists of
 * "latitude (β)" and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * The book describes how to calculate
 * the position in 10 steps.
 * (see comments bellow for which
 * part corresponds to which step)
 *
 * @public
 * @function
 * @param {Moment} dt - UTC datetime (for specific time as well)
 * @returns {EcliCoordContext}
 */
export function sun_pos_ecliptic(dt) {
  // [Step 1] (in his book, p.91)
  // Find out the day number for
  // the specified date.
  let day_number = day_number_from_generic_date(dt);

  // [Step 2] (in his book, p.91)
  // Find out days since 1990.

  /**
   * @type {DecimalDays}
   */
  let days = days_since_1990(dt.year()) + day_number;

  // ==================================
  // IMPORTANT
  // ==================================
  // This part is not discussed in
  // Peter Duffett-Smith's book,
  // and he assumes the time being
  // '00:00:00' for granted, but
  // we want to extract time from the
  // given time, and want to add it
  // to the decimal days!!!!

  let naive = NaiveTime.from_hmsn(
    dt.hour(),
    dt.minute(),
    dt.second(),
    0.0
  );

  /**
   * @type {DecimalHours}
   */
  let decimal_hours = decimal_hours_from_naive_time(naive);

  // Adding the decimal hours for precision!!!!
  days + decimal_hours / 24.0;

  // [Step 3] to [Step 10] (in his book, p.91)
  // For the given number of days
  // since 1990, find out "sun's
  // longitude (λ)" and "mean
  // anomaly (M)".
  let { lng } = sun_longitude_and_mean_anomaly(days);

  // Sun's "latitude (β)" in Ecliptic
  // will always become 0.0 because
  // that's the very definition of
  // what Ecliptic coordinate system.
  // This is explained in Peter
  // Duffett-Smith, p.85.
  return EcliCoord({ lat: 0.0, lng });
}
