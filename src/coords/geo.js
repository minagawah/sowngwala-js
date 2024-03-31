/**
 * @module sowngwala/coords/geo
 */

import { isEmpty } from 'ramda';

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/** @typedef {'N' | 'S'} LatitudeBound */
/** @typedef {'E' | 'W'} LongitudeBound */

/**
 * Latitude (φ) in Horizontal system.
 *
 * @typedef LatitudeContext
 * @type {Object}
 * @property {number} degrees - Latitude in degrees
 * @property {LatitudeBound} bound - North ("N") or South ("S")
 */

/**
 * Longitude in Horizontal system.
 *
 * @typedef LongitudeContext
 * @type {Object}
 * @property {number} degrees - Longitude in degrees
 * @property {LongitudeBound} bound - East ("E") or West ("W")
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {number} args.degrees - Latitude in degrees
 * @param {LatitudeBound} args.bound - North ("N") or South ("S")
 * @returns {LatitudeContext}
 */
export const Latitude = ({ degrees, bound }) => {
  if (isEmpty(degrees)) throw new Error(`No 'degrees'`);
  if (isEmpty(bound)) throw new Error(`No 'bound'`);
  if (!(bound === 'N' || bound === 'S'))
    throw new Error(`Invalid bound: ${bound}`);
  return { degrees, bound };
};

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {number} args.degrees - Longitude in degrees
 * @param {LongitudeBound} args.bound - East ("E") or West ("W")
 * @returns {LongitudeContext}
 */
export const Longitude = ({ degrees, bound }) => {
  if (isEmpty(degrees)) throw new Error(`No 'degrees'`);
  if (isEmpty(bound)) throw new Error(`No 'bound'`);
  if (!(bound === 'E' || bound === 'W'))
    throw new Error(`Invalid bound: ${bound}`);
  return { degrees, bound };
};

/**
 * An object returned when calling
 * 'GeoCoord' which represents
 * the position of the observer
 * in Geo location position.
 * It consists of 'Latitude'
 * and 'Longitude'.
 *
 * @typedef GeoCoordContext
 * @type {Object}
 * @property {LatitudeContext} lat - latitude for Geo location
 * @property {LongitudeContext} lng - longitude for Geo location
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {LatitudeContext} args.lat - latitude for Geo location
 * @param {LongitudeContext} args.lng - longitude for Geo location
 * @returns {GeoCoordContext}
 */
export const GeoCoord = ({ lat, lng }) => {
  if (isEmpty(lat)) throw new Error(`No 'lat'`);
  if (isEmpty(lng)) throw new Error(`No 'lng'`);
  return { lat, lng };
};
