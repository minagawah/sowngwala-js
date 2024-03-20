/**
 * @module sowngwala/check/get_city_list
 */

import { CITY_DATA } from './data';

/** @typedef {Array.<string | number>} CityData */
/** @typedef {Array.<CityData>} CityDataList */

const CITY_DATA_LENGTH = CITY_DATA.length;

/**
 * Given the selected city name, find
 * the corresponding city data,
 * and return the data.
 *
 * @private
 * @function
 * @returns {import('../constants.js').CityDataList}
 */
export function get_city_list(val) {
  const arr = [];

  // Only when we have 2 characters long.
  if (val && val.length > 1) {
    for (let i = 0; i < CITY_DATA_LENGTH - 1; i++) {
      const city = CITY_DATA[i][0].toLowerCase();
      if (city.includes(val.toLowerCase())) {
        arr.push(CITY_DATA[i]);
      }
    }
  }

  return arr;
}
