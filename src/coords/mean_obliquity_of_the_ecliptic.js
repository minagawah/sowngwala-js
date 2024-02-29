/**
 * @module sowngwala/coords/mean_obliquity_of_the_ecliptic
 */

import { julian_day_from_generic_datetime } from '../time';

/** @typedef {import('moment').Moment} Moment */

/**
 * It is used in
 * 'equatorial_from_ecliptic_with_generic_date'
 * for finding
 * "the obliquity of the ecliptic (ε)
 * which is the angle between the planes
 * of the equator and the ecliptic
 * from the given datetime.
 * (Peter Duffett-Smith, p.41)
 *
 * TODO:
 * The argument for Rust version does
 * not necessarily require specific
 * time, but for JS version, it takes
 * time into consideration.
 *
 * @public
 * @function
 * @see {@link: sowngwala/coords.equatorial_from_ecliptic_with_generic_date}
 * @param {Moment} dt
 * @returns {number} - Obliquity of the ecliptic (ε) (in degrees)
 */
export function mean_obliquity_of_the_ecliptic(dt) {
  let jd = julian_day_from_generic_datetime(dt);
  jd -= 2_451_545.0; // January 1.5, 2000

  let t = jd / 36_525.0;
  let delta =
    46.815 * t + 0.0006 * t * t - 0.001_81 * t * t * t;
  delta /= 3600.0;

  return 23.439_292 - delta;
}
