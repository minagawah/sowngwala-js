import { make_stopper } from '../utils';

import { is_leap_year } from './is_leap_year';

/** @typedef {import('../types.js').Year} Year */
/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * Find out days since 1990. However,
 * whatever the date is given, it will
 * compare two dates by 'Jan 0th'.
 * For instance, when 'July 27th, 1988'
 * is given, then it will compare
 * 'Jan0th, 1988' and 'Jan0th, 1990'
 * which is exactly -2 years. Since
 * we have a leap year on 1988, as to
 * for days, we subtract -1.
 * (Peter Duffett-Smith, p.86)
 *
 * Given: July 27th, 1988
 *
 * 365 days * 2 yrs = 730 days
 * 730 days - 1 day = 729 days
 *
 * Since it 1988 is before 1990:
 * 720 days * -1 = -729 days
 *
 * Original:
 * - sowngwala::time::days_since_1990
 *
 * @param {Year} year
 * @returns {DecimalDays}
 */
export function days_since_1990(year) {
  let stopper = make_stopper();
  let year_0 = year;
  let days = 0;

  /**
   * @private
   * @type {function(boolean): number}
   */
  const get_delta = leap => (leap ? 366 : 365);

  if (year - 1990 < 0) {
    while (year_0 < 1990) {
      stopper.check();
      // const cnt = stopper.get_count();

      const leap = is_leap_year(year_0);
      const delta = get_delta(leap);
      days -= delta;
      year_0 += 1;

      // console.log('[time] (days_since_1990) ----------------------');
      // console.log('[time] (days_since_1990) cnt:', cnt);
      // console.log('[time] (days_since_1990) year_0:', year_0);
      // console.log('[time] (days_since_1990) leap:', leap ? 'yes' : 'no');
      // console.log('[time] (days_since_1990) delta:', delta);
      // console.log('[time] (days_since_1990) days:', days);
    }
  } else {
    while (year_0 > 1990) {
      stopper.check();
      const leap = is_leap_year(year_0);
      const delta = get_delta(leap);
      days += delta;
      year_0 -= 1;
    }
  }

  return days;
}
