/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_obliquity
 */

import { to_degrees, to_radians } from '../utils';
import { angle_from_decimal_hours } from '../time';
import { EquaCoord } from '../coords';

/**
 * @typedef EquaCoordContext
 * @type {import('./equatorial.js').EquaCoordContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('./ecliptic.js').EcliCoordContext}
 */

/**
 * For the first argument, it takes
 * the ecliptic coordinate position
 * which consists of "latitude (β)"
 * and "longitude (λ)". For the second
 * argument, it takes "the obliquity
 * of the ecliptic (ε)".
 * The function aims to carry out
 * the conversion, and will return
 * the Equatorial coordinate position
 * which consists of "right ascension
 * (α)" and "declination (δ)".
 * (Peter Duffett-Smith, pp.40-41)
 *
 * Generally, you should better use
 * 'equatorial_from_ecliptic_with_generic_date'
 * because you usually don't know the
 * "obliquity (ε)" for  date, but
 * 'equatorial_from_ecliptic_with_generic_date'
 * will calculate it for you.
 *
 * @public
 * @function
 * @see {@link: sowngwala/coords.equatorial_from_ecliptic_with_generic_date}
 * @param {EcliCoordContext} coord
 * @param {number} oblique - Obliquity of the ecliptic (ε) (in degrees)
 * @returns {EquaCoordContext}
 */
export function equatorial_from_ecliptic_with_obliquity(
  coord,
  oblique
) {
  let oblique_cos = Math.cos(to_radians(oblique));
  let oblique_sin = Math.sin(to_radians(oblique));

  let lat = coord.lat; // latitude (β)
  let lng = coord.lng; // longitude (λ)

  let lat_cos = Math.cos(to_radians(lat));
  let lat_sin = Math.sin(to_radians(lat));
  let lat_tan = Math.tan(to_radians(lat));
  let lng_cos = Math.cos(to_radians(lng));
  let lng_sin = Math.sin(to_radians(lng));

  let decline_sin =
    lat_sin * oblique_cos + lat_cos * oblique_sin * lng_sin;

  let decline_radians = Math.asin(decline_sin);
  let decline = to_degrees(decline_radians);

  let y = lng_sin * oblique_cos - lat_tan * oblique_sin;
  let x = lng_cos;

  // (Rust) y.atan2(x)
  // https://doc.rust-lang.org/std/primitive.f64.html#method.atan2
  // (JS) atan2(y, x)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
  let asc = to_degrees(Math.atan2(y, x));
  asc -= 360.0 * Math.floor(asc / 360.0);
  asc /= 15.0;

  return EquaCoord({
    asc: angle_from_decimal_hours(asc),
    dec: angle_from_decimal_hours(decline),
  });
}
