/**
 * @module sowngwala/time/nano_from_second
 */

import { fract } from '../utils';

/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').NanoSecond} NanoSecond */

/**
 * Carry-over utils (2)
 *
 * @private
 * @function
 * @param {Second} sec
 * @returns {{ sec: Second, nano: NanoSecond }}
 */
export function nano_from_second(sec) {
  let _sec = Math.floor(sec);
  let decimal_part = fract(sec) * 1_000_000_000.0;
  let nano = Math.floor(decimal_part);
  return { nano, sec: _sec };
}
