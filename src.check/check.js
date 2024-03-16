/**
 * This is for a demo page.
 *
 * @module sowngwala/check
 */

import { CITY_DATA } from './data';
import { debounce } from './utils';

const ROUND_DIGITS = 100_000;
const CITY_DATA_LENGTH = CITY_DATA.length;

const INPUT_ELEM_KEYS = [
  'year',
  'month',
  'day',
  'hour',
  'min',
  'sec',
  'city',
  'city-names',
  'lat',
  'lat-bound',
  'lng',
  'lng-bound',
];

const ELEM_KEYS = [
  ...INPUT_ELEM_KEYS,
  'ecliptic-lng',
  'mean-anom',
  'obliquity',
  'asc',
  'dec',
  'azimuth',
  'altitude',
];

const el = {};

// Add debounce effect to event listeners.
const event_handlers = {
  find_geo_from_city: debounce(_find_geo_from_city, 1000),
  calc_sun_position: debounce(_calc_sun_position, 1000),
};

// Sowngwala functions to be dynamically imported
let GeoCoord;
let Longitude;
let Latitude;
let NaiveDateTime;
let utc_from_local_geo;
let sun_pos_horizontal;

let ready = false;

/**
 * Executed once the page is ready.
 */
export const start = async () => {
  if (typeof Sowngwala === 'undefined')
    throw new Error("Can't find Sowngwala");

  let ok = 1;

  // Check for required DOM elements.
  ELEM_KEYS.forEach(key => {
    el[key] = document.querySelector(`#${key}`);
    if (!el[key]) {
      ok *= 0;
    }
  });

  if (!ok)
    throw new Error('Something is wrong with DOM elements');

  // Import Sowngwala's functions dynamically.
  ({ Longitude, Latitude, GeoCoord } = Sowngwala.coords);
  ({ NaiveDateTime } = Sowngwala.chrono);
  ({ utc_from_local_geo } = Sowngwala.time);
  ({ sun_pos_horizontal } = Sowngwala.sun);

  // Add event listeners for inputs.
  // For normal inputs, we want to calculate
  // for the sun's position. But, when we
  // select the city name, we want to
  // get latitude and longitude.
  INPUT_ELEM_KEYS.forEach(key => {
    const handler =
      key.indexOf('city') > -1
        ? event_handlers.find_geo_from_city
        : event_handlers.calc_sun_position;

    el[key].addEventListener('input', handler);
    el[key].addEventListener('propertychange', handler);
  });

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
    if (value) {
      if (key === 'month') value++;
      el[key].value = value;
    }
  });

  await add_cities();
  ready = true;
  console.log('Ready to proceed');

  _calc_sun_position();
};

/**
 * Opens CITY_DATA, and add all the city names to the pulldown option.
 * @private
 * @function
 */
function add_cities() {
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

/**
 * When city name changes, find its latitude and longitude.
 * @private
 * @function
 */
function _find_geo_from_city() {
  if (!ready) {
    console.warn('Not ready');
    return;
  }

  const val = el.city.value;

  if (val) {
    for (let i = 0; i < CITY_DATA_LENGTH - 1; i++) {
      const [city, lat, lat_bound, lng, lng_bound] =
        CITY_DATA[i];
      if (val === city) {
        el['lat'].value = Number(lat);
        el['lat-bound'].value = lat_bound;
        el['lng'].value = Number(lng);
        el['lng-bound'].value = lng_bound;
        console.log(`Found: ${city}`);
        _calc_sun_position();
        break;
      }
    }
  }
}

/**
 * When input data changes, calculates for the sun's position.
 * @private
 * @function
 */
function _calc_sun_position() {
  if (!ready) {
    console.warn('Not ready');
    return;
  }

  try {
    const vals = get_values();

    if (!vals) {
      console.warn('Not all values are filled');
      return;
    }

    // -------------------------------------
    // Local --> UTC
    // -------------------------------------

    const lat = Latitude({
      degrees: vals.lat,
      bound: vals['lat-bound'],
    });

    const lng = Longitude({
      degrees: vals.lng,
      bound: vals['lng-bound'],
    });

    const geo = GeoCoord({ lat, lng });

    const dt = NaiveDateTime.from_ymd_hms(
      vals.year,
      vals.month,
      vals.day,
      vals.hour,
      vals.min,
      vals.sec
    );

    const utc = utc_from_local_geo(dt, geo);

    const {
      coord: horizontal,
      _equatorial: equatorial,
      _ecliptic: ecliptic,

      // Mean Anomaly (M)
      _mean_anom,
      // Mean Obliquity (ε)
      _obliquity,
    } = sun_pos_horizontal(utc, geo);

    // Ecliptic Longitude (λ)
    const ecliptic_lng = ecliptic.lng;

    // Right Ascension (α)
    const asc = equatorial.asc;

    // Declination (δ)
    const dec = equatorial.dec;

    // Azimuth (A)
    const azimuth = horizontal.azimuth;

    // Altitude (α)
    const altitude = horizontal.altitude;

    // Displaying the values to the screen...

    el['ecliptic-lng'].innerHTML = `${round(ecliptic_lng)}`;
    el['mean-anom'].innerHTML = `${round(_mean_anom)}`;
    el.obliquity.innerHTML = `${round(_obliquity)}`;
    el.asc.innerHTML = `${asc.hour()}°${asc.minute()}'${round(asc.second())}`;
    el.dec.innerHTML = `${dec.hour()}°${dec.minute()}'${round(dec.second())}`;
    el.azimuth.innerHTML = `${azimuth.hour()}°${azimuth.minute()}'${round(azimuth.second())}`;
    el.altitude.innerHTML = `${altitude.hour()}°${altitude.minute()}'${round(altitude.second())}`;
  } catch (err) {
    console.warn(err);
  }
}
// END OF: _calc_sun_position()

/**
 * @private
 * @function
 */
function round(num) {
  return Math.round(num * ROUND_DIGITS) / ROUND_DIGITS;
}

/**
 * @private
 * @function
 */
function is_empty(val) {
  return typeof val === 'undefined' || val === null;
}

/**
 * Get input values (except for 'city' and 'city-names'), and returns a collection.
 * @private
 * @function
 */
function get_values() {
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
