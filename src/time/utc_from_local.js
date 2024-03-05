/**
 * @module sowngwala/time/utc_from_local.js
 */

import { overflow } from '../utils';
import { NaiveDateTime } from '../chrono';
import { add_date } from './add_date';
import { decimal_hours_from_generic_time } from './decimal_hours_from_generic_time';
import { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * Given LST (Local Sidereal Time) and
 * the time zone offset, returns UTC.
 *
 * References:
 * - Peter Duffett-Smith, p.13
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} local
 * @param {number} zone
 * @returns {NaiveDateTimeContext}
 */
export function utc_from_local(local, zone) {
  let date = local.date();
  let time = local.time();

  let decimal_hours = decimal_hours_from_generic_time(time);
  // console.log('local:', local.print());
  // console.log('zone:', zone);
  // console.log('decimal_hours[0]:', decimal_hours);

  decimal_hours -= zone;
  // console.log('decimal_hours[1]:', decimal_hours);

  let day_excess = 0;
  ({ remainder: decimal_hours, quotient: day_excess } =
    overflow(decimal_hours, 24));
  // console.log('decimal_hours[2]:', decimal_hours);
  // console.log('day_excess:', day_excess);

  const new_time =
    naive_time_from_decimal_hours(decimal_hours);
  // console.log('new_time:', new_time.print());

  let utc = NaiveDateTime.from_date_time(date, new_time);
  // console.log('utc[0]:', utc.print());

  utc = add_date(utc, day_excess);
  // console.log('utc[1]:', utc.print());

  return utc;
}
