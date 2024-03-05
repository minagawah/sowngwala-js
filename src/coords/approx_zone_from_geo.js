/**
 * @module sowngwala/coords/approx_zone_from_geo
 */

import { pad, to_radians } from '../utils';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('./geo.js').GeoCoordContext}
 */

/**
 * @param {NaiveDateTimeContext} local
 * @param {GeoCoordContext} geo
 * @returns {number}
 */
export function approx_zone_from_geo(local, geo) {
  const lat = geo.lat.degrees;
  const lng = geo.lng.degrees;
  const decimal_hours = Math.floor(lng / 15.0);

  const offset =
    decimal_hours >= 12.0
      ? decimal_hours - 12.0
      : decimal_hours;

  const lst = (-0.0069 + to_radians(lat) * 0.00007) % 24.0;

  return Math.round(offset + lst);
}

/**
 * @public
 * @function
 * @param {number} zone
 * @returns {string}
 */
export function zone_format(zone) {
  const sign = zone >= 0 ? '+' : '';
  return `${sign}${pad(zone)}:00`;
}
