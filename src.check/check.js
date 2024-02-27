/**
 * This is only for a check
 *
 * @module sowngwala/check
 */
import moment from 'moment';
import { debounce } from './utils';

const ROUND_DIGITS = 1000;

const el = {};

let equatorial_from_ecliptic_with_generic_date;
let sun_pos_ecliptic;

export const start = () => {
  if (typeof Sowngwala === 'undefined')
    throw new Error("Can't find Sowngwala");

  el.year = document.querySelector('#year');
  el.month = document.querySelector('#month');
  el.date = document.querySelector('#date');
  el.asc = document.querySelector('#asc');
  el.dec = document.querySelector('#dec');

  let ok = 1;

  ['year', 'month', 'date', 'lng', 'asc', 'dec'].forEach(
    key => {
      el[key] = document.querySelector(`#${key}`);
      if (!el[key]) {
        ok *= 0;
      }
    }
  );

  if (ok) {
    ({ equatorial_from_ecliptic_with_generic_date } =
      Sowngwala.coords);
    ({ sun_pos_ecliptic } = Sowngwala.sun);

    ['year', 'month', 'date'].forEach(key => {
      el[key].addEventListener(
        'change',
        debounce(onchange, 1000)
      );
    });

    onchange();
  }
};

function onchange() {
  try {
    const year = el.year.value;
    const month = el.month.value;
    const date = el.date.value;

    if (!year || !month || !date) return;

    const utc = moment(
      Date.UTC(year, month - 1, date)
    ).utc();

    const ecliptic = sun_pos_ecliptic(utc);

    // Ecliptic "longitude (λ)"
    const { lng } = ecliptic;

    const equatorial =
      equatorial_from_ecliptic_with_generic_date(
        { lat: 0.0, lng },
        utc
      );

    // Equatorial "right ascension (α)"
    const asc = equatorial.asc;

    // Equatorial "declination (δ)"
    const dec = equatorial.dec;

    const lng_fixed =
      Math.round(lng * ROUND_DIGITS) / ROUND_DIGITS;
    const asc_fixed =
      Math.round(asc.second() * ROUND_DIGITS) /
      ROUND_DIGITS;
    const dec_fixed =
      Math.round(dec.second() * ROUND_DIGITS) /
      ROUND_DIGITS;

    el.lng.innerHTML = `(Ecliptic) [lng(λ)] ${lng_fixed}°`;
    el.asc.innerHTML = `(Equatorial) [asc(α)] ${asc.hour()}°${asc.minute()}'${asc_fixed}"`;
    el.dec.innerHTML = `(Equatorial) [dec(δ)] ${dec.hour()}°${dec.minute()}'${dec_fixed}"`;
  } catch (err) {
    console.warn(err);
  }
}
