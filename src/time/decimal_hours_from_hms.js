/**
 * @module sowngwala/time/decimal_hours_from_hms
 */

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @public
 * @function
 * @param {Hour} hour
 * @param {Minute} min
 * @param {Second} sec
 * @returns {DecimalHours}
 */
export function decimal_hours_from_hms(hour, min, sec) {
  let hour_1 = Math.abs(hour);
  let min_1 = Math.abs(min);
  let sec_1 = Math.abs(sec);

  let dec = hour_1 + (min_1 + sec_1 / 60.0) / 60.0;

  return hour < 0 || min < 0 || sec < 0.0 ? -dec : dec;
}
