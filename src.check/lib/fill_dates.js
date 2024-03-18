/**
 * @module sowngwala/check/lib/fill_dates
 */

import { is_empty } from './utils';

/**
 * Fill input forms with current date.
 *
 * @private
 * @function
 */
export function fill_dates(el) {
  const now = new Date();
  [
    ['year', 'getFullYear'],
    ['month', 'getMonth'],
    ['day', 'getDate'],
    ['hour', 'getHours'],
    ['min', 'getMinutes'],
    ['sec', 'getSeconds'],
  ].forEach(([key, method]) => {
    let value = now[method]();
    if (!is_empty(value)) {
      if (key === 'month') value++;
      el[key].value = value;
    }
  });
}
