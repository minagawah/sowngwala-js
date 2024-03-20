/**
 * @module sowngwala/check/controllers/event_listener
 */

import { debounce, round } from '../utils';
import { get_city_list } from '../get_city_list';
import { geo_from_row } from '../geo_from_row';

/**
 * A factory to create a controller for
 * event listeners. As you can see,
 * 'register_listeners' is the only
 * method publicly exposed.
 * @private
 * @function
 */
export function create_event_listener_controller(dom) {
  const find_geo_from_city = debounce(
    _find_geo_from_city,
    1000
  );

  const calc_sun_position = debounce(
    _calc_sun_position,
    1000
  );

  /*
   * There is a problem in this
   * controller which needs to be
   * addressed. It is associated with
   * a click on the suggestion box.
   *
   * When users enters a city name
   * in 'city' input, the program will
   * look for the city. If several
   * matches were found, we show the
   * suggestion box populated with
   * a list of suggested cities.
   *
   * On the other hand, we have another
   * event listener 'onfocusout' for
   * 'city' input. When focus "out"
   * of the 'city' input, it should
   * close the suggestion box.
   *
   * However, the problem arises as
   * users click on the suggestion box
   * to select a city. Obviously, the
   * user indends to choose a city.
   * Yet, it triggers 'onfocusout'
   * because it also means the click
   * being out of focus. Since the
   * suggestion box is now closed,
   * there is no way for the user to
   * select any cities from the box...
   *
   * To prevent this, we need to know
   * if the user is clicking on the
   * suggestion box. If clicking
   * outside the box, we can safely
   * close the suggestion box. If it
   * was over the suggestion box,
   * the user is attempting to select
   * a city from the box, and we don't
   * want the suggestion box to close.
   *
   * That's why we have
   * 'is_clicking_over_suggestion_box'
   * which is a flag to determine
   * whether the user is clicking over
   * the suggestion box, or not.
   *
   * We have a click listener on 'body',
   * and when clicked, it will find out
   * where the user clicking. Only when
   * clicked outside the suggestion box,
   * will we allow 'onfocusout' to fire,
   * to close the box.
   *
   * @private
   * @function
   */

  /*
   * An array to store all the click
   * listeners for cities suggested
   * in the suggestion box.
   * When the suggestion box closes,
   * all the listeners stored here
   * will be removed.
   */
  const city_click_handlers = [];

  /*
   * This is a flag to let you know if
   * the user is clicking over the city
   * suggestion box. The detection is
   * done when clicked on 'body'.
   * Without this, users will not be
   * able to select a city.
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
     * Addling event listeners for form
     * inputs. Normally, we would run
     * 'calc_sun_position' to calculate
     * the sun's position. Yet, when the
     * input value changes on 'city',
     * we would run 'find_geo_from_city'.
     */
    dom.get_input_elem_keys().forEach(key => {
      const handler =
        key === 'city'
          ? find_geo_from_city
          : calc_sun_position;

      const el = dom.get(key);
      el.addEventListener('input', handler);
      el.addEventListener('propertychange', handler);
    });

    /*
     * Adding a click listener on 'body'.
     * We will find out where the user
     * is clicking.
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
     * Adding 'onfocusout' for 'city'
     * input. When focus out of 'city',
     * we would close the suggestion box.
     * Yet, we don't want the box to
     * close if the user is clicking
     * over the box.
     */
    dom.get('city').addEventListener('focusout', () => {
      /*
       * We need to first wait for
       * 'body' to check if the click
       * was outside the suggestion box.
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
   * It will search for the city.
   * When multiple matches were found,
   * we would show the suggestion box
   * filled with the matches.
   * If the exact match is found,
   * we would begin calculating the
   * sun's position.
   *
   * @private
   * @function
   */
  function _find_geo_from_city() {
    _find_geo_aux();
  }

  /**
   * @private
   * @function
   * @param {string} [name] - Notice 'name' will not come for the first time. It will explicitly be specified when called from within.
   */
  function _find_geo_aux(name) {
    // Remove all the click listeners
    // previously created.
    remove_city_click_handlers();

    // Remove the previous suggestions.
    dom.clear_suggestion_box();

    const city_name = name || dom.get('city')?.value;
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
      console.log(`Found: ${city_name}`);

      const row = city_list[0];
      dom.fill_city_input(city_name);
      dom.fill_geo_inputs(geo_from_row(row));

      calc_sun_position();
    } else if (found > 1) {
      // Multiple matches were found
      console.log(`Found ${found} cities`);

      /*
       * Create a list of DOM elements
       * out of suggested cities.
       * We would show them in the
       * suggestion box.
       */
      const elements = city_list.map(city => {
        const name = city[0];
        const elem = dom.create_new_city_link(name);

        // A click listener for each city.
        const onclick = () => {
          dom.clear_suggestion_box();
          dom.fill_city_input(name);

          /**
           * When clicking on the city,
           * we would search for the
           * city. Notice, for this time,
           * we explicitly pass the name
           * of the city.
           */
          _find_geo_aux(name);
        };

        elem.addEventListener('click', onclick);
        city_click_handlers.push(onclick);

        return elem;
      });

      dom.show_suggestion_box(elements);
    }
  }
  // END OF: _find_geo_aux()

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
      } = Sowngwala.sun.sun_pos_horizontal(utc, geo);

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
        equatorial_asc: _equatorial.asc.print(),

        // Declination (δ)
        equatorial_dec: _equatorial.dec.print(),

        // --------------------------------
        // Horizontal
        // --------------------------------

        // Azimuth (A)
        horizontal_azimuth: horizontal.azimuth.print(),

        // Altitude (α)
        horizontal_altitude: horizontal.altitude.print(),
      });
      // END OF: dom.fill_sun_inputs()
    } catch (err) {
      console.warn(err);
    }
  }
  // END OF: _calc_sun_position()
}
