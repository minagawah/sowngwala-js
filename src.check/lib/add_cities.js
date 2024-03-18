/**
 * @module sowngwala/check/lib/add_cities
 */

import { CITY_DATA } from '../data';

const CITY_DATA_LENGTH = CITY_DATA.length;

/**
 * Opens CITY_DATA, and add all
 * the city names to the page's
 * pulldown option.
 *
 * @private
 * @function
 */
export function add_cities(el) {
  return new Promise((resolve, reject) => {
    try {
      const datalist = el['city-names'];
      CITY_DATA.forEach((data, i) => {
        const city = data[0];
        const opt = document.createElement('option');
        opt.value = city;
        opt.innerHTML = city;
        datalist.appendChild(opt);
        if (i === CITY_DATA_LENGTH - 1) {
          resolve();
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
