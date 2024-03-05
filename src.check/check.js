/**
 * This is only for a check
 *
 * @module sowngwala/check
 */
import { debounce } from './utils';

const INPUT_ELEM_KEYS = [
  'year',
  'month',
  'day',
  'hour',
  'min',
  'sec',
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

const ROUND_DIGITS = 10000;

const el = {};

// Debounce the event listener
const onchange = debounce(event_handler, 1000);

// Sowngwala functions to be dynamically imported
let GeoCoord;
let Longitude;
let Latitude;
let NaiveDateTime;
let utc_from_local_geo;
let sun_pos_horizontal;

/**
 * Executed once the page is ready.
 */
export const start = () => {
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

  if (ok) {
    // Import Sowngwala's functions dynamically.
    ({ Longitude, Latitude, GeoCoord } = Sowngwala.coords);
    ({ NaiveDateTime } = Sowngwala.chrono);
    ({ utc_from_local_geo } = Sowngwala.time);
    ({ sun_pos_horizontal } = Sowngwala.sun);

    // Add event listeners for inputs
    INPUT_ELEM_KEYS.forEach(key => {
      el[key].addEventListener('input', onchange);
      el[key].addEventListener('propertychange', onchange);
    });

    onchange();
  }
};

/**
 * Calculates when data changes.
 */
function event_handler() {
  try {
    const vals = get_values();
    if (!vals) {
      console.warn('No input values?');
      return;
    }

    const lat = Latitude({
      degrees: vals.lat,
      bound: vals['lat-bound'],
    });

    const lng = Longitude({
      degrees: vals.lng,
      bound: vals['lng-bound'],
    });

    const geo = GeoCoord({ lat, lng });

    // -------------------------------------
    // Local --> GST Time --> UTC Time --> UTC
    // -------------------------------------

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

    // Truncating decimals for some values...

    const ecliptic_lng_fixed =
      Math.round(ecliptic_lng * ROUND_DIGITS) /
      ROUND_DIGITS;

    const asc_fixed =
      Math.round(asc.second() * ROUND_DIGITS) /
      ROUND_DIGITS;

    const dec_fixed =
      Math.round(dec.second() * ROUND_DIGITS) /
      ROUND_DIGITS;

    const azimuth_fixed =
      Math.round(azimuth.second() * ROUND_DIGITS) /
      ROUND_DIGITS;

    const altitude_fixed =
      Math.round(altitude.second() * ROUND_DIGITS) /
      ROUND_DIGITS;

    // Displaying the values to the screen...

    el['ecliptic-lng'].innerHTML = `${ecliptic_lng_fixed}°`;
    el['mean-anom'].innerHTML = `${_mean_anom}°`;
    el.obliquity.innerHTML = `${_obliquity}`;
    el.asc.innerHTML = `${asc.hour()}°${asc.minute()}'${asc_fixed}`;
    el.dec.innerHTML = `${dec.hour()}°${dec.minute()}'${dec_fixed}`;
    el.azimuth.innerHTML = `${azimuth.hour()}°${azimuth.minute()}'${azimuth_fixed}`;
    el.altitude.innerHTML = `${altitude.hour()}°${altitude.minute()}'${altitude_fixed}`;
  } catch (err) {
    console.warn(err);
  }
}

/**
 * Get input values, and returns a collection.
 */
function get_values() {
  let ok = 1;

  const vals = INPUT_ELEM_KEYS.reduce((acc, key) => {
    let val;
    if (key.indexOf('bound') > -1) {
      val = el[key].value;
    } else {
      val = Number(el[key].value || 0);
    }
    if (typeof val === 'undefined' || val === null) {
      ok *= 0;
    }
    acc[key] = val;
    return acc;
  }, {});

  return ok ? vals : null;
}
