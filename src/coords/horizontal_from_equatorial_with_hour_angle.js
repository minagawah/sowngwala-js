/**
 * @module sowngwala/coords/horizontal_from_equatorial_with_hour_angle
 */

import { to_radians, to_degrees } from '../utils';
import {
  decimal_hours_from_angle,
  angle_from_decimal_hours,
} from '../time';
import { HorizonCoord } from './horizontal';

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * @typedef LatitudeContext
 * @type {import('./geo.js').LatitudeContext}
 */

/**
 * @typedef HorizonCoordContext
 * @type {import('./horizontal.js').HorizonCoordContext}
 */

/**
 * @typedef HorizontalFromEquatorialWithHourAngleReturned
 * @type {Object}
 * @property {HorizonCoordContext} coord - Horizon coordinate position
 */

/**
 * Given the hour angle (H) (which is
 * calculated from "right ascension
 * (α)" of Equatorial), declination (δ)
 * of Equatorial, and Observer's
 * latitude, returns "azimuth (A)"
 * and "altitude (α)".
 *
 * @public
 * @function
 * @param {AngleContext} hour_angle - "hour_angle" (H) (calculated from "right ascension (α)" of Equatorial).
 * @param {AngleContext} dec - "declination (δ)" of Equatorial.
 * @param {LatitudeContext} lat - Observer's latitude
 * @returns {HorizontalFromEquatorialWithHourAngleReturned}
 */
export function horizontal_from_equatorial_with_hour_angle(
  hour_angle,
  dec,
  lat
) {
  const h_decimal_hours =
    decimal_hours_from_angle(hour_angle);
  const h_decimal_degrees = h_decimal_hours * 15;
  const h_radians = to_radians(h_decimal_degrees);

  const dec_decimal_hours = decimal_hours_from_angle(dec);
  const dec_decimal_degrees = dec_decimal_hours;

  const dec_radians = to_radians(dec_decimal_degrees);
  const lat_radians = to_radians(lat.degrees);

  const sin_altitude =
    Math.sin(dec_radians) * Math.sin(lat_radians) +
    Math.cos(dec_radians) *
      Math.cos(lat_radians) *
      Math.cos(h_radians);

  const altitude_radians = Math.asin(sin_altitude);
  const altitude_degrees = to_degrees(altitude_radians);

  const cos_azimuth =
    (Math.sin(dec_radians) -
      Math.sin(lat_radians) * sin_altitude) /
    (Math.cos(lat_radians) * Math.cos(altitude_radians));

  const azimuth_radians = Math.acos(cos_azimuth);
  let azimuth_degrees = to_degrees(azimuth_radians);

  const sin_h = Math.sin(h_radians);
  if (sin_h >= 0.0) {
    azimuth_degrees = 360 - azimuth_degrees;
  }

  const altitude = angle_from_decimal_hours(
    altitude_degrees
  );
  const azimuth = angle_from_decimal_hours(azimuth_degrees);

  const coord = HorizonCoord({
    azimuth,
    altitude,
  });

  return { coord };
}
