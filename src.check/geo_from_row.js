/**
 * @module sowngwala/check/geo_from_row
 */

/**
 * @private
 * @function
 */
export function geo_from_row(row) {
  const [city, lat, lat_bound, lng, lng_bound] = row;
  return { city, lat, lat_bound, lng, lng_bound };
}
