/**
 * @module sowngwala/moon/moon_pos_equatorial
 */

import { equatorial_from_ecliptic_with_generic_date } from '../coords';
import { moon_pos_ecliptic } from './moon_pos_ecliptic';

/** @typedef {import('moment').Moment} Moment */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * Given the specific date and time,
 * returns "right ascension (α)" and
 * "declination (δ)" of the Equatorial
 * coordinate position.
 * (Peter Duffett-Smith, p.144)
 *
 * Original:
 * - sowngwala::moon::equatorial_position_of_the_moon_from_generic_datetime
 *
 * @public
 * @function
 * @param {Moment} dt
 * @returns {EquaCoordContext}
 */
export function moon_pos_equatorial(dt) {
  // Later, for Rust, we want to convert
  // datetime into date.
  let date = dt;
  const { coord } =
    equatorial_from_ecliptic_with_generic_date(
      moon_pos_ecliptic(dt),
      date
    );
  return coord;
}
