/**
 * @module chrono/naive_datetime
 */
import moment from 'moment';

import { NANOSECOND_UNIT } from '../constants';
import { nano_from_sec, pad } from '../utils';
import { NaiveDate } from './naive_date';
import { NaiveTime } from './naive_time';

/** @typedef {import('moment').Moment} Moment */

/** @typedef {import('../types.js').Year} Year */
/** @typedef {import('../types.js').Day} Day */
/** @typedef {import('../types.js').Month} Month */
/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').NanoSecond} NanoSecond */

/**
 * @typedef NaiveDateContext
 * @type {import('./naive_date.js').NaiveDateContext}
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('./naive_time.js').NaiveTimeContext}
 */

/**
 * @template T
 * @typedef Getter
 * @type {function(): T}
 */

/**
 * A context (or an instance)
 * to be created.
 *
 * @typedef NaiveDateTimeContext
 * @type {Object}
 * @property {Getter<NaiveDateContext>} date
 * @property {Getter<NaiveTimeContext>} time
 * @property {Getter<Year>} year
 * @property {Getter<Month>} month
 * @property {Getter<Day>} day
 * @property {Getter<Hour>} hour
 * @property {Getter<Minute>} minute
 * @property {Getter<Second>} second
 * @property {Getter<NanoSecond>} nanosecond
 * @property {Getter<Moment>} to_moment
 * @property {function(): void} print
 */

/**
 * A publicly exposed object
 * containing a static method.
 *
 * @typedef NaiveDateTime
 * @type {Object}
 * @property {FromMoment} from_moment
 * @property {FromYMD} from_ymd
 * @property {FromYMDHMS} from_ymd_hms
 * @property {FromYMDHMSNano} from_ymd_hmsn
 * @property {FromDate} from_date
 * @property {FromDateTime} from_date_time
 */

/**
 * @callback FromMoment
 * @param {Moment} dt
 * @returns {NaiveDateTimeContext}
 */

/**
 * @callback FromYMD
 * @param {Year} year
 * @param {Month} month
 * @param {Day} day
 * @returns {NaiveDateTimeContext}
 */

/**
 * @callback FromYMDHMS
 * @param {Year} year
 * @param {Month} month
 * @param {Day} day
 * @param {Hour} hour
 * @param {Minute} min
 * @param {Second} sec
 * @returns {NaiveDateTimeContext}
 */

/**
 * @callback FromYMDHMSNano
 * @param {Year} year
 * @param {Month} month
 * @param {Day} day
 * @param {Hour} hour
 * @param {Minute} min
 * @param {Second} sec
 * @param {NanoSecond} nano
 * @returns {NaiveDateTimeContext}
 */

/**
 * @callback FromDate
 * @param {NaiveDateContext} date
 * @returns {NaiveDateTimeContext}
 */

/**
 * @callback FromDateTime
 * @param {NaiveDateContext} date
 * @param {NaiveTimeContext} time
 * @returns {NaiveDateTimeContext}
 */

/**
 * @public
 * @type {NaiveDateTime}
 */
export const NaiveDateTime = Object.freeze({
  from_moment,
  from_ymd,
  from_ymd_hms,
  from_ymd_hmsn,
  from_date,
  from_date_time,
});

/**
 * @public
 * @static
 * @type {FromMoment}
 */
function from_moment(dt) {
  return _from_ymd_hmsn(
    dt.year(),
    dt.month() + 1,
    dt.date(), // NOTE
    dt.hour(),
    dt.minute(),
    dt.second(),
    dt.millisecond() * 1_000_000
  );
}

/**
 * @public
 * @static
 * @type {FromYMD}
 */
function from_ymd(year, month, day) {
  return _from_ymd_hmsn(year, month, day, 0, 0, 0, 0);
}

/**
 * @public
 * @static
 * @type {FromYMDHMS}
 */
function from_ymd_hms(year, month, day, hour, min, sec) {
  const { sec: sec_1, nano: nano_1 } = nano_from_sec(sec);
  return _from_ymd_hmsn(
    year,
    month,
    day,
    hour,
    min,
    sec_1,
    nano_1
  );
}

/**
 * @public
 * @static
 * @type {FromYMDHMSNano}
 */
function from_ymd_hmsn(
  year,
  month,
  day,
  hour,
  min,
  sec,
  nano
) {
  return _from_ymd_hmsn(
    year,
    month,
    day,
    hour,
    min,
    sec,
    nano
  );
}

/**
 * @public
 * @static
 * @type {FromDate}
 */
function from_date(date) {
  return _from_ymd_hmsn(
    date.year(),
    date.month(),
    date.day(),
    0,
    0,
    0,
    0
  );
}

/**
 * @public
 * @static
 * @type {FromDateTime}
 */
function from_date_time(date, time) {
  return _from_ymd_hmsn(
    date.year(),
    date.month(),
    date.day(),
    time.hour(),
    time.minute(),
    time.second(),
    time.nanosecond()
  );
}

/**
 * @private
 * @type {FromYMDHMSNano}
 */
function _from_ymd_hmsn(
  year,
  month,
  day,
  hour,
  min,
  sec,
  nano
) {
  /**
   * @private
   * @type {NaiveDateContext}
   */
  let date = NaiveDate.from_ymd(year, month, day);

  /**
   * @private
   * @type {NaiveTimeContext}
   */
  let time = NaiveTime.from_hmsn(hour, min, sec, nano);

  /**
   * @protected
   * @type {NaiveDateTimeContext}
   */
  return Object.freeze({
    date: () => date,
    time: () => time,
    year: () => date.year(),
    month: () => date.month(),
    day: () => date.day(),
    hour: () => time.hour(),
    minute: () => time.minute(),
    second: () => time.second(),
    nanosecond: () => time.nanosecond(),
    to_moment,
    print: () =>
      `${pad(date.year())}-${pad(date.month())}-${pad(date.day())} ${pad(time.hour())}:${pad(time.minute())}:${pad(time.second())}`,
  });

  /**
   * @returns {Moment}
   */
  function to_moment() {
    const sec =
      time.second() + time.nanosecond() / NANOSECOND_UNIT;
    return moment(
      Date.UTC(
        date.year(),
        date.month() - 1,
        date.day(),
        time.hour(),
        time.minute(),
        sec
      )
    ).utc();
  }
}
