/**
 * @module sowngwala/check/controllers/event_listener
 */

import { INPUT_ELEM_KEYS } from './dom_element';
import { debounce, round } from '../utils';
import { get_city_list } from '../get_city_list';
import { geo_from_row } from '../geo_from_row';

/**
 * A factory to create a controller for
 * event listeners. As you can see,
 * 'register_listeners' is the only
 * method publicly exposed.
 *
 * @private
 * @function
 */
export function create_event_listener_controller(dom) {
  /*
   * An event listener for finding
   * cities when input value changes
   * for 'city' input.
   */
  const find_geo_from_city = debounce(
    _find_geo_from_city,
    1000
  );

  /*
   * An event listener for calculating
   * the position of the sun.
   */
  const calc_sun_position = debounce(
    _calc_sun_position,
    1000
  );

  /*
   * There is a problem with this
   * controller which needs to be
   * addressed. When a user attempts
   * to select a city from the city
   * list shown in the suggestion box,
   * the suggestion box closes, and
   * the user is not able to select
   * any cities.
   *
   * This is because we have an event
   * listener 'focusout' on a form
   * input for 'city'. When the user
   * select a city in the suggestion
   * box, it also means the click was
   * made outside 'city' input. So,
   * before even start carrying out
   * the search for the city given,
   * it closes the suggestion box.
   *
   * To prevent, we have a flag
   * 'is_clicking_over_suggestion_box'
   * which is a flag to tell you
   * if the user has clicked over the
   * suggestion box, or not.
   * Therefore, you will see bellow
   * that we have a click listener
   * attached to 'body' where we try
   * to find where the user clicked
   * on the page. If the click was
   * outside the box, we can safely
   * close the box. Yet, if the click
   * was made on the suggestion box,
   * it means, the user wanted to
   * select a city from the list,
   * and we are not closing the box.
   */

  /*
   * This is an array storing all the
   * click handlers created for cities.
   * When the suggestion box closes,
   * we will remove all the handlers.
   */
  const city_click_handlers = [];

  /*
   * This is a flag to let you know
   * if the user has clicked over the
   * suggestion box.
   */
  let is_clicking_over_suggestion_box = false;

  /**
   * This is the instance created.
   * @public
   * @type {Object}
   */
  return Object.freeze({
    register_listeners,
  });

  /**
   * @protected
   * @function
   */
  function register_listeners() {
    if (typeof Sowngwala === 'undefined')
      throw new Error("Can't find Sowngwala");

    /*
     * When the input value for 'city'
     * changes, we run 'find_geo_from_city'.
     * Otherwise, we normally run
     * 'calc_sun_position'.
     */
    INPUT_ELEM_KEYS.forEach(key => {
      const handler =
        key === 'city'
          ? find_geo_from_city
          : calc_sun_position;

      const el = dom.get(key);
      el.addEventListener('input', handler);
      el.addEventListener('propertychange', handler);
    });

    /*
     * When 'body' is clicked, we will
     * find out the click position.
     */
    dom.get('body').addEventListener(
      'click',
      e => {
        is_clicking_over_suggestion_box =
          dom.check_click_for_suggestion_box(e);
      },
      true
    );

    /*
     * When focused out of 'city' input,
     * we would close the suggestion
     * box. Except, when the click was
     * over the suggestion box, we will
     * not close the box.
     */
    dom.get('city').addEventListener('focusout', () => {
      /*
       * We need to wait until
       * we figure out where the
       * user has clicked.
       */
      setTimeout(() => {
        if (is_clicking_over_suggestion_box !== true) {
          dom.clear_suggestion_box();
        }
      }, 200);
    });
  }

  /**
   * @private
   * @function
   */
  function remove_city_click_handlers() {
    console.info('Removing all the click handlers');

    city_click_handlers.forEach(handler => {
      document.removeEventListener('click', handler);
    });

    city_click_handlers.length = 0;
  }

  /**
   * @private
   * @function
   */
  function _clear() {
    remove_city_click_handlers();
    dom.clear_suggestion_box();
  }

  /**
   * @private
   * @function
   */
  function _show(geo) {
    _clear();
    dom.fill_city_input(geo.city);
    dom.fill_geo_inputs(geo);
    calc_sun_position();
  }

  /**
   * Search for the given city.
   * If several maches were found,
   * we would show all the matched
   * cities in the suggestion box.
   * If only 1 match was found for
   * the city, we would begin
   * calculating the sun's position.
   *
   * @private
   * @function
   */
  function _find_geo_from_city() {
    _clear();

    const city_name = dom.get('city')?.value;
    const city_list = city_name
      ? get_city_list(city_name)
      : [];

    const found = city_list.length;

    if (!city_name) {
      // No city
      console.warn('No city name');

      dom.clear_geo_inputs();
    } else if (found === 0) {
      // No matches
      console.warn('No city suggestions');

      dom.clear_geo_inputs();
    } else if (found === 1) {
      // Found the exact match
      console.log(`Found: ${city_list[0][0]}`);

      _show(geo_from_row(city_list[0]));
    } else if (found > 1) {
      // Multiple matches were found
      console.log(`Found ${found} cities`);

      /*
       * The suggestion box will be
       * populated with all the cities
       * found on the search. We need
       * to create all the DOM elements
       * for these cities, and each of
       * them needs a click listener.
       */
      const elems = city_list.map(city => {
        const geo = geo_from_row(city);
        const el = dom.create_new_city_link(geo.city);
        const onclick = () => {
          _show(geo);
        };
        el.addEventListener('click', onclick);
        city_click_handlers.push(onclick);
        return el;
      });

      dom.show_suggestion_box(elems);
    }
  }
  // END OF: _find_geo_aux()

  /**
   * Calculates the position of the sun.
   *
   * @private
   * @function
   */
  function _calc_sun_position() {
    try {
      const vals = dom.get_values();
      if (!vals) {
        console.warn('Not all values are filled');
        return;
      }

      const geo = Sowngwala.coords.GeoCoord({
        lat: Sowngwala.coords.Latitude({
          degrees: vals.lat,
          bound: vals['lat-bound'],
        }),
        lng: Sowngwala.coords.Longitude({
          degrees: vals.lng,
          bound: vals['lng-bound'],
        }),
      });

      const local =
        Sowngwala.chrono.NaiveDateTime.from_ymd_hms(
          vals.year,
          vals.month,
          vals.day,
          vals.hour,
          vals.min,
          vals.sec
        );

      const utc = Sowngwala.time.utc_from_local_geo(
        local,
        geo
      );

      const {
        coord: horizontal,
        _equatorial,
        _ecliptic,
        _mean_anom,
        _obliquity,
      } = Sowngwala.sun.sun_horizontal_from_generic_datetime(
        utc,
        geo
      );

      dom.fill_sun_inputs({
        // --------------------------------
        // Ecliptic
        // --------------------------------

        // Longitude (λ)
        ecliptic_lng: round(_ecliptic.lng),

        // Mean anomaly (M)
        mean_anom: round(_mean_anom),

        // Mean obliquity (ε)
        obliquity: round(_obliquity),

        // --------------------------------
        // Equatorial
        // --------------------------------

        // Right Ascension (α)
        asc: _equatorial.asc.print(),

        // Declination (δ)
        dec: _equatorial.dec.print(),

        // --------------------------------
        // Horizontal
        // --------------------------------

        // Azimuth (A)
        azimuth: horizontal.azimuth.print(),

        // Altitude (α)
        altitude: horizontal.altitude.print(),
      });
      // END OF: dom.fill_sun_inputs()
    } catch (err) {
      console.warn(err);
    }
  }
  // END OF: _calc_sun_position()
}
