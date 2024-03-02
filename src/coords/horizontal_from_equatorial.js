/**
 * @module sowngwala/coords/horizontal_from_equatorial
 */

import { hour_angle_from_asc } from '../time';
import { horizontal_from_equatorial_with_hour_angle } from './horizontal_from_equatorial_with_hour_angle';

/** @typedef {import('moment').Moment} Moment */

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
 * Using
 * 'horizontal_from_equatorial_with_hour_angle'
 * to easily carry out Equatorial to
 * Horizontal calculation.
 *
 * See
 * 'horizontal_from_equatorial_with_hour_angle'
 * for most of the calculations are
 * done there.
 
 * Given the datetime in UTC, Equatorial
 * coordinate position (which consists
 * of "right ascension (α)" and
 * "declination (δ)"), and Observer's
 * Geo location (which consists of
* "Longitude and Latitude). It will
 * first calculate "hour angle (H)",
 * which is passed down to
 * 'horizontal_from_equatorial_with_hour_angle'
 * which returns the Horizontal
 * coordinate position.
 * (which consists of "azimuth (A)" and
 * "altitude (α)")
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords.horizontal_from_equatorial_with_hour_angle}
 * @param {Moment} utc
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
