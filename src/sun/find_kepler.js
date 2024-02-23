/**
 * @module sowngwala/sun/find_kepler
 */

import { ECCENTRICITY_OF_ORBIT } from '../constants';

const KEPLER_ACCURACY = 1e-6; // (ε)

/**
 * It corresponds to [Step 6] of what
 * is described on p.91.
 *
 * When finding "mean anomaly (M)" and
 * "eccentric anomaly (E)" of the sun,
 * we need Kepler's equation.
 * (Peter Duffett-Smith, p.90)
 *
 * Peter Duffett-Smith refer to this
 * series of steps as "Routine R2"
 * and is explained in details on p.90.
 *
 * The actual calculation is done in
 * its helper function '_kepler_aux'
 * which recursively calls itself.
 *
 * In the program, it is used in
 * 'longitude_and_mean_anomaly'
 * which is further used in
 * 'pos_ecliptic_from_generic_date'
 * and is further used in
 * 'pos_equatorial_from_generic_date'.
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.longitude_and_mean_anomaly}
 * @see {@link: sowngwala/sun.pos_ecliptic_from_generic_date}
 * @param {number} mean_anom - Mean anomaly (M)
 * @returns {number} - Eccentric anomaly (E)
 */
export function find_kepler(mean_anom) {
  return _kepler_aux(mean_anom, mean_anom, 0);
}

/**
 * Actual calculations for Kepler's
 * equation are done in this recursive
 * function.
 *
 * @private
 * @function
 * @param {number} mean_anom - Mean anomaly (M)
 * @param {number} ecc
 * @param {number} counter
 * @returns {number} - Eccentric anomaly (E)
 */
function _kepler_aux(mean_anom, ecc, counter) {
  if (counter > 1000)
    throw new Error('Dude, this is insane...');

  let delta =
    ecc - ECCENTRICITY_OF_ORBIT * Math.sin(ecc) - mean_anom;

  if (Math.abs(delta) > KEPLER_ACCURACY) {
    let delta_e =
      delta / (1.0 - ECCENTRICITY_OF_ORBIT * Math.cos(ecc));

    return _kepler_aux(
      mean_anom,
      ecc - delta_e,
      counter + 1
    );
  }

  return ecc;
}
