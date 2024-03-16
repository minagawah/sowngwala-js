/**
 * Reads 'worldcities.csv', extracts
 * city names and geo related info,
 * and output a file 'city_data.txt'.
 *
 * Usage:
 * node ./tools/parse_cities.js
 *
 * 'worldcities.csv' was downloaded
 * originally from the Pareto
 * Software's website 'simplemaps'
 * which is a CSV list of major
 * cities around the world with
 * relavant information associated.
 *
 * Originally, it has the following
 * file structures:
 *
 * row: [
 *   'city',    'city_ascii',
 *   'lat',     'lng',
 *   'country', 'iso2',
 *   'iso3',    'admin_name',
 *   'capital', 'population',
 *   'id'
 * ]
 * row: [
 *   'Tokyo',      'Tokyo',
 *   '35.6897',    '139.6922',
 *   'Japan',      'JP',
 *   'JPN',        'Tōkyō',
 *   'primary',    '37732000',
 *   '1392685764'
 * ]
 *
 * city --> 0
 * lat --> 2
 * lng --> 3
 * country --> 4
 *
 * From the above, I needed city
 * names and latitude/longitude
 * information so that allowing
 * users to search for the correct
 * information.
 *
 * ************************************
 * Data is provided under CC BY 4.0,
 * and you may find their license
 * informaion on their website:
 * https://simplemaps.com/data/world-cities
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const filepath = path.join(__dirname, 'worldcities.csv');

const memo = {};
memo.data = [];
memo.keys = [];

(async () => {
  await parse_cities();

  // ['data', 'keys']
  ['data'].forEach(key => {
    const filename = get_file_name(key);
    const name = get_const_name(key);
    const data = memo[key];

    fs.writeFileSync(
      path.join(__dirname, filename),
      build_js_const(name, data)
    );
  });
})();

/**
 * @private
 * @function
 */
function get_file_name(key) {
  return `city_${key}.txt`;
}

/**
 * @private
 * @function
 */
function get_const_name(key) {
  return `city_${key}`.toUpperCase();
}

/**
 * @private
 * @function
 * @param {string} name
 * @param {Array.<string>} data - All the lines you want to make into JS arrays.
 * @returns {string}
 */
function build_js_const(name, data) {
  return [
    `export const ${name} = [`,
    ...data,
    '];',
    '',
  ].join('\n');
}

/**
 * Simply quotes the given text with a single quote.
 * @private
 * @function
 */
function quote(text) {
  return `'${text}'`;
}

/**
 * @private
 * @function
 */
// function make_key(city, country) {
//   return `${city}-${country}`
//     .toLowerCase()
//     .replaceAll(' ', '-')
//     .replaceAll('(', '')
//     .replaceAll(')', '');
// }

/**
 * @private
 * @function
 */
function trim(s) {
  return s.replaceAll("'", '-');
}

/**
 * @private
 * @function
 */
function calc_latitude(lat) {
  let bound = 'N';
  if (lat < 0) {
    bound = 'S';
    lat *= -1;
  }
  return [lat, bound];
}

/**
 * @private
 * @function
 */
function calc_longitude(lng) {
  let bound = 'E';
  if (lng < 0) {
    bound = 'W';
    lng *= -1;
  }
  return [lng, bound];
}

/**
 * @private
 * @function
 */
async function parse_cities() {
  const parser = fs
    .createReadStream(filepath)
    .pipe(parse({}));

  let index = -1;
  for await (const row of parser) {
    index++;

    if (index > 0) {
      // Not using the first 'city' because
      // we want the ascii version of it.

      // eslint-disable-next-line no-unused-vars
      const [city, city_ascii, lat, lng, country] = row;

      const [lat2, lat_bound] = calc_latitude(Number(lat));
      const [lng2, lng_bound] = calc_longitude(Number(lng));

      // ------------------------------
      // city_data.txt
      // ------------------------------

      const city_country = trim(`${city_ascii}/${country}`);

      const tmp = [
        quote(city_country),
        lat2,
        quote(lat_bound),
        lng2,
        quote(lng_bound),
        // lat,
        // lng,
      ].join(', ');

      memo.data.push(`  [${tmp}],`);

      // ------------------------------
      // city_key.txt
      // ------------------------------

      // const key = trim(make_key(city_ascii, country));
      // memo.keys.push(`  ${quote(key)},`);
    }
  }
}
