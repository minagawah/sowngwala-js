/**
 * @module sowngwala/time/julian_day_from_generic_datetime
 */

import { julian_day } from './julian_day';
import { decimal_days_from_generic_datetime } from './decimal_days_from_generic_datetime';

/** @typedef {import('moment').Moment} Moment */

/**
 * Converts a generic datetime into julian day.
 *
 * Original:
 * - sowngwala::time::julian_day_from_generic_datetime
 *
 * @param {Moment} dt
 * @returns {number}
 */
export function julian_day_from_generic_datetime(dt) {
  return julian_day(
    dt.year(),
    // NOTE: 'month' is indexed in JS
    dt.month() + 1,
    // NOTE: A bit problematic in 'sowngwalla'
    decimal_days_from_generic_datetime(dt)
  );
}
