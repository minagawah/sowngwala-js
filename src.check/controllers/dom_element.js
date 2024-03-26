/**
 * @module sowngwala/check/controllers/dom_element
 */

import {
  is_nullish,
  kebab_from_snake,
  naive_date_from_date,
} from '../utils';

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
   * Stores all DOM elements to 'el'.
   * @protected
   * @function
   */
  function register_elements() {
    let ok = 1;
    /*
     * 'body' is special.
     * It is used only when
     * checking for users'
     * click position.
     */
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
   * Extracts all entries from inputs,
   * and return them as a collection.
   * If any of them have invalid values,
   * returns 'null'.
   * @protected
   * @function
   */
  function get_values() {
    let ok = 1;
    const res = INPUT_ELEM_KEYS.reduce((acc, key) => {
      const chk = el[key].value;
      let val;
      if (key.indexOf('bound') > -1) {
        // Check for 'lat_bound' or 'lng_bound'.
        if (chk !== '-') {
          val = chk;
        }
      } else if (!is_nullish(chk)) {
        // Change it to the numeric value.
        val = Number(chk || 0);
      }
      // Warn if values are missing.
      if (is_nullish(val)) {
        console.warn(`"${key}" is missing`);
        ok *= 0;
      }
      acc[key] = val;
      return acc;
    }, {});
    return ok ? res : null;
  }

  /**
   * Checks if the user has clicked
   * over the suggestion box.
   * @protected
   * @function
   */
  function check_click_for_suggestion_box(pos) {
    const { x, y, width, height } =
      el.suggestion.getBoundingClientRect();
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
   * Show a suggestion box populated
   * with a given list of cities.
   * @protected
   * @function
   */
  function show_suggestion_box(cities) {
    const height = el.city.getBoundingClientRect()?.height;
    if (height && cities.length > 0) {
      const box = el.suggestion;
      cities.forEach(el => {
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
    el.suggestion.innerHTML = '';
    el.suggestion.style.display = 'hidden';
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
    ['lat', 'lat_bound', 'lng', 'lng_bound'].forEach(
      key => {
        el[kebab_from_snake(key)].value = geo[key];
      }
    );
  }

  /**
   * @protected
   * @function
   */
  function fill_city_input(name) {
    el.city.value = name;
  }

  /**
   * Fill input forms with current date.
   * @protected
   * @function
   */
  function fill_dates() {
    const naive = naive_date_from_date(new Date());
    Object.keys(naive).forEach(key => {
      el[key].value = naive[key];
    });
  }

  /**
   * @protected
   * @function
   */
  function fill_sun_inputs(o) {
    [
      'ecliptic_lng',
      'mean_anom',
      'obliquity',
      'asc',
      'dec',
      'azimuth',
      'altitude',
    ].forEach(key => {
      el[kebab_from_snake(key)].innerHTML = o[key];
    });
  }
}
