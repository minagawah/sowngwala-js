/**
 * @module coords/angle
 */

import { calibrate_hmsn } from '../time';
import { NaiveTime } from '../chrono';

const ROUND_DIGITS = 100_000;

/**
 * @param {number} num
 */
const round = num =>
  Math.round(num * ROUND_DIGITS) / ROUND_DIGITS;

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/** @typedef {import('../types.js').Degree} Degree */
/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @template T
 * @typedef Getter
 * @type {function(): T}
 */

/**
 * This is a context (or an instance)
 * returned from the factory.
 *
 * For a newly created 'Angle' instance,
 * it is entirely up to you to treat
 * 'hour' in context of 'time' (Ex.
 * '24 hours') or in context of
 * 'degree angle' (Ex. '360 degrees').
 * You 'Angle' instance will not have
 * any distinctions.
 *
 * However, when you run 'calibrate'
 * method, you need to decide in which
 * context you want to run it.
 *
 * When you run 'calibrate' method,
 * it defaults to 'time' context, and
 * will calculate 'hour' overflow
 * accordingly. However, if you want to
 * run it in 'degree angle' context,
 * you need to explicitly tell the
 * method to run it in 'degree angle'
 * context by giving 'options.angle'
 * option.
 *
 * Currently, 'options.angle' is
 * specified to 'calibrate' method when
 * creating 'coords.EquaCoord' or
 * 'coords.HorizonCoord'. But, there
 * are no other codes in this library
 * utilizing the option for now.
 *
 * Moreover, negative values for 'hour'
 * will be treated differently. While
 * negative will become positive in
 * 'degree angle' context, it will
 * leave negative values as they are
 * in 'time' context.
 * For instance, if you had '-10' for
 * 'hour', it will stay being '-10'.
 * Yet, if you want to also process
 * negative values even under 'time'
 * context, then you must explicitly
 * give 'options.hour_overflow' to
 * 'calibrate' method.
 *
 * Currently, there are no programs
 * utilizing 'options.hour_overflow'
 * for now ( except for some tests).
 *
 * @typedef AngleContext
 * @type {Object}
 * @property {Getter<Hour>} hour
 * @property {Getter<Minute>} minute
 * @property {Getter<Second>} second
 * @property {Getter<DecimalDays>} day_excess
 * @property {ToNaiveTime} to_naive_time
 * @property {Calibrate} calibrate
 * @property {function(): void} print
 */

/**
 * A publicly exposed object
 * containing a static method.
 *
 * @typedef Angle
 * @type {Object}
 * @property {FromHMS} from_hms
 */

/**
 * @callback FromHMS
 * @param {Hour} h
 * @param {Minute} m
 * @param {Second} s
 * @returns {AngleContext}
 */

/**
 * Convert Angle into NaiveTime.
 *
 * @callback ToNaiveTime
 * @returns {NaiveTimeContext}
 */

/**
 * @callback Calibrate
 * @param {Object} options
 * @param {boolean} [options.angle=false] - When specified, it will take the given data as angle-based, and will have 'hour' overflow only when it reached 360. Usually, it should be 24 as a default, and this option should be set to 'false'. When set to 'true', it will set the said limit to 360.
 * @param {boolean} [options.hour_overflow=true] - If specified TRUE, changes the negative into the positive. If FALSE, let the negative hour as it is.
 * @returns {number} - Excess days resulting due to the calibration.
 * @see {@link module:sowngwala/time.calibrate_hmsn}
 */

/**
 * A publicly exposed object
 * with a static method
 * which lets you create
 * an instance of `AngleContext`.
 * @public
 * @type {Angle}
 */
export const Angle = Object.freeze({
  from_hms,
});

/**
 * @public
 * @static
 * @type {FromHMS}
 */
function from_hms(h, m, s) {
  return _from_hms(h, m, s);
}

/**
 * @private
 * @type {FromHMS}
 */
function _from_hms(h, m, s) {
  /**
   * @private
   * @type {Hour}
   */
  let hour = h;

  /**
   * @private
   * @type {Minute}
   */
  let min = m;

  /**
   * @private
   * @type {Second}
   */
  let sec = s;

  /**
   * @private
   * @type {DecimalDays}
   */
  let day_excess = 0.0;

  /**
   * @protected
   * @type {AngleContext}
   */
  return Object.freeze({
    hour: () => hour,
    minute: () => min,
    second: () => sec,
    day_excess: () => day_excess,
    to_naive_time,
    calibrate,
    print: () => `${hour}°${min}'${round(sec)}`,
  });

  /**
   * @protected
   * @type {ToNaiveTime}
   */
  function to_naive_time() {
    // Note:
    // 'from_hms' will extract 'nano' from 'sec'.
    return NaiveTime.from_hms(hour, min, sec);
  }

  /**
   * @protected
   * @type {Calibrate}
   */
  function calibrate(options) {
    /*
     * By default, it is FALSE, and it
     * runs in the 'time' context.
     * Only when TRUE were explicitly
     * specified, will it run in
     * the 'degree angle' context.
     */
    const angle = !!options?.angle;

    /*
     * By default, it is FALSE, and it
     * will leave a negative value for
     * 'hour' as it is. Only when TRUE
     * were explicitly specified, will
     * it change negative into positive.
     */
    const hour_overflow = !!options?.hour_overflow;

    ({
      hmsn: { hour, min, sec },
      day_excess,
    } = calibrate_hmsn({
      hour,
      min,
      sec,
      nano: 0,
      angle,
      hour_overflow,
    }));

    return day_excess;
  }
}
