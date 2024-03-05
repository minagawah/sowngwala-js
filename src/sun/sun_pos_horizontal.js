/**
 * @module sowngwala/sun/sun_pos_horizontal
 */

import { horizontal_from_equatorial } from '../coords';
import { sun_pos_equatorial } from './sun_pos_equatorial';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('../coords/geo.js').GeoCoordContext}
 */

/**
 * @typedef HorizonCoordContext
 * @type {import('../coords/horizontal.js').HorizonCoordContext}
 */

/**
 * @typedef SunPosHorizontalReturned
 * @type {Object}
 * @property {HorizonCoordContext} coord - Horizontal position of the sun
 * @property {EquaCoordContext} _equatorial - Equatorial position of the sun
 * @property {EcliCoordContext} _ecliptic - (optional) Ecliptic position of the sun
 * @property {number} _mean_anom - (optional) Mean anomaly (M) (in degrees)
 * @property {number} _obliquity - (optional) Mean obliquity of the ecliptic (ε)
 * @property {AngleContext} _hour_angle - Hour Angle (H)
 */

/**
 * Given UTC datetime and observer's
 * geo coordinate position (latitude
 * and longitude), returns the
 * Horizontal position of the sun which
 * consists of "Azimuth (A)" and
 * "Altitude (α)".
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc - UTC datetime
 * @param {GeoCoordContext} geo - Observer's geo coordinate position (latitude and longitude)
 * @returns {SunPosHorizontalReturned}
 */
export function sun_pos_horizontal(utc, geo) {
  const {
    // Equatorial Coordinate
    coord: _equatorial,
    // Ecliptic Coordinate
    _ecliptic,
    // Mean Anomaly (M)
    _mean_anom,
    // Mean Obliquity (ε)
    _obliquity,
  } = sun_pos_equatorial(utc);

  const {
    // Horizontal Coordinate
    coord,
    // Hour Angle (H)
    _hour_angle,
  } = horizontal_from_equatorial(utc, _equatorial, geo);

  return {
    coord,
    _ecliptic,
    _equatorial,
    _mean_anom,
    _obliquity,
    _hour_angle,
  };
}
