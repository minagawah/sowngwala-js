/**
 * @module sowngwala/check/constants
 */

export const ROUND_DIGITS = 100_000;

export const INPUT_ELEM_KEYS = [
  'year',
  'month',
  'day',
  'hour',
  'min',
  'sec',
  'city',
  'city-names',
  'lat',
  'lat-bound',
  'lng',
  'lng-bound',
];

export const ELEM_KEYS = [
  ...INPUT_ELEM_KEYS,
  'ecliptic-lng',
  'mean-anom',
  'obliquity',
  'asc',
  'dec',
  'azimuth',
  'altitude',
];
