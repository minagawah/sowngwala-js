/**
 * @module sowngwala/coords/horizontal
 */

import { isEmpty } from 'ramda';

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * An object returned when calling
 * 'HorizonCoord' which represents
 * the position of the planetary body
 * in the Horizontal coordinate
 * system, and it consists of
 * "azimuth (A)" and "altitude (α)".
 *
 * @typedef HorizonCoordContext
 * @type {Object}
 * @property {AngleContext} azimuth - azimuth (A)
 * @property {AngleContext} altitude - altitude (α)
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {AngleContext} args.azimuth - azimuth (A)
 * @param {AngleContext} args.altitude - altitude (α)
 * @returns {HorizonCoordContext}
 */
export const HorizonCoord = ({ azimuth, altitude }) => {
  if (isEmpty(azimuth)) throw new Error(`No 'azimuth'`);
  if (isEmpty(altitude)) throw new Error(`No 'altitude'`);
  azimuth.calibrate({ angle: true });
  altitude.calibrate({ angle: true });
  return { azimuth, altitude };
};
