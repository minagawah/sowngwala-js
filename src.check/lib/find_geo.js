/**
 * @module sowngwala/check/lib/find_geo
 */

import { CITY_DATA } from '../data';

const CITY_DATA_LENGTH = CITY_DATA.length;

/**
 * Given the selected city name, find
 * the corresponding city data,
 * and return the data.
 *
 * @private
 * @function
 */
export function find_geo(val) {
  let geo = null;

  if (val) {
    for (let i = 0; i < CITY_DATA_LENGTH - 1; i++) {
      const [city, lat, lat_bound, lng, lng_bound] =
        CITY_DATA[i];
      if (val === city) {
        geo = {
          city,
          lat: Number(lat),
          lat_bound,
          lng: Number(lng),
          lng_bound,
        };
        // console.log(`Found: ${city}`);
        break;
      }
    }
  }

  return geo;
}
