/**
 * @module sowngwala/sun/longitude_and_mean_anomaly
 */

import {
  ECLIPTIC_LONGITUDE_AT_1990,
  ECLIPTIC_LONGITUDE_OF_PERIGEE,
  ECCENTRICITY_OF_ORBIT,
} from '../constants';
import { to_radians, to_degrees } from '../utils';

import { find_kepler } from './find_kepler';

/**
 * @typedef LngMeanAnomalyReturned
 * @type {Object}
 * @property {number} lng - Sun's longitude (λ)
 * @property {number} mean_anom - Mean anomaly (M) (in radians)
 */

/**
 * Given a number of days since 1990
 * for the target date, it returns
 * "Sun's longitude (λ)" and "Mean
 * Anomaly (M)" for the date.
 *
 * Used in
 * 'pos_ecliptic_from_generic_date'
 * which is further used in
 * 'pos_equatorial_from_generic_date'.
 *
 * While
 * 'pos_equatorial_from_generic_date'
 * being the starting point for
 * calculating the position of the sun,
 * it owes majority of its calculations
 * in the logic implemented in here.
 *
 * Original:
 * - sowngwala::sun::sun_longitude_and_mean_anomaly
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.pos_ecliptic_from_generic_date}
 * @see {@link: module:sowngwala/sun.pos_equatorial_from_generic_date}
 * @param {number} days
 * @returns {LngMeanAnomalyReturned}
 */
export function longitude_and_mean_anomaly(days) {
  // [Step 3] (in his book, p.91)
  let n = (360.0 / 365.242_191) * days;
  n -= 360.0 * Math.floor(n / 360.0);

  // =================================
  // Mean Anomaly (M)
  // =================================
  // [Step 4] to [Step 5] (in his book, p.91)
  // Or, it is fully explained in p.89.
  let mean_anom =
    n +
    ECLIPTIC_LONGITUDE_AT_1990 -
    ECLIPTIC_LONGITUDE_OF_PERIGEE;

  if (mean_anom < 0.0) {
    mean_anom += 360.0;
  }

  mean_anom = to_radians(mean_anom);

  // =================================
  // Eccentric Anomaly (E)
  // =================================
  // [Step 6] (in his book, p.91)
  let ecc = find_kepler(mean_anom);

  // =================================
  // True Anomaly (v)
  // =================================
  // Find true motion of the sun in
  // an ellipse.
  // [Step 7] to [Step 9] (in his book, p.91)
  // Or, it is fully explained in p.90.
  let v =
    Math.sqrt(
      (1.0 + ECCENTRICITY_OF_ORBIT) /
        (1.0 - ECCENTRICITY_OF_ORBIT)
    ) * Math.tan(ecc / 2.0);

  v = to_degrees(Math.atan(v) * 2.0);

  // =================================
  // Sun's Longitude (λ)
  // =================================
  // [Step 10] (in his book, p.91)
  let lng = v + ECLIPTIC_LONGITUDE_OF_PERIGEE;

  if (lng > 360.0) {
    lng -= 360.0;
  }

  if (lng < 0.0) {
    lng += 360.0;
  }

  return { lng, mean_anom };
}
