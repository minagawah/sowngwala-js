/**
 * @module sowngwala/check/lib/get_values
 */

import { INPUT_ELEM_KEYS } from '../constants';
import { is_empty } from './utils';

/**
 * Get all the form entries (inputs),
 * make it into a collection, and
 * return it. However, it will not
 * contain the inputs for 'city'
 * and 'city-names').
 *
 * @private
 * @function
 */
export function get_values(el) {
  let ok = 1;

  const vals = INPUT_ELEM_KEYS.filter(
    key => key.indexOf('city') < 0
  ).reduce((acc, key) => {
    const chk = el[key].value;

    let val;

    if (key.indexOf('bound') > -1) {
      if (chk !== '-') {
        val = chk;
      }
    } else if (!is_empty(chk)) {
      val = Number(chk || 0);
    }

    if (is_empty(val)) {
      console.warn(`"${key}" is missing`);
      ok *= 0;
    }

    acc[key] = val;
    return acc;
  }, {});

  return ok ? vals : null;
}
