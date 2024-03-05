/**
 * @module sowngwala/moon/moon_pos_equatorial
 */

import { equatorial_from_ecliptic_with_generic_date } from '../coords';
import { moon_pos_ecliptic } from './moon_pos_ecliptic';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

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
 * @param {NaiveDateTimeContext} dt
 * @returns {EquaCoordContext}
 */
export function moon_pos_equatorial(dt) {
  let date = dt.date();

  const { coord } =
    equatorial_from_ecliptic_with_generic_date(
      moon_pos_ecliptic(dt),
      date
    );
  return coord;
}
