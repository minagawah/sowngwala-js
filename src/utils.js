/**
 * @module sowngwala/utils
 */

import { NANOSECOND_UNIT } from './constants';

/** @typedef {import('moment').Moment} Moment */
/** @typedef {import('./types.js').Second} Second */
/** @typedef {import('./types.js').NanoSecond} NanoSecond */

export const noop = () => {};

export const pad = (n = 0, digits = 2) =>
  n.toString().padStart(digits, '0');

/**
 * JS has '-0' and '+0' which
 * is called "signed zeros".
 * We can make it unsigned by
 * doing 'value | 0'.
 * @public
 * @function
 * @param {number} value
 * @returns {number}
 */
export const unsigned_zero = value =>
  Object.is(value, -0) || Object.is(value, +0)
    ? value | 0
    : value;

/**
 * Given 'sec', extract 'nano', and
 * returns 'nano' and the new 'sec'.
 *
 * Ex.
 * sec_0 = 53.000_000_001_234
 * sec_1 = 53.000_000_001
 * nano = 456_000_000
 *
 * 'nano' is 1/1_000_000_000 of 'sec'.
 *
 * @public
 * @function
 * @param {Second} sec
 * @returns {{ sec: Second, nano: NanoSecond }}
 */
export function nano_from_sec(sec = 0.0) {
  const s = sec * NANOSECOND_UNIT;
  const _int = Math.floor(s);
  const _frac = fract(s);
  const _sec = _int / NANOSECOND_UNIT;
  const _nano = _frac * NANOSECOND_UNIT;

  return {
    sec: _sec,
    nano: _nano,
  };
}

/**
 * @typedef OverflowReturned
 * @type {Object}
 * @property {number} remainder - Value after the calculation.
 * @property {number} quotient - Value denoting how much did the value exceed.
 */

/**
 * Checks if the given value exceeds
 * the given target value.
 *
 * Original:
 * - sowngwala::time::carry_over
 *
 * @public
 * @function
 * @param {number} value - Value you want to check.
 * @param {number} base - Max/min for 'value' to carry over when exceeded.
 * @return {OverflowReturned}
 */
export function overflow(value, base) {
  let remainder = value % base;
  let divisible = value - remainder;
  let quotient = divisible / base;

  /*
   * Say, we had -1.0 for 'sec' which
   * is invalid for 'sec'. So, we want
   * to decrease 'min' by 1, and will
   * now have 59 for 'sec'.
   *
   * Say, we had 0°0'-1" for an angle.
   * Again, -1 is invalid for 'sec'.
   * For this, we would return -1 for
   * 'day_access' and the new angle
   * will now become 23°59'59".
   */

  if (remainder < 0.0) {
    remainder += base;
    quotient -= 1;
  }

  remainder = unsigned_zero(remainder);
  quotient = unsigned_zero(quotient);

  return { quotient, remainder };
}

/**
 * Returns the fractional
 * part of the given number.
 * Ex.
 * 2.345 --> 0.345
 * @public
 * @function
 * @param {number} value
 * @returns {number}
 */
export const fract = value => value - Math.floor(value);

/**
 * @public
 * @function
 * @param {number} rad
 * @returns {number}
 */
export const to_degrees = rad => rad * (180 / Math.PI);

/**
 * @public
 * @function
 * @param {number} deg
 * @returns {number}
 */
export const to_radians = deg => deg * (Math.PI / 180);

/**
 * @typedef StopperContext
 * @type {Object}
 * @property {function(): number} get_count
 * @property {function(): number} check
 */

/**
 * @public
 * @function
 * @param {Object} [options={}]
 * @param {number} [options.limit=1000]
 * @return {StopperContext}
 */
export function make_stopper(options = {}) {
  const { limit = 1000 } = options;
  let cnt = 0;
  return {
    get_count: () => cnt,
    check: () => {
      if (cnt > limit)
        throw new Error(`The loop exceeded ${limit} times`);
      cnt++;
      return cnt;
    },
  };
}

/**
 * @typedef LoggerContext
 * @type {Object}
 * @property {function(string): void} logger
 * @property {function(): void} logger_title
 */

/**
 * @public
 * @function
 * @param {string} mod
 * @param {string} func
 * @param {boolean} [out=false]
 * @returns {LoggerContext}
 */
export const make_logger = (mod, func, out = false) => {
  /**
   * @private
   * @function
   * @param {string} s
   * @param {*} v
   */
  const aux = (s, v) => {
    out ? console.log(`[${mod}] ${s}`, v) : noop();
  };

  return {
    logger: msg => {
      aux(`(${func}) ${msg}`);
    },
    logger_title: () => {
      aux(`++++ ${func}`);
    },
  };
};
