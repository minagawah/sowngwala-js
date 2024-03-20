/**
 * @module sowngwala/check/controllers/dom_element
 */

import { is_nullish } from '../utils';

export const INPUT_CITY_KEY = 'city';

export const INPUT_ELEM_KEYS = [
  'year',
  'month',
  'day',
  'hour',
  'min',
  'sec',
  'city',
  'lat',
  'lat-bound',
  'lng',
  'lng-bound',
];

export const ELEM_KEYS = [
  ...INPUT_ELEM_KEYS,
  'suggestion',
  'ecliptic-lng',
  'mean-anom',
  'obliquity',
  'asc',
  'dec',
  'azimuth',
  'altitude',
];

/**
 * @private
 * @function
 */
export function create_dom_element_controller() {
  const el = {};

  /**
   * This is the instance created.
   * @public
   * @type {Object}
   */
  return Object.freeze({
    get: key => el[key],
    get_input_elem_keys: () => INPUT_ELEM_KEYS,
    register_elements,
    get_values,
    check_click_for_suggestion_box,
    create_new_city_link,
    show_suggestion_box,
    clear_suggestion_box,
    clear_geo_inputs,
    fill_geo_inputs,
    fill_city_input,
    fill_dates,
    fill_sun_inputs,
  });

  /**
   * @protected
   * @function
   */
  function register_elements() {
    let ok = 1;

    // This is not included in
    // ELEM_KEYS because it is
    // used only when finding
    // the user's click position.
    el.body = document.body;

    ELEM_KEYS.forEach(key => {
      el[key] = document.querySelector(`#${key}`);
      if (!el[key]) {
        ok *= 0;
      }
    });

    if (!ok)
      throw new Error(
        'Something is wrong with DOM elements'
      );
    return true;
  }

  /**
   * Get all the form entries (inputs),
   * make it into a collection, and
   * return it. However, it will not
   * contain the inputs for 'city'
   * and 'city-names').
   *
   * @protected
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
      } else if (!is_nullish(chk)) {
        val = Number(chk || 0);
      }

      if (is_nullish(val)) {
        console.warn(`"${key}" is missing`);
        ok *= 0;
      }

      acc[key] = val;
      return acc;
    }, {});

    return ok ? vals : null;
  }

  /**
   * We want to check if the user is
   * clicking over the suggestion box.
   * @protected
   * @function
   */
  function check_click_for_suggestion_box(pos) {
    const box = el['suggestion'].getBoundingClientRect();
    const { x, y, width, height } = box;

    return (
      pos.x > x &&
      pos.x < x + width &&
      pos.y > y &&
      pos.y < y + height
    );
  }

  /**
   * @protected
   * @function
   * @param {string} city_name
   * @returns {HTMLElement}
   */
  function create_new_city_link(city_name) {
    const div = document.createElement('div');
    const a = document.createElement('a');
    a.innerHTML = city_name;
    div.appendChild(a);
    div.style.cursor = 'pointer';
    return div;
  }

  /**
   * Right bellow the city input, append
   * a list of suggested cities.
   * @protected
   * @function
   */
  function show_suggestion_box(city_elements) {
    const { height } = document
      .querySelector('#city')
      .getBoundingClientRect();

    if (city_elements.length > 0) {
      const box = el['suggestion'];

      city_elements.forEach(el => {
        box.appendChild(el);
      });

      box.style.top = `${height}px`;
      box.style.display = 'block';
    }
  }

  /**
   * @protected
   * @function
   */
  function clear_suggestion_box() {
    console.log('Clearing the suggestion box');
    el['suggestion'].innerHTML = '';
    el['suggestion'].style.display = 'hidden';
  }

  /**
   * @protected
   * @function
   */
  function clear_geo_inputs() {
    fill_geo_inputs({
      lat: '',
      lat_bound: '',
      lng: '',
      lng_bound: '',
    });
  }

  /**
   * @protected
   * @function
   */
  function fill_geo_inputs(geo) {
    el['lat'].value = geo.lat;
    el['lat-bound'].value = geo.lat_bound;
    el['lng'].value = geo.lng;
    el['lng-bound'].value = geo.lng_bound;
  }

  /**
   * @protected
   * @function
   */
  function fill_city_input(city_name) {
    el['city'].value = city_name;
  }

  /**
   * Fill input forms with current date.
   * @protected
   * @function
   */
  function fill_dates() {
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
      if (!is_nullish(value)) {
        if (key === 'month') value++;
        el[key].value = value;
      }
    });
  }

  /**
   * @protected
   * @function
   */
  function fill_sun_inputs(sun) {
    // Longitude (λ)
    el['ecliptic-lng'].innerHTML = sun.ecliptic_lng;

    // Mean anomaly (M)
    el['mean-anom'].innerHTML = sun.mean_anom;

    // Mean obliquity (ε)
    el['obliquity'].innerHTML = sun.obliquity;

    // --------------------------------
    // Equatorial
    // --------------------------------

    // Right Ascension (α)
    el.asc.innerHTML = sun.equatorial_asc;

    // Declination (δ)
    el.dec.innerHTML = sun.equatorial_dec;

    // --------------------------------
    // Horizontal
    // --------------------------------

    // Azimuth (A)
    el.azimuth.innerHTML = sun.horizontal_azimuth;

    // Altitude (α)
    el.altitude.innerHTML = sun.horizontal_altitude;
  }
}
