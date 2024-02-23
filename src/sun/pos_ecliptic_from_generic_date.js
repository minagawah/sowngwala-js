/**
 * @module sowngwala/sun/pos_ecliptic_from_generic_date
 */

import {
  day_number_from_generic_date,
  days_since_1990,
} from '../time';
import { EcliCoord } from '../coords';

import { longitude_and_mean_anomaly } from './longitude_and_mean_anomaly';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * In terms of calculating the poistion
 * of the sun, it is probably the zenith
 * of Peter Duffett-Smith's book.
 * The book describes how to calculate
 * the position of the sun in 10 steps.
 *
 * Once found the position of the sun,
 * it returns it in the Ecliptic
 * coordinate position  which consists
 * of "latitude (β)" and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * Original:
 * - sowngwalla::sun::ecliptic_position_of_the_sun_from_generic_date
 *
 * @public
 * @function
 * @param {Moment} date
 * @returns {EcliCoordContext}
 */
export function pos_ecliptic_from_generic_date(date) {
  // [Step 1] (in his book, p.91)
  // Find out the day number for
  // the specified date.
  let day_number = day_number_from_generic_date(date);

  // [Step 2] (in his book, p.91)
  // Find out days since 1990.
  let days = days_since_1990(date.year()) + day_number;

  // [Step 3] to [Step 10] (in his book, p.91)
  // For the given number of days
  // since 1990, find out "sun's
  // longitude (λ)" and "mean
  // anomaly (M)".
  let { lng } = longitude_and_mean_anomaly(days);

  return EcliCoord({ lat: 0.0, lng });
}
