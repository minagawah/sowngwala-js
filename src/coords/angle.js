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
 * When you create the instance, you
 * may freely choose to manage your
 * 'hour' as in that of time, or in
 * that of the degree context
 * (e.g. '24 hours' vs '360 degrees').
 * However, when you run 'calibrate'
 * method, it defaults to oveflow
 * the 'hour' in the time context.
 * If you wish to calibrate 'hour'
 * in the dgree context, then you
 * need to explicitly specify
 * 'calibrate' to run in the degree
 * context by giving the option
 * 'options.angle' to 'calibrate'.
 *
 * Moreover, it defaults NOT to
 * calibrate 'hour' even when a negative
 * value were specified to 'hour'.
 * For instance, say, you had '-10' for
 * your 'hour', it will stay '-10' even
 * if you run 'calibrate'. If you want
 * to change the negative into the
 * positive, you need to explicitly
 * specify 'options.hour_overflow'
 * to 'calibrate' method.
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
     * Usually, take it in time context
     * (defaults to FALSE).
     * Only when specified TRUE,
     * take it as a degree context.
     */
    const angle = !!options?.angle;

    /*
     * Usually, let the negative hour
     * stay negative as it is
     * (defaults to FALSE).
     * Only when specified TRUE,
     * then change the negative
     * into the positive.
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
