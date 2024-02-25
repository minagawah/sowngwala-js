/**
 * @module coords/angle
 */

import { calibrate_hmsn } from '../time';
import { NaiveTime } from '../chrono';

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
 * A context (or an instance)
 * to be created.
 *
 * @typedef AngleContext
 * @type {Object}
 * @property {Getter<Hour>} hour
 * @property {Getter<Minute>} minute
 * @property {Getter<Second>} second
 * @property {Getter<DecimalDays>} day_excess
 * @property {ToNaiveTime} to_naive_time
 * @property {Calibrate} calibrate
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
  // from_degree_ms,
});

/**
 * Watch out when you have 'degree' instead
 * of 'hour', and you want an instance created.
 * Actually, don't. Instead, convert it to
 * decimal degrees, and then to Hour, Minute,
 * and Second for creating 'AngleContext'.
 *
 * TODO:
 * We may want another static method to create
 * from Degree-Minute-Second, maybe?
 *
 * @public
 * @static
 * @type {FromHMS}
 */
function from_hms(h, m, s) {
  const self = _from_hms(h, m, s);
  // self.calibrate();
  return self;
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
  });

  /**
   * @protected
   * @type {ToNaiveTime}
   */
  function to_naive_time() {
    return NaiveTime.from_hmsn(hour, min, sec, 0.0);
  }

  /**
   * @protected
   * @type {Calibrate}
   */
  function calibrate() {
    ({
      hmsn: { hour, min, sec },
      day_excess,
    } = calibrate_hmsn({
      hour,
      min,
      sec,
      nano: 0,
    }));

    return day_excess;
  }
}
