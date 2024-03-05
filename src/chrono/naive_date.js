/**
 * @module chrono/naive_date
 */
import moment from 'moment';

import { pad } from '../utils';

/** @typedef {import('moment').Moment} Moment */

/** @typedef {import('../types.js').Year} Year */
/** @typedef {import('../types.js').Day} Day */
/** @typedef {import('../types.js').Month} Month */

/**
 * @template T
 * @typedef Getter
 * @type {function(): T}
 */

/**
 * A context (or an instance)
 * to be created.
 *
 * @typedef NaiveDateContext
 * @type {Object}
 * @property {Getter<Year>} year
 * @property {Getter<Month>} month
 * @property {Getter<Day>} day
 * @property {Getter<Moment>} to_moment
 * @property {function(): void} print
 */

/**
 * A publicly exposed object
 * containing a static method.
 *
 * @typedef NaiveDate
 * @type {Object}
 * @property {FromMoment} from_moment
 * @property {FromYMD} from_ymd
 */

/**
 * @callback FromMoment
 * @param {Moment} dt
 * @returns {NaiveDateContext}
 */

/**
 * @callback FromYMD
 * @param {Year} y
 * @param {Month} m
 * @param {Day} d
 * @returns {NaiveDateContext}
 */

/**
 * @public
 * @type {NaiveDate}
 */
export const NaiveDate = Object.freeze({
  from_moment,
  from_ymd,
});

/**
 * @public
 * @static
 * @type {FromMoment}
 */
function from_moment(dt) {
  return _from_ymd(
    dt.year(),
    dt.month() + 1,
    dt.date() // NOTE
  );
}

/**
 * @public
 * @static
 * @type {FromYMD}
 */
function from_ymd(y, m, d) {
  return _from_ymd(y, m, d);
}

/**
 * @private
 * @type {FromYMD}
 */
function _from_ymd(y, m, d) {
  /**
   * @private
   * @type {Year}
   */
  let year = y;

  /**
   * @private
   * @type {Month}
   */
  let month = m;

  /**
   * @private
   * @type {Day}
   */
  let day = d;

  /**
   * @protected
   * @type {NaiveDateContext}
   */
  return Object.freeze({
    year: () => year,
    month: () => month,
    day: () => day,
    to_moment,
    print: () => `${pad(year)}-${pad(month)}-${pad(day)}`,
  });

  /**
   * @returns {Moment}
   */
  function to_moment() {
    return moment(Date.UTC(year, month - 1, day)).utc();
  }
}
