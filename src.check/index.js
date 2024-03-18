/**
 * This is for checking, and it runs on
 * my demo page.
 *
 * @module sowngwala/check
 */

import { INPUT_ELEM_KEYS, ELEM_KEYS } from './constants';

import {
  add_cities,
  debounce,
  fill_dates,
  find_geo,
  get_values,
  round,
} from './lib';

// Stores all the DOM elements
const el = {};

// Sowngwala functions to be later
// dyanamically loaded into
// the program.

let GeoCoord;
let Longitude;
let Latitude;
let NaiveDateTime;
let utc_from_local_geo;
let sun_pos_horizontal;

let ready = false;

// Debouncing event listeners

const event_handlers = {
  find_geo_from_city: debounce(_find_geo_from_city, 1000),
  calc_sun_position: debounce(_calc_sun_position, 1000),
};

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

  // Import functions dynamically.
  ({ Longitude, Latitude, GeoCoord } = Sowngwala.coords);
  ({ NaiveDateTime } = Sowngwala.chrono);
  ({ utc_from_local_geo } = Sowngwala.time);
  ({ sun_pos_horizontal } = Sowngwala.sun);

  // Add event listeners for inputs.
  // For normal inputs, we want to
  // calculate for the sun's position.
  // But, when user selects the city,
  // we want to get latitude and
  // longitude for the city.
  INPUT_ELEM_KEYS.forEach(key => {
    const handler =
      key.indexOf('city') > -1
        ? event_handlers.find_geo_from_city
        : event_handlers.calc_sun_position;

    el[key].addEventListener('input', handler);
    el[key].addEventListener('propertychange', handler);
  });

  fill_dates(el);

  await add_cities(el);

  ready = true;
  console.log('Ready to proceed');

  _find_geo_from_city();
};

/**
 * This is an event listener when user
 * selects a city. When it happens,
 * we will find the city's latitude
 * and longitude.
 *
 * @private
 * @function
 */
function _find_geo_from_city() {
  if (!ready) {
    console.warn('Not ready');
    return;
  }

  const geo = find_geo(el.city.value);

  if (geo) {
    el['lat'].value = geo.lat;
    el['lat-bound'].value = geo.lat_bound;
    el['lng'].value = geo.lng;
    el['lng-bound'].value = geo.lng_bound;
    _calc_sun_position();
  }
}

/**
 * This is another event listener.
 * When any of the input value change,
 * we want to calculate the position
 * of the sun.
 *
 * @private
 * @function
 */
function _calc_sun_position() {
  if (!ready) {
    console.warn('Not ready');
    return;
  }

  try {
    const vals = get_values(el);

    if (!vals) {
      console.warn('Not all values are filled');
      return;
    }

    const geo = GeoCoord({
      lat: Latitude({
        degrees: vals.lat,
        bound: vals['lat-bound'],
      }),
      lng: Longitude({
        degrees: vals.lng,
        bound: vals['lng-bound'],
      }),
    });

    const local = NaiveDateTime.from_ymd_hms(
      vals.year,
      vals.month,
      vals.day,
      vals.hour,
      vals.min,
      vals.sec
    );

    const utc = utc_from_local_geo(local, geo);

    const {
      coord: horizontal,
      _equatorial,
      _ecliptic,
      _mean_anom,
      _obliquity,
    } = sun_pos_horizontal(utc, geo);

    // --------------------------------
    // Ecliptic
    // --------------------------------

    // Longitude (λ)
    el['ecliptic-lng'].innerHTML = round(_ecliptic.lng);

    // Mean anomaly (M)
    el['mean-anom'].innerHTML = round(_mean_anom);

    // Mean obliquity (ε)
    el['obliquity'].innerHTML = round(_obliquity);

    // --------------------------------
    // Equatorial
    // --------------------------------

    // Right Ascension (α)
    el.asc.innerHTML = _equatorial.asc.print();

    // Declination (δ)
    el.dec.innerHTML = _equatorial.dec.print();

    // --------------------------------
    // Horizontal
    // --------------------------------

    // Azimuth (A)
    el.azimuth.innerHTML = horizontal.azimuth.print();

    // Altitude (α)
    el.altitude.innerHTML = horizontal.altitude.print();
  } catch (err) {
    console.warn(err);
  }
}
