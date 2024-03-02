/**
 * @module sowngwala/coords/equatorial
 */

import { isEmpty } from 'ramda';

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * An object returned when calling
 * 'EquaCoord' which represents
 * the position of the planetary body
 * in Equatorial coordinate system,
 * and it consists of "right ascension
 * (α)" and "declination (δ)".
 *
 * @typedef EquaCoordContext
 * @type {Object}
 * @property {AngleContext} asc - right ascension (α)
 * @property {AngleContext} dec - declination (δ)
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {AngleContext} args.asc - right ascension (α)
 * @param {AngleContext} args.dec - declination (δ)
 * @returns {EquaCoordContext}
 */
export const EquaCoord = ({ asc, dec }) => {
  if (isEmpty(asc)) throw new Error(`No 'asc'`);
  if (isEmpty(dec)) throw new Error(`No 'dec'`);
  return { asc, dec };
};
