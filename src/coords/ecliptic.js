/**
 * @module sowngwala/coords/ecliptic
 */

import { isEmpty } from 'ramda';

/**
 * An object returned when calling
 * 'EcliCoord' which represents
 * the position of the planetary body
 * in Ecliptic coordinate system,
 * and it consists of "latitude (β)"
 * and "longitude (λ)".
 *
 * @typedef EcliCoordContext
 * @type {Object}
 * @property {number} lat - latitude (β) (in degrees)
 * @property {number} lng - longitude (λ) (in degrees)
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {number} args.lat
 * @param {number} args.lng
 * @returns {EcliCoordContext}
 */
export const EcliCoord = ({ lat, lng }) => {
  if (isEmpty(lat)) throw new Error(`No 'lat'`);
  if (isEmpty(lng)) throw new Error(`No 'lng'`);
  return { lat, lng };
};
