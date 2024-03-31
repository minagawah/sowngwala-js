/**
 * @module sowngwala/moon/moon_equatorial_from_generic_datetime
 */

import { equatorial_from_ecliptic_with_generic_date } from '../coords';
import { moon_ecliptic_from_generic_datetime } from './moon_ecliptic_from_generic_datetime';

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
export function moon_equatorial_from_generic_datetime(dt) {
  let date = dt.date();

  const { coord } =
    equatorial_from_ecliptic_with_generic_date(
      moon_ecliptic_from_generic_datetime(dt),
      date
    );
  return coord;
}
