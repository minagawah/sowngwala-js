/**
 * @module sowngwala/time/calibrate_hmsn
 */

import { overflow } from '../utils';

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').NanoSecond} NanoSecond */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef AdditionalOptions
 * @type {Object}
 * @property {boolean} [angle=false] - When specified, it will take the given data as angle-based, and will have 'hour' overflow only when it reached 360. Usually, it should be 24 as a default, and this option should be set to 'false'. When set to 'true', it will set the said limit to 360.
 */

/**
 * @typedef CalibrateArguments
 * @type {HMSNano & AdditionalOptions}
 */

/**
 * @typedef HMSNano
 * @type {Object}
 * @property {Hour} hour
 * @property {Minute} min
 * @property {Second} sec
 * @property {NanoSecond} nano
 */

/**
 * Checks if 'hour', 'min', 'sec',
 * or 'nano' has overflows.
 * If they did, carry over the
 * values to the next. Returns
 * 'day_excess' if 'hour' had
 * an overflow, or when it was
 * 24 hours or more. In a similar
 * manner, if 'hour', 'min', 'sec',
 * or 'nano' were bellow zero,
 * borrow from the next in place
 * to always keep them above zero.
 *
 * @public
 * @function
 * @param {CalibrateArguments} args
 * @returns {{ hmsn: HMSNano, day_excess: DecimalDays }}
 */
export function calibrate_hmsn({
  hour,
  min,
  sec,
  nano,
  angle = false,
}) {
  const hour_limit = angle ? 360.0 : 24.0;

  /** @type {DecimalDays} */
  let day_excess = 0.0;

  let remainder = 0.0;
  let quotient = 0.0;

  // Carry over the exceeded
  // values to the next place.
  // Say, we had 60 seconds.
  // It is too much for 'sec'
  // and we want to carry over
  // to 'min' by increasing
  // 'min' by 1. For 'sec'
  // will now become 0 second.
  //
  // Say, we had 23°59'60"
  // and 60 is too much for
  // 'sec'. So, we would
  // return 1 for 'day_excess'
  // and will make a new
  // angle being 0°0'0".

  // Note: "1_000_000_000.0" is a 1 billion
  ({ remainder, quotient } = overflow(
    nano,
    1_000_000_000.0
  ));

  nano = remainder;
  sec += quotient; // sec_excess

  ({ remainder, quotient } = overflow(sec, 60.0));

  sec = remainder;
  min += quotient; // min_excess

  ({ remainder, quotient } = overflow(min, 60.0));

  min = remainder;
  hour += quotient; // hour_excess

  ({ remainder, quotient } = overflow(hour, hour_limit));

  hour = remainder;
  day_excess = quotient;

  return { hmsn: { hour, min, sec, nano }, day_excess };
}
