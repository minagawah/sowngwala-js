/**
 * @module sowngwala/time/utc_from_local_geo.js
 */

import { utc_from_local } from './utc_from_local';
import { approx_zone_from_geo } from '../coords';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('../coords/geo.js').GeoCoordContext}
 */

/**
 * Given LST (Local Sidereal Time) and
 * the observer's geo coordinate
 * position (longitude and latitude),
 * returns UTC datetime.
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} local
 * @param {GeoCoordContext} geo
 * @returns {NaiveDateTimeContext}
 */
export function utc_from_local_geo(local, geo) {
  return utc_from_local(
    local,
    approx_zone_from_geo(local, geo)
  );
}
