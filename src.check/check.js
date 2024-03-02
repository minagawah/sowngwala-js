/**
 * This is only for a check
 *
 * @module sowngwala/check
 */
import moment from 'moment';
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

const onchange = debounce(event_handler, 1000);

let GeoCoord;
let Longitude;
let Latitude;
let sun_pos_equatorial;
let horizontal_from_equatorial;

export const start = () => {
  if (typeof Sowngwala === 'undefined')
    throw new Error("Can't find Sowngwala");

  ELEM_KEYS.forEach(key => {
    el[key] = document.querySelector(`#${key}`);
  });

  let ok = 1;

  ELEM_KEYS.forEach(key => {
    el[key] = document.querySelector(`#${key}`);
    if (!el[key]) {
      ok *= 0;
    }
  });

  if (ok) {
    ({
      Longitude,
      Latitude,
      GeoCoord,
      horizontal_from_equatorial,
    } = Sowngwala.coords);

    ({ sun_pos_equatorial } = Sowngwala.sun);

    INPUT_ELEM_KEYS.forEach(key => {
      el[key].addEventListener('input', onchange);
      el[key].addEventListener('propertychange', onchange);
    });

    onchange();
  }
};

function event_handler() {
  try {
    const vals = get_values();
    if (!vals) return;

    const utc = moment(
      Date.UTC(
        vals.year,
        vals.month - 1,
        vals.day,
        vals.hour,
        vals.min,
        vals.sec
      )
    ).utc();

    const {
      // Equatorial
      coord: equa_coord,
      // Ecliptic
      _ecliptic: ecli_coord,
      // Mean anomaly (M)
      _mean_anom,
      // Mean obliquity of the ecliptic (ε)
      _obliquity,
    } = sun_pos_equatorial(utc);

    // Ecliptic "longitude (λ)"
    const ecliptic_lng = ecli_coord.lng;

    // "right ascension (α)" (in the Equatorial)
    const asc = equa_coord.asc;

    // "declination (δ)" (in the Equatorial)
    const dec = equa_coord.dec;

    const geo_coord = GeoCoord({
      lat: Latitude({
        degrees: vals.lat,
        bound: vals['lat-bound'],
      }),
      lng: Longitude({
        degrees: vals.lng,
        bound: vals['lng-bound'],
      }),
    });

    const {
      coord: {
        // Azimuth (A)
        azimuth,
        // Altitude (α)
        altitude,
      },
    } = horizontal_from_equatorial(
      utc,
      equa_coord,
      geo_coord
    );

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

function get_values() {
  let ok = 1;

  const vals = INPUT_ELEM_KEYS.reduce((acc, key) => {
    let val = el[key].value || 0;
    if (!val) {
      ok *= 0;
    }
    acc[key] = val;
    return acc;
  }, {});

  return ok ? vals : null;
}
