/**
 * Polynomial expressions for "delta-T"
 * provided by NASA
 *
 * When calculating the motion of
 * the moon, UT (Universal Time) is not
 * accurate enough, but needs TDT
 * (Terrestrial Dynamical Time). Earth's
 * spin around the polar axis varies in
 * time, and NASA provides a look-up
 * tables for finding, so called,
 * "delta-T" (ΔT). Yet, NASA provides
 * simplified arithmetic expressions as
 * well. Here, the program contains
 * a set of functions that are
 * translated into Rust programs.
 *
 * References:
 *
 * NASA - Delta T
 * https://eclipse.gsfc.nasa.gov/SEcat5/deltat.html
 *
 * NASA - Polynomial Expressions for Delta T
 * https://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html
 *
 * Or, TDT is explained in details in:
 * Peter Duffett-Smith, pp.22-23
 *
 *
 * @module sowngwala/delta_t
 */

import { decimal_year_from_generic_date } from './time';

/** @typedef {import('moment').Moment} Moment */

/**
 * Before the year -500, calculate:
 * ΔT = -20 + 32 * u^2
 * where: u = (y - 1820) / 100
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_before_bc500(year) {
  let u = (year - 1820.0) / 100.0;
  // -------------
  // f64.powi
  // -------------
  // https://doc.rust-lang.org/std/primitive.f64.html#method.powi
  //
  // Raises a number to an integer
  // power. Using this function is
  // generally faster than using 'powf'.
  // It might have a different sequence
  // of rounding operations than 'powf',
  // so the results are not guaranteed
  // to agree.
  return -20.0 + 32.0 * Math.pow(u, 2);
}

/**
 * Between years -500 and +500, we use
 * the data from Table 1, except that
 * for the year -500 we changed the
 * value 17190 to 17203.7 in order to
 * avoid a discontinuity with the
 * previous formula at that epoch.
 * The value for ΔT is given by
 * a polynomial of the 6th degree,
 * which reproduces the values in
 * Table 1 with an error not larger
 * than 4 seconds:
 *
 * ΔT = 10583.6 - 1014.41 * u + 33.78311 * u^2 - 5.952053 * u^3
 *   - 0.1798452 * u^4 + 0.022174192 * u^5 + 0.0090316521 * u^6
 *
 * where: u = y/100
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_bc500_to_ad500(year) {
  let u = year / 100.0;
  return (
    10583.6 -
    1014.41 * u +
    33.78311 * Math.pow(u, 2) -
    5.952053 * Math.pow(u, 3) -
    0.1798452 * Math.pow(u, 4) +
    0.022174192 * Math.pow(u, 5) +
    0.0090316521 * Math.pow(u, 6)
  );
}

/**
 * Between years +500 and +1600, we
 * again use the data from Table 1
 * to derive a polynomial of the 6th
 * degree.
 *
 * ΔT = 1574.2 - 556.01 * u + 71.23472 * u^2 + 0.319781 * u^3
 *   - 0.8503463 * u^4 - 0.005050998 * u^5 + 0.0083572073 * u^6
 *
 * where: u = (y-1000)/100
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad500_to_ad1600(year) {
  let u = (year - 1000.0) / 100.0;
  return (
    1574.2 -
    556.01 * u +
    71.23472 * Math.pow(u, 2) +
    0.319781 * Math.pow(u, 3) -
    0.8503463 * Math.pow(u, 4) -
    0.005050998 * Math.pow(u, 5) +
    0.0083572073 * Math.pow(u, 6)
  );
}

/**
 * Between years +1600 and +1700,
 * calculate for:
 * (where:  t = y - 1600)
 *
 * ΔT = 120 - 0.9808 * t - 0.01532 * t^2 + t^3 / 7129
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1600_to_ad1700(year) {
  let t = year - 1600.0;
  return (
    120.0 -
    0.9808 * t -
    0.01532 * Math.pow(t, 2) +
    Math.pow(t, 3) / 7129.0
  );
}

/**
 * Between years +1700 and +1800,
 * calculate for:
 * (where: t = y - 1700)
 *
 * ΔT = 8.83 + 0.1603 * t - 0.0059285 * t^2 + 0.00013336 * t^3 - t^4 / 1174000
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1700_to_ad1800(year) {
  let t = year - 1700.0;
  return (
    8.83 +
    0.1603 * t -
    0.0059285 * Math.pow(t, 2) +
    0.00013336 * Math.pow(t, 3) -
    Math.pow(t, 4) / 1174000.0
  );
}

/**
 * Between years +1800 and +1860,
 * calculate:
 * (where: t = y - 1800)
 *
 * ΔT = 13.72 - 0.332447 * t + 0.0068612 * t^2 + 0.0041116 * t^3 - 0.00037436 * t^4
 * + 0.0000121272 * t^5 - 0.0000001699 * t^6 + 0.000000000875 * t^7
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1800_to_ad1860(year) {
  let t = year - 1800.0;
  return (
    13.72 -
    0.332447 * t +
    0.0068612 * Math.pow(t, 2) +
    0.0041116 * Math.pow(t, 3) -
    0.00037436 * Math.pow(t, 4) +
    0.0000121272 * Math.pow(t, 5) -
    0.0000001699 * Math.pow(t, 6) +
    0.000000000875 * Math.pow(t, 7)
  );
}

/**
 * Between years 1860 and 1900,
 * calculate for:
 * (where: t = y - 1860)
 *
 * ΔT = 7.62 + 0.5737 * t - 0.251754 * t^2 + 0.01680668 * t^3
 * -0.0004473624 * t^4 + t^5 / 233174
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1860_to_ad1900(year) {
  let t = year - 1860.0;
  return (
    7.62 +
    0.5737 * t -
    0.251754 * Math.pow(t, 2) +
    0.01680668 * Math.pow(t, 3) -
    0.0004473624 * Math.pow(t, 4) +
    Math.pow(t, 5) / 233174.0
  );
}

/**
 * Between years 1900 and 1920,
 * calculate for:
 * (where: t = y - 1900)
 *
 * ΔT = -2.79 + 1.494119 * t - 0.0598939 * t^2 + 0.0061966 * t^3 - 0.000197 * t^4
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1900_to_ad1920(year) {
  let t = year - 1900.0;
  return (
    -2.79 +
    1.494119 * t -
    0.0598939 * Math.pow(t, 2) +
    0.0061966 * Math.pow(t, 3) -
    0.000197 * Math.pow(t, 4)
  );
}

/**
 * Between years 1920 and 1941,
 * calculate for:
 * (where: t = y - 1920)
 *
 * ΔT = 21.20 + 0.84493*t - 0.076100 * t^2 + 0.0020936 * t^3
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1920_to_ad1941(year) {
  let t = year - 1920.0;
  return (
    21.2 +
    0.84493 * t -
    0.0761 * Math.pow(t, 2) +
    0.0020936 * Math.pow(t, 3)
  );
}

/**
 * Between years 1941 and 1961,
 * calculate for:
 * (where: t = y - 1950)
 *
 * ΔT = 29.07 + 0.407*t - t^2/233 + t^3 / 2547
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1941_to_ad1961(year) {
  let t = year - 1950.0;
  return (
    29.07 +
    0.407 * t -
    Math.pow(t, 2) / 233.0 +
    Math.pow(t, 3) / 2547.0
  );
}

/**
 * Between years 1961 and 1986,
 * calculate for:
 * (where: t = y - 1975)
 *
 * ΔT = 45.45 + 1.067*t - t^2/260 - t^3 / 718
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1961_to_ad1986(year) {
  let t = year - 1975.0;
  return (
    45.45 +
    1.067 * t -
    Math.pow(t, 2) / 260.0 -
    Math.pow(t, 3) / 718.0
  );
}

/**
 * Between years 1986 and 2005,
 * calculate for:
 * (where: t = y - 2000)
 *
 * ΔT = 63.86 + 0.3345 * t - 0.060374 * t^2 + 0.0017275 * t^3 + 0.000651814 * t^4
 *   + 0.00002373599 * t^5
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad1986_to_ad2005(year) {
  let t = year - 2000.0;
  return (
    63.86 +
    0.3345 * t -
    0.060374 * Math.pow(t, 2) +
    0.0017275 * Math.pow(t, 3) +
    0.000651814 * Math.pow(t, 4) +
    0.00002373599 * Math.pow(t, 5)
  );
}

/**
 * Between years 2005 and 2050,
 * calculate for:
 * (where: t = y - 2000)
 *
 * ΔT = 62.92 + 0.32217 * t + 0.005589 * t^2
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad2005_to_ad2050(year) {
  let t = year - 2000.0;
  return 62.92 + 0.32217 * t + 0.005589 * Math.pow(t, 2);
}

/**
 * Between years 2050 and 2150,
 * calculate for:
 *
 * ΔT = -20 + 32 * ((y-1820)/100)^2 - 0.5628 * (2150 - y)
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_ad2050_to_ad2150(year) {
  return (
    -20.0 +
    32.0 * Math.pow((year - 1820.0) / 100.0, 2) -
    0.5628 * (2150.0 - year)
  );
}

/**
 * After 2150, calculate for:
 * (where: u = (y-1820)/100)
 *
 * ΔT = -20 + 32 * u^2
 *
 * @public
 * @function
 * @param {number} year
 * @returns {number}
 */
function get_after_ad2150(year) {
  let u = (year - 1820.0) / 100.0;
  return -20.0 + 32.0 * Math.pow(u, 2);
}

/**
 * ```rust
 * use approx_eq::assert_approx_eq;
 * use chrono::naive::{NaiveDate, NaiveTime};
 * use sowngwala::delta_t::delta_t_from_generic_date;
 *
 * let date = NaiveDate::from_ymd(1986, 1, 1);
 * let delta_t = delta_t_from_generic_date(date);
 *
 * assert_approx_eq!(
 *     delta_t, // 54.89627599023825
 *     54.87,
 *     1e-3
 * );
 * ```
 *
 * @public
 * @function
 * @param {Moment} date
 * @returns {number}
 */
export function delta_t_from_generic_date(date) {
  let year = decimal_year_from_generic_date(date);

  if (year < -500.0) return get_before_bc500(year);
  if (year < 500.0) return get_bc500_to_ad500(year);
  if (year < 1600.0) return get_ad500_to_ad1600(year);
  if (year < 1700.0) return get_ad1600_to_ad1700(year);
  if (year < 1800.0) return get_ad1700_to_ad1800(year);
  if (year < 1860.0) return get_ad1800_to_ad1860(year);
  if (year < 1900.0) return get_ad1860_to_ad1900(year);
  if (year < 1920.0) return get_ad1900_to_ad1920(year);
  if (year < 1941.0) return get_ad1920_to_ad1941(year);
  if (year < 1961.0) return get_ad1941_to_ad1961(year);
  if (year < 1986.0) return get_ad1961_to_ad1986(year);
  if (year < 2005.0) return get_ad1986_to_ad2005(year);
  if (year < 2050.0) return get_ad2005_to_ad2050(year);
  if (year < 2150.0) return get_ad2050_to_ad2150(year);

  return get_after_ad2150(year);
}
