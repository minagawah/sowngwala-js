/**
 * This is for checking the library
 * on the test page. You see
 * the same thing implemented in
 * one of the unit tests:
 * src/coords/__tests__/equatorial_from_ecliptic.spec.js
 *
 * @module sowngwala/check
 */
import moment from 'moment';

export const start = () => {
  if (typeof Sowngwala === 'undefined' || !Sowngwala.lib)
    throw new Error("Can't find Sowngwala");

  const { lib } = Sowngwala.lib;

  const { pos_equatorial_from_generic_date } = lib.sun;

  // You want to know the sun's position
  // for July 1, 1988 in the  Equatorial
  // coordinate system which is comprised
  // of "right ascension (α)" and
  // "declination (δ)".
  const utc = moment(Date.UTC(1988, 7 - 1, 27)).utc();
  const coord = pos_equatorial_from_generic_date(utc);

  const asc = coord.asc; // right ascension (α)
  const dec = coord.dec; // declination (δ)

  const asc_hms = `${asc.hour()}°${asc.minute()}'${asc.second()}"`;
  const dec_hms = `${dec.hour()}°${dec.minute()}'${dec.second()}"`;

  console.log('[check] asc:', asc_hms); // 8°26'4.0
  console.log('[check] dec:', dec_hms); // 19°12'42.5

  // const { EcliCoord, equatorial_from_ecliptic } = lib.coords;
  // const { decimal_hours_from_hms } = lib.time;
  //
  // const oblique = 23.441_884;
  //
  // const lat_0_dec = decimal_hours_from_hms(4, 52, 31.0);
  // const lng_0_dec = decimal_hours_from_hms(139, 41, 10.0);
  //
  // const coord_0 = EcliCoord({
  //   lat: lat_0_dec,
  //   lng: lng_0_dec,
  // });
  //
  // const coord = equatorial_from_ecliptic(coord_0, oblique);
  //
  // const asc = coord.asc; // right ascension (α)
  // const dec = coord.dec; // declination (δ)
  //
  // const asc_hms = `${asc.hour()}°${asc.minute()}'${asc.second()}"`;
  // const dec_hms = `${dec.hour()}°${dec.minute()}'${dec.second()}"`;
  //
  // console.log('[check] asc:', asc_hms); // 9°34'53.58
  // console.log('[check] dec:', dec_hms); // 19°32'14.16
};
