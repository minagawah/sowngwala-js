/**
 * @module sowngwala/coords/horizontal_from_equatorial
 */

import { hour_angle_from_asc } from '../time';
import { horizontal_from_equatorial_with_hour_angle } from './horizontal_from_equatorial_with_hour_angle';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('./equatorial.js').EquaCoordContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('./geo.js').GeoCoordContext}
 */

/**
 * @typedef HorizonCoordContext
 * @type {import('./horizontal.js').HorizonCoordContext}
 */

/**
 * @typedef HorizontalFromEquatorialReturned
 * @type {Object}
 * @property {HorizonCoordContext} coord - Horizon coordinate position
 * @property {AngleContext} _hour_angle - Hour Angle (H)
 */

/**
 * See
 * 'horizontal_from_equatorial_with_hour_angle'
 * for almost everything is done there.
 * This is a wrapper for the above,
 * only it carry out calculations for
 * "hour angle (H)".
 *
 * From the given (1) datetime in UTC,
 * (2) the Equatorial position (which
 * consists of "right ascension (α)"
 * and "declination (δ)"), and (3)
 * observer's Geo location (which
 * consists of "Longitude and Latitude),
 * it will calculate "hour angle (H)",
 * and is passed down to
 * 'horizontal_from_equatorial_with_hour_angle'
 * which is the actual method to return
 * the Horizontal position (which
 * consists of "azimuth (A)" and
 * "altitude (α)").
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords.horizontal_from_equatorial_with_hour_angle}
 * @param {NaiveDateTimeContext} utc
 * @param {EquaCoordContext} equa_coord
 * @param {GeoCoordContext} geo_coord - Observer's Geolocation
 * @returns {HorizontalFromEquatorialReturned}
 */
export function horizontal_from_equatorial(
  utc,
  equa_coord,
  geo_coord
) {
  const asc = equa_coord.asc;
  const dec = equa_coord.dec;
  const lat = geo_coord.lat;
  const lng = geo_coord.lng;

  const _hour_angle = hour_angle_from_asc(utc, asc, lng);

  const { coord } =
    horizontal_from_equatorial_with_hour_angle(
      _hour_angle,
      dec,
      lat
    );

  return {
    coord,
    _hour_angle,
  };
}
