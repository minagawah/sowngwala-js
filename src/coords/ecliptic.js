/**
 * @module sowngwala/coords/ecliptic
 */

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
 * @property {number} lat - latitude (β)
 * @property {number} lng - longitude (λ)
 */

/**
 * @public
 * @function
 * @param {Object} args
 * @param {number} args.lat
 * @param {number} args.lng
 * @returns {EcliCoordContext}
 */
export const EcliCoord = ({ lat, lng }) => {
  return { lat, lng };
};
