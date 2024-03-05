/**
 * @module sowngwala/time/utc_from_gst
 */

import { NaiveTime } from '../chrono';
import { overflow } from '../utils';

import { julian_day_from_generic_date } from './julian_day_from_generic_date';
import { decimal_hours_from_generic_time } from './decimal_hours_from_generic_time';
import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef UtcFromGstReturned
 * @type {Object}
 * @property {NaiveTimeContext} utc_time - UTC Time
 * @property {DecimalDays} day_excess - Carry-over when exceeds 24 hours.
 */

/**
 * Given GST, returns UTC.
 *
 * Reference:
 * - Peter Duffett-Smith, pp.18-19
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/time/utc_from_gst}
 * @param {NaiveDateTimeContext} gst
 * @returns {UtcFromGstReturned}
 */
export function utc_from_gst(gst) {
  // We only need date, not datetime.
  let jd = julian_day_from_generic_date(gst);

  let s = jd - 2_451_545.0;
  let t = s / 36_525.0;

  let t0 =
    6.697_374_558 +
    2_400.051_336 * t +
    0.000_025_862 * t * t;

  let remainder = 0;

  ({ remainder: t0 } = overflow(t0, 24.0));

  let decimal_hours = decimal_hours_from_generic_time(
    NaiveTime.from_hmsn(
      gst.hour(),
      gst.minute(),
      gst.second(),
      gst.nanosecond()
    )
  );

  decimal_hours -= t0;

  ({ remainder: decimal_hours } = overflow(
    decimal_hours,
    24.0
  ));

  decimal_hours *= 0.997_269_566_3;

  return {
    utc_time: naive_time_from_decimal_hours(decimal_hours),
    day_excess: remainder,
  };
}
