/**
 * @module sowngwala/coords/mean_obliquity_of_the_ecliptic
 */

import { julian_day_from_generic_datetime } from '../time';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * The method is used in
 * 'equatorial_from_ecliptic_with_generic_date'
 * when it tries to find "obliquity of
 * the ecliptic (ε)" which is the angle
 * between the planes of the equator
 * and the ecliptic.
 * (Peter Duffett-Smith, p.41)
 *
 * The Rust version only take "date"
 * but we want to make it accurate
 * so that it now takes "time" for
 * this version.
 *
 * @public
 * @function
 * @see {@link: sowngwala/coords.equatorial_from_ecliptic_with_generic_date}
 * @param {NaiveDateTimeContext} dt
 * @returns {number} - Obliquity of the Ecliptic (ε) (in degrees)
 */
export function mean_obliquity_of_the_ecliptic(dt) {
  // Whereas the book only takes "date",
  // see how it takes "time" as well.
  let jd = julian_day_from_generic_datetime(dt);
  jd -= 2_451_545.0; // January 1.5, 2000

  let t = jd / 36_525.0;
  let delta =
    46.815 * t + 0.0006 * t * t - 0.001_81 * t * t * t;
  delta /= 3600.0;

  return 23.439_292 - delta;
}
