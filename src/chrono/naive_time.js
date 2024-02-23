/**
 * @module chrono/naive_time
 */

import { calibrate_hmsn } from '../time';

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').NanoSecond} NanoSecond */

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
 * @typedef NaiveTimeContext
 * @type {Object}
 * @property {Getter<Hour>} hour
 * @property {Getter<Minute>} minute
 * @property {Getter<Second>} second
 * @property {Getter<NanoSecond>} nanosecond
 * @property {Getter<DecimalDays>} day_excess
 * @property {Calibrate} calibrate
 */

/**
 * A publicly exposed object
 * containing a static method.
 *
 * @typedef NaiveTime
 * @type {Object}
 * @property {FromHMSNano} from_hmsn
 */

/**
 * @callback FromHMSNano
 * @param {number} h
 * @param {number} m
 * @param {number} s
 * @param {number} n
 * @returns {NaiveTimeContext}
 */

/**
 * @callback Calibrate
 * @returns {number} - Excess days resulting due to the calibration.
 * @see {@link module:sowngwala/time.calibrate_hmsn}
 */

/**
 * @public
 * @type {NaiveTime}
 */
export const NaiveTime = Object.freeze({
  from_hmsn,
});

/**
 * @public
 * @static
 * @type {FromHMSNano}
 */
function from_hmsn(h, m, s, n) {
  const self = _from_hmsn(h, m, s, n);
  self.calibrate();
  return self;
}

/**
 * @private
 * @type {FromHMSNano}
 */
function _from_hmsn(h, m, s, n) {
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
   * @type {NanoSecond}
   */
  let nano = n;

  /**
   * @private
   * @type {DecimalDays}
   */
  let day_excess = 0.0;

  day_excess = calibrate();

  /**
   * @protected
   * @type {NaiveTimeContext}
   */
  return Object.freeze({
    hour: () => hour,
    minute: () => min,
    second: () => sec,
    nanosecond: () => nano,
    day_excess: () => day_excess,
    calibrate,
  });

  /**
   * @protected
   * @type {Calibrate}
   */
  function calibrate() {
    ({
      hmsn: { hour, min, sec, nano },
      day_excess,
    } = calibrate_hmsn({
      hour,
      min,
      sec,
      nano,
    }));

    return day_excess;
  }
}
