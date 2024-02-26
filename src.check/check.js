/**
 * This is only for a check
 *
 * @module sowngwala/check
 */
import moment from 'moment';

export const start = () => {
  if (typeof Sowngwala === 'undefined')
    throw new Error("Can't find Sowngwala");

  const { sun_pos_equatorial } = Sowngwala.sun;

  // You want to know the sun's position
  // for July 1, 1988 in the  Equatorial
  // coordinate system which is comprised
  // of "right ascension (α)" and
  // "declination (δ)".
  const utc = moment(Date.UTC(1988, 7 - 1, 27)).utc();
  const coord = sun_pos_equatorial(utc);

  const asc = coord.asc; // right ascension (α)
  const dec = coord.dec; // declination (δ)

  const asc_hms = `${asc.hour()}°${asc.minute()}'${asc.second()}"`;
  const dec_hms = `${dec.hour()}°${dec.minute()}'${dec.second()}"`;

  console.log('[check] asc:', asc_hms); // 8°26'4.0
  console.log('[check] dec:', dec_hms); // 19°12'42.5
};
