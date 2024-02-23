/**
 * @module sowngwala/utils
 */

/** @typedef {import('moment').Moment} Moment */

export const noop = () => {};

/**
 * @typedef OverflowReturned
 * @type {Object}
 * @property {number} remainder - Value after the calculation.
 * @property {number} quotient - Value denoting how much did the value exceed.
 */

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
