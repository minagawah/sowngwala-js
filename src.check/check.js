/**
 * This is only for a check
 *
 * @module sowngwala/check
 */
import moment from 'moment';
import { debounce } from './utils';

const ELEM_KEYS = [
  'year',
  'month',
  'day',
  'hour',
  'min',
  'sec',
  'lng',
  'asc',
  'dec',
];

const INPUT_ELEM_KEYS = ELEM_KEYS.filter(
  key => key !== 'lng' && key !== 'asc' && key !== 'dec'
);

const ROUND_DIGITS = 1000;

const el = {};

const onchange = debounce(event_handler, 1000);

let equatorial_from_ecliptic_with_generic_datetime;
let sun_pos_ecliptic;

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
    ({ equatorial_from_ecliptic_with_generic_datetime } =
      Sowngwala.coords);
    ({ sun_pos_ecliptic } = Sowngwala.sun);

    INPUT_ELEM_KEYS.forEach(key => {
      el[key].addEventListener('input', onchange);
      el[key].addEventListener('propertychange', onchange);
    });

    onchange();
  }
};

function event_handler() {
  try {
    let ok = 1;

    const vals = INPUT_ELEM_KEYS.reduce((acc, key) => {
      let val = el[key].value || 0;
      if (!val) {
        ok *= 0;
      }
      acc[key] = val;
      return acc;
    }, {});

    if (!ok) return;

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

    // console.log('utc:', utc);

    const coord = sun_pos_ecliptic(utc);

    // Ecliptic "longitude (λ)"
    const { lng } = coord;

    const coord2 =
      equatorial_from_ecliptic_with_generic_datetime(
        { lat: 0.0, lng },
        utc
      );

    // Equatorial "right ascension (α)"
    const asc = coord2.asc;

    // Equatorial "declination (δ)"
    const dec = coord2.dec;

    // console.log('asc:', asc);
    // console.log('dec:', dec);

    const lng_fixed =
      Math.round(lng * ROUND_DIGITS) / ROUND_DIGITS;

    const asc_fixed =
      Math.round(asc.second() * ROUND_DIGITS) /
      ROUND_DIGITS;

    const dec_fixed =
      Math.round(dec.second() * ROUND_DIGITS) /
      ROUND_DIGITS;

    console.log('asc.sec:', asc.second());
    console.log('dec.sec:', dec.second());

    el.lng.innerHTML = `${lng_fixed}°`;
    el.asc.innerHTML = `${asc.hour()}°${asc.minute()}'${asc_fixed}"`;
    el.dec.innerHTML = `${dec.hour()}°${dec.minute()}'${dec_fixed}"`;
  } catch (err) {
    console.warn(err);
  }
}
