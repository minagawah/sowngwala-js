/**
 * @module sowngwala/check/geo_from_row
 */

import { INPUT_ELEM_KEYS_GEO } from './controllers/dom_element';
import { snake_from_kebab } from './utils';

/**
 * @private
 * @function
 */
export function geo_from_row(row) {
  return ['city', ...INPUT_ELEM_KEYS_GEO].reduce(
    (acc, key, index) => {
      acc[snake_from_kebab(key)] = row[index];
      return acc;
    },
    {}
  );
}
