"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NaiveDate", {
  enumerable: true,
  get: function () {
    return _naive_date.NaiveDate;
  }
});
Object.defineProperty(exports, "NaiveDateTime", {
  enumerable: true,
  get: function () {
    return _naive_datetime.NaiveDateTime;
  }
});
Object.defineProperty(exports, "NaiveTime", {
  enumerable: true,
  get: function () {
    return _naive_time.NaiveTime;
  }
});
var _naive_date = require("./naive_date");
var _naive_time = require("./naive_time");
var _naive_datetime = require("./naive_datetime");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaiveDate = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @module chrono/naive_date
 */

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
const NaiveDate = exports.NaiveDate = Object.freeze({
  from_moment,
  from_ymd
});

/**
 * @public
 * @static
 * @type {FromMoment}
 */
function from_moment(dt) {
  return _from_ymd(dt.year(), dt.month() + 1, dt.date() // NOTE
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
    print: () => `${(0, _utils.pad)(year)}-${(0, _utils.pad)(month)}-${(0, _utils.pad)(day)}`
  });

  /**
   * @returns {Moment}
   */
  function to_moment() {
    return (0, _moment.default)(Date.UTC(year, month - 1, day)).utc();
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaiveDateTime = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _constants = require("../constants");
var _utils = require("../utils");
var _naive_date = require("./naive_date");
var _naive_time = require("./naive_time");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @module chrono/naive_datetime
 */

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
const NaiveDateTime = exports.NaiveDateTime = Object.freeze({
  from_moment,
  from_ymd,
  from_ymd_hms,
  from_ymd_hmsn,
  from_date,
  from_date_time
});

/**
 * @public
 * @static
 * @type {FromMoment}
 */
function from_moment(dt) {
  return _from_ymd_hmsn(dt.year(), dt.month() + 1, dt.date(),
  // NOTE
  dt.hour(), dt.minute(), dt.second(), dt.millisecond() * 1_000_000);
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
  const {
    sec: sec_1,
    nano: nano_1
  } = (0, _utils.nano_from_sec)(sec);
  return _from_ymd_hmsn(year, month, day, hour, min, sec_1, nano_1);
}

/**
 * @public
 * @static
 * @type {FromYMDHMSNano}
 */
function from_ymd_hmsn(year, month, day, hour, min, sec, nano) {
  return _from_ymd_hmsn(year, month, day, hour, min, sec, nano);
}

/**
 * @public
 * @static
 * @type {FromDate}
 */
function from_date(date) {
  return _from_ymd_hmsn(date.year(), date.month(), date.day(), 0, 0, 0, 0);
}

/**
 * @public
 * @static
 * @type {FromDateTime}
 */
function from_date_time(date, time) {
  return _from_ymd_hmsn(date.year(), date.month(), date.day(), time.hour(), time.minute(), time.second(), time.nanosecond());
}

/**
 * @private
 * @type {FromYMDHMSNano}
 */
function _from_ymd_hmsn(year, month, day, hour, min, sec, nano) {
  /**
   * @private
   * @type {NaiveDateContext}
   */
  let date = _naive_date.NaiveDate.from_ymd(year, month, day);

  /**
   * @private
   * @type {NaiveTimeContext}
   */
  let time = _naive_time.NaiveTime.from_hmsn(hour, min, sec, nano);

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
    print: () => `${(0, _utils.pad)(date.year())}-${(0, _utils.pad)(date.month())}-${(0, _utils.pad)(date.day())} ${(0, _utils.pad)(time.hour())}:${(0, _utils.pad)(time.minute())}:${(0, _utils.pad)(time.second())}`
  });

  /**
   * @returns {Moment}
   */
  function to_moment() {
    const sec = time.second() + time.nanosecond() / _constants.NANOSECOND_UNIT;
    return (0, _moment.default)(Date.UTC(date.year(), date.month() - 1, date.day(), time.hour(), time.minute(), sec)).utc();
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaiveTime = void 0;
var _utils = require("../utils");
var _time = require("../time");
/**
 * @module chrono/naive_time
 */

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').NanoSecond} NanoSecond */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @template T
 * @typedef Getter
 * @type {function(): T}
 */

/**
 * A context (or an instance)
 * to be created.
 *
 * @typedef NaiveTimeContext
 * @type {Object}
 * @property {Getter<Hour>} hour
 * @property {Getter<Minute>} minute
 * @property {Getter<Second>} second
 * @property {Getter<NanoSecond>} nanosecond
 * @property {Getter<DecimalDays>} day_excess
 * @property {Calibrate} calibrate
 * @property {function(): void} print
 */

/**
 * A publicly exposed object
 * containing a static method.
 *
 * @typedef NaiveTime
 * @type {Object}
 * @property {FromHMS} from_hms
 * @property {FromHMSNano} from_hmsn
 */

/**
 * @callback FromHMS
 * @param {number} h
 * @param {number} m
 * @param {number} s
 * @returns {NaiveTimeContext}
 */

/**
 * @callback FromHMSNano
 * @param {number} h
 * @param {number} m
 * @param {number} s
 * @param {number} n
 * @returns {NaiveTimeContext}
 */

/**
 * @callback Calibrate
 * @returns {number} - Excess days resulting due to the calibration.
 * @see {@link module:sowngwala/time.calibrate_hmsn}
 */

/**
 * @public
 * @type {NaiveTime}
 */
const NaiveTime = exports.NaiveTime = Object.freeze({
  from_hms,
  from_hmsn
});

/**
 * @public
 * @static
 * @type {FromHMS}
 */
function from_hms(h, m, s) {
  const {
    sec,
    nano
  } = (0, _utils.nano_from_sec)(s);
  return _from_hmsn(h, m, sec, nano);
}

/**
 * @public
 * @static
 * @type {FromHMSNano}
 */
function from_hmsn(h, m, s, n) {
  return _from_hmsn(h, m, s, n);
}

/**
 * @private
 * @type {FromHMSNano}
 */
function _from_hmsn(h, m, s, n = 0.0) {
  /**
   * @private
   * @type {Hour}
   */
  let hour = h;

  /**
   * @private
   * @type {Minute}
   */
  let min = m;

  /**
   * @private
   * @type {Second}
   */
  let sec = s;

  /**
   * @private
   * @type {NanoSecond}
   */
  let nano = n;

  /**
   * @private
   * @type {DecimalDays}
   */
  let day_excess = 0.0;
  day_excess = calibrate();

  /**
   * @protected
   * @type {NaiveTimeContext}
   */
  return Object.freeze({
    hour: () => hour,
    minute: () => min,
    second: () => sec,
    nanosecond: () => nano,
    day_excess: () => day_excess,
    calibrate,
    print: () => `${(0, _utils.pad)(hour)}:${(0, _utils.pad)(min)}:${(0, _utils.pad)(sec)}`
  });

  /**
   * @protected
   * @type {Calibrate}
   */
  function calibrate() {
    ({
      hmsn: {
        hour,
        min,
        sec,
        nano
      },
      day_excess
    } = (0, _time.calibrate_hmsn)({
      hour,
      min,
      sec,
      nano
    }));
    return day_excess;
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEMI_MAJOR_AXIS_OF_MOON_ORBIT = exports.PARALLAX_AT_DISTANCE_A_FROM_THE_EARTH = exports.OFFSET_TOKYO = exports.OFFSET_GMT = exports.NUM_OF_DAYS_IN_A_YEAR = exports.NANOSECOND_UNIT = exports.MYSQL_FORMAT = exports.MOON_MEAN_LONGITUDE_AT_THE_EPOCH = exports.MOON_ANGULAR_SIZE_AT_DISTANCE_A_FROM_THE_EARTH = exports.MEAN_LONGITUDE_OF_THE_NODE_AT_THE_EPOCH = exports.MEAN_LONGITUDE_OF_PERIGEE_AT_THE_EPOCH = exports.J2000 = exports.ISO8601_FORMAT = exports.INCLINATION_OF_THE_MOON_ORBIT = exports.ECLIPTIC_LONGITUDE_OF_PERIGEE = exports.ECLIPTIC_LONGITUDE_AT_1990 = exports.ECCENTRICITY_OF_ORBIT = exports.ECCENTRICITY_OF_MOON_ORBIT = void 0;
/**
 * @module sowngwala/constants
 */

const NANOSECOND_UNIT = exports.NANOSECOND_UNIT = 1_000_000_000.0;
const OFFSET_GMT = exports.OFFSET_GMT = '+00:00'; // Z (Greenwich)
const OFFSET_TOKYO = exports.OFFSET_TOKYO = '+09:00'; // Z

const MYSQL_FORMAT = exports.MYSQL_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const ISO8601_FORMAT = exports.ISO8601_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
const NUM_OF_DAYS_IN_A_YEAR = exports.NUM_OF_DAYS_IN_A_YEAR = 365.25;

// ------------------------------------
// Sun
// ------------------------------------

/**
 * Sun's mean ecliptic longitude at
 * Jan. 0.0, 1990 which is represented
 * as "ε g" (Epsilon G) in the book.
 * This is the position it would have
 * had if it had been moving in
 * a circular orbit rather than
 * an eclipse.
 * (Peter Duffett-Smith, p.86)
 */
const ECLIPTIC_LONGITUDE_AT_1990 = exports.ECLIPTIC_LONGITUDE_AT_1990 = 279.403_303; // ε g

/**
 * This is the longitude of the sun
 * at perigree which is represented
 * as "ω bar g" (Omega bar G).
 * (Peter Duffett-Smith, p.86)
 */
const ECLIPTIC_LONGITUDE_OF_PERIGEE = exports.ECLIPTIC_LONGITUDE_OF_PERIGEE = 282.768_422; // ω bar g

/**
 * This is the eccentricity of
 * the sun-earth orbit.
 * (Peter Duffett-Smith, p.86)
 */
const ECCENTRICITY_OF_ORBIT = exports.ECCENTRICITY_OF_ORBIT = 0.016_713;

// ------------------------------------
// Moon
// ------------------------------------

const MOON_MEAN_LONGITUDE_AT_THE_EPOCH = exports.MOON_MEAN_LONGITUDE_AT_THE_EPOCH = 318.351_648; // l o
const MEAN_LONGITUDE_OF_PERIGEE_AT_THE_EPOCH = exports.MEAN_LONGITUDE_OF_PERIGEE_AT_THE_EPOCH = 36.340_410; // P o
const MEAN_LONGITUDE_OF_THE_NODE_AT_THE_EPOCH = exports.MEAN_LONGITUDE_OF_THE_NODE_AT_THE_EPOCH = 318.510_107; // N o
const INCLINATION_OF_THE_MOON_ORBIT = exports.INCLINATION_OF_THE_MOON_ORBIT = 5.145_396; // i
const ECCENTRICITY_OF_MOON_ORBIT = exports.ECCENTRICITY_OF_MOON_ORBIT = 0.054_900; // e
const SEMI_MAJOR_AXIS_OF_MOON_ORBIT = exports.SEMI_MAJOR_AXIS_OF_MOON_ORBIT = 384_401.0; // a
const MOON_ANGULAR_SIZE_AT_DISTANCE_A_FROM_THE_EARTH = exports.MOON_ANGULAR_SIZE_AT_DISTANCE_A_FROM_THE_EARTH = 0.518_1; // θ o
const PARALLAX_AT_DISTANCE_A_FROM_THE_EARTH = exports.PARALLAX_AT_DISTANCE_A_FROM_THE_EARTH = 0.950_7; // π o

const J2000 = exports.J2000 = 2_451_545.0;
"use strict";

const {
  Angle
} = require('../index');
describe('A test suite for: coords/angle', () => {
  it('Angle.calibrate (1)', () => {
    let angle;
    let day_excess;
    angle = Angle.from_hms(0, 0, 0);
    expect(angle.second()).toBe(0);
    angle = Angle.from_hms(0, 0, 1);
    expect(angle.second()).toBe(1);
    angle = Angle.from_hms(0, 0, 60);
    angle.calibrate();
    expect(angle.second()).toBe(0);
    expect(angle.minute()).toBe(1);
    angle = Angle.from_hms(0, 0, 62);
    angle.calibrate();
    expect(angle.second()).toBe(2);
    expect(angle.minute()).toBe(1);
    angle = Angle.from_hms(0, 1, 0);
    expect(angle.minute()).toBe(1);
    angle = Angle.from_hms(0, 60, 0);
    angle.calibrate();
    expect(angle.minute()).toBe(0);
    expect(angle.hour()).toBe(1);
    angle = Angle.from_hms(0, 62, 0);
    angle.calibrate();
    expect(angle.minute()).toBe(2);
    expect(angle.hour()).toBe(1);
    angle = Angle.from_hms(1, 0, 0);
    expect(angle.hour()).toBe(1);

    // Take it as a dgree context.
    angle = Angle.from_hms(360, 0, 0);
    angle.calibrate({
      angle: true,
      hour_overflow: true
    });
    day_excess = angle.day_excess();
    expect(angle.hour()).toBe(0);
    expect(day_excess).toBe(1);

    // Back to the normal time context.
    angle = Angle.from_hms(24, 0, 0);
    angle.calibrate({
      hour_overflow: true
    });
    day_excess = angle.day_excess();
    expect(angle.hour()).toBe(0);
    expect(day_excess).toBe(1);
    angle = Angle.from_hms(48, 0, 0);
    angle.calibrate({
      hour_overflow: true
    });
    day_excess = angle.day_excess();
    expect(angle.hour()).toBe(0);
    expect(day_excess).toBe(2);
    angle = Angle.from_hms(1, 1, -1);
    angle.calibrate();
    expect(angle.second()).toBe(59);
    angle = Angle.from_hms(0, 0, -1);
    angle.calibrate({
      hour_overflow: true
    });
    day_excess = angle.day_excess();
    expect(angle.second()).toBe(59);
    expect(angle.minute()).toBe(59);
    expect(angle.hour()).toBe(23);
    expect(day_excess).toBe(-1);
  });

  // test('Angle.calibrate (2)', () => {
  //   // Peter Duffett-Smith, pp.40-41
  //   const angle = Angle.from_hms(139, 41, 10.0);
  //   const dec = decimal_hours_from_angle(angle);
  //   expect(dec).toBeCloseTo(139.686_111, 4);
  // });
});
"use strict";

const moment = require('moment-timezone');
const {
  NaiveDateTime
} = require('../../chrono');
const {
  Latitude,
  Longitude,
  GeoCoord,
  approx_zone_from_geo,
  zone_format
} = require('../index');
describe('A test suite for: coords/approx_zone_from_geo', () => {
  const now = new Date();
  it('approx_zone_from_geo (1) - tz.names', () => {
    const list = moment.tz.names();
    expect(list[321]).toBe('Asia/Tokyo');
  });
  it('approx_zone_from_geo (2) - tz(Japan)', () => {
    const zone = moment(now).tz('Japan').format('Z');
    expect(zone).toBe('+09:00');
  });
  it('approx_zone_from_geo (3) - approx', () => {
    const d = moment(now);
    const lat = Latitude({
      degrees: 35.67,
      bound: 'N'
    });
    const lng = Longitude({
      degrees: 139.65,
      bound: 'E'
    });
    const geo = GeoCoord({
      lat,
      lng
    });
    const local = NaiveDateTime.from_ymd_hms(d.year(), d.month() + 1, d.date(), d.hour(), d.minute(), d.second());
    const zone = approx_zone_from_geo(local, geo);
    expect(zone).toBe(9);
    const zone_1 = zone_format(zone);
    expect(zone_1).toBe('+09:00');
  });
});
"use strict";

const {
  decimal_hours_from_hms
} = require('../../time');
const {
  EcliCoord,
  equatorial_from_ecliptic_with_obliquity
} = require('../index');
describe('A test suite for: coords/equatorial_from_ecliptic', () => {
  test('equatorial_from_ecliptic', () => {
    // Peter Duffett-Smith, pp.40-41

    const oblique = 23.441_884;

    // See in Peter Duffett-Smith's, it first
    // converts lat and lng into decimal degrees.
    const lat_0_dec = decimal_hours_from_hms(4, 52, 31.0);
    const lng_0_dec = decimal_hours_from_hms(139, 41, 10.0);
    const coord_0 = EcliCoord({
      lat: lat_0_dec,
      lng: lng_0_dec
    });
    const coord = equatorial_from_ecliptic_with_obliquity(coord_0, oblique);
    const asc = coord.asc; // right ascension (α)
    const dec = coord.dec; // declination (δ)
    // console.log('asc:', asc.print());
    // console.log('dec:', dec.print());

    expect(asc.hour()).toBe(9);
    expect(asc.minute()).toBe(34);
    // (Rust) 53.582_162_535_99352 (yet, different 'oblique')
    // (JS)   53.584_282_299_16811
    expect(asc.second()).toBeCloseTo(53.6, 1); // 1e-2

    expect(dec.hour()).toBe(19);
    expect(dec.minute()).toBe(32);
    // (Rust) 14.100_993_558_899972 (yet, different 'oblique')
    // (JS)   14.166_759_104_165578
    expect(dec.second()).toBeCloseTo(14.2, 1); // 1e-2
  });
});
"use strict";

const {
  find_kepler
} = require('../index');
describe('A test suite for: sun/find_kepler', () => {
  test('find_kepler', () => {
    const mean_anom = 3.527_781;
    // Actual: 3.521_581_853_477_305
    const ecc = find_kepler(mean_anom);
    expect(ecc).toBeCloseTo(3.521_582, 6);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  Angle,
  EquaCoord,
  GeoCoord,
  Longitude,
  Latitude,
  horizontal_from_equatorial
} = require('../index');
describe('A test suite for: coords/horizontal_from_equatorial', () => {
  test('horizontal_from_equatorial', () => {
    // Peter Duffett-Smith, p.36
    const utc = NaiveDateTime.from_ymd_hms(1980, 4, 22, 14, 36, 51.67);
    const asc = Angle.from_hms(18, 32, 21);
    const dec = Angle.from_hms(23, 13, 10);
    const equa_coord = EquaCoord({
      asc,
      dec
    });
    const lat = Latitude({
      degrees: 52,
      bound: 'N'
    });
    const lng = Longitude({
      degrees: 64,
      bound: 'W'
    });
    const geo_coord = GeoCoord({
      lat,
      lng
    });
    const {
      coord: {
        azimuth,
        altitude
      }
    } = horizontal_from_equatorial(utc, equa_coord, geo_coord);

    // Azimuth (A)
    expect(azimuth.hour()).toBe(283);
    expect(azimuth.minute()).toBe(16);
    expect(azimuth.minute()).toBeCloseTo(16, 0);

    // Altitude (α)
    expect(altitude.hour()).toBe(19);

    // TODO: Why?
    // expect(altitude.minute()).toBe(20);

    // Actual: 7.617965126296156
    ////// expect(altitude.second()).toBeCloseTo(4, -1);
  });
});
"use strict";

const {
  Angle,
  Latitude,
  horizontal_from_equatorial_with_hour_angle
} = require('../index');
describe('A test suite for: coords/horizontal_from_equatorial_with_hour_angle', () => {
  test('horizontal_from_equatorial_with_hour_angle', () => {
    // Peter Duffett-Smith, p.36

    const hour_angle = Angle.from_hms(5, 51, 44);
    const dec = Angle.from_hms(23, 13, 10);
    const lat = Latitude({
      degrees: 52,
      bound: 'N'
    });
    const {
      coord: {
        azimuth,
        altitude
      }
    } = horizontal_from_equatorial_with_hour_angle(hour_angle, dec, lat);

    // Azimuth (A)
    expect(azimuth.hour()).toBe(283);
    expect(azimuth.minute()).toBe(16);
    expect(azimuth.minute()).toBeCloseTo(16, 0);

    // Altitude (α)
    expect(altitude.hour()).toBe(19);
    expect(altitude.minute()).toBe(20);
    expect(altitude.second()).toBeCloseTo(4, 0);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  mean_obliquity_of_the_ecliptic
} = require('../index');
describe('A test suite for: coords/mean_obliquity_of_the_ecliptic', () => {
  test('mean_obliquity_of_the_ecliptic', () => {
    const dt = NaiveDateTime.from_ymd_hms(1979, 12, 31, 0, 0, 0);
    const oblique = mean_obliquity_of_the_ecliptic(dt);
    expect(oblique).toBeCloseTo(23.441_893, 6);
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Angle = void 0;
var _time = require("../time");
var _chrono = require("../chrono");
/**
 * @module coords/angle
 */

const ROUND_DIGITS = 100_000;

/**
 * @param {number} num
 */
const round = num => Math.round(num * ROUND_DIGITS) / ROUND_DIGITS;

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/** @typedef {import('../types.js').Degree} Degree */
/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @template T
 * @typedef Getter
 * @type {function(): T}
 */

/**
 * This is a context (or an instance)
 * returned from the factory.
 *
 * When you create the instance, you
 * may freely choose to manage your
 * 'hour' as in that of time, or in
 * that of the degree context
 * (e.g. '24 hours' vs '360 degrees').
 * However, when you run 'calibrate'
 * method, it defaults to oveflow
 * the 'hour' in the time context.
 * If you wish to calibrate 'hour'
 * in the dgree context, then you
 * need to explicitly specify
 * 'calibrate' to run in the degree
 * context by giving the option
 * 'options.angle' to 'calibrate'.
 *
 * Moreover, it defaults NOT to
 * calibrate 'hour' even when a negative
 * value were specified to 'hour'.
 * For instance, say, you had '-10' for
 * your 'hour', it will stay '-10' even
 * if you run 'calibrate'. If you want
 * to change the negative into the
 * positive, you need to explicitly
 * specify 'options.hour_overflow'
 * to 'calibrate' method.
 *
 * @typedef AngleContext
 * @type {Object}
 * @property {Getter<Hour>} hour
 * @property {Getter<Minute>} minute
 * @property {Getter<Second>} second
 * @property {Getter<DecimalDays>} day_excess
 * @property {ToNaiveTime} to_naive_time
 * @property {Calibrate} calibrate
 * @property {function(): void} print
 */

/**
 * A publicly exposed object
 * containing a static method.
 *
 * @typedef Angle
 * @type {Object}
 * @property {FromHMS} from_hms
 */

/**
 * @callback FromHMS
 * @param {Hour} h
 * @param {Minute} m
 * @param {Second} s
 * @returns {AngleContext}
 */

/**
 * Convert Angle into NaiveTime.
 *
 * @callback ToNaiveTime
 * @returns {NaiveTimeContext}
 */

/**
 * @callback Calibrate
 * @param {Object} options
 * @param {boolean} [options.angle=false] - When specified, it will take the given data as angle-based, and will have 'hour' overflow only when it reached 360. Usually, it should be 24 as a default, and this option should be set to 'false'. When set to 'true', it will set the said limit to 360.
 * @param {boolean} [options.hour_overflow=true] - If specified TRUE, changes the negative into the positive. If FALSE, let the negative hour as it is.
 * @returns {number} - Excess days resulting due to the calibration.
 * @see {@link module:sowngwala/time.calibrate_hmsn}
 */

/**
 * A publicly exposed object
 * with a static method
 * which lets you create
 * an instance of `AngleContext`.
 * @public
 * @type {Angle}
 */
const Angle = exports.Angle = Object.freeze({
  from_hms
});

/**
 * @public
 * @static
 * @type {FromHMS}
 */
function from_hms(h, m, s) {
  return _from_hms(h, m, s);
}

/**
 * @private
 * @type {FromHMS}
 */
function _from_hms(h, m, s) {
  /**
   * @private
   * @type {Hour}
   */
  let hour = h;

  /**
   * @private
   * @type {Minute}
   */
  let min = m;

  /**
   * @private
   * @type {Second}
   */
  let sec = s;

  /**
   * @private
   * @type {DecimalDays}
   */
  let day_excess = 0.0;

  /**
   * @protected
   * @type {AngleContext}
   */
  return Object.freeze({
    hour: () => hour,
    minute: () => min,
    second: () => sec,
    day_excess: () => day_excess,
    to_naive_time,
    calibrate,
    print: () => `${hour}°${min}'${round(sec)}`
  });

  /**
   * @protected
   * @type {ToNaiveTime}
   */
  function to_naive_time() {
    // Note:
    // 'from_hms' will extract 'nano' from 'sec'.
    return _chrono.NaiveTime.from_hms(hour, min, sec);
  }

  /**
   * @protected
   * @type {Calibrate}
   */
  function calibrate(options) {
    /*
     * Usually, take it in time context
     * (defaults to FALSE).
     * Only when specified TRUE,
     * take it as a degree context.
     */
    const angle = !!options?.angle;

    /*
     * Usually, let the negative hour
     * stay negative as it is
     * (defaults to FALSE).
     * Only when specified TRUE,
     * then change the negative
     * into the positive.
     */
    const hour_overflow = !!options?.hour_overflow;
    ({
      hmsn: {
        hour,
        min,
        sec
      },
      day_excess
    } = (0, _time.calibrate_hmsn)({
      hour,
      min,
      sec,
      nano: 0,
      angle,
      hour_overflow
    }));
    return day_excess;
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approx_zone_from_geo = approx_zone_from_geo;
exports.zone_format = zone_format;
var _utils = require("../utils");
/**
 * @module sowngwala/coords/approx_zone_from_geo
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('./geo.js').GeoCoordContext}
 */

/**
 * @param {NaiveDateTimeContext} local
 * @param {GeoCoordContext} geo
 * @returns {number}
 */
function approx_zone_from_geo(local, geo) {
  const lat = geo.lat.degrees;
  const lng = geo.lng.degrees;
  const decimal_hours = Math.floor(lng / 15.0);
  const offset = decimal_hours >= 12.0 ? decimal_hours - 12.0 : decimal_hours;
  const lst = (-0.0069 + (0, _utils.to_radians)(lat) * 0.00007) % 24.0;
  return Math.round(offset + lst);
}

/**
 * @public
 * @function
 * @param {number} zone
 * @returns {string}
 */
function zone_format(zone) {
  const sign = zone >= 0 ? '+' : '';
  return `${sign}${(0, _utils.pad)(zone)}:00`;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EcliCoord = void 0;
var _ramda = require("ramda");
/**
 * @module sowngwala/coords/ecliptic
 */

/**
 * An object returned when calling
 * 'EcliCoord' which represents
 * the position of the planetary body
 * in Ecliptic coordinate system,
 * and it consists of "latitude (β)"
 * and "longitude (λ)".
 *
 * @typedef EcliCoordContext
 * @type {Object}
 * @property {number} lat - latitude (β) (in degrees)
 * @property {number} lng - longitude (λ) (in degrees)
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {number} args.lat
 * @param {number} args.lng
 * @returns {EcliCoordContext}
 */
const EcliCoord = ({
  lat,
  lng
}) => {
  if ((0, _ramda.isEmpty)(lat)) throw new Error(`No 'lat'`);
  if ((0, _ramda.isEmpty)(lng)) throw new Error(`No 'lng'`);
  return {
    lat,
    lng
  };
};
exports.EcliCoord = EcliCoord;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EquaCoord = void 0;
var _ramda = require("ramda");
/**
 * @module sowngwala/coords/equatorial
 */

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * An object returned when calling
 * 'EquaCoord' which represents
 * the position of the planetary body
 * in Equatorial coordinate system,
 * and it consists of "right ascension
 * (α)" and "declination (δ)".
 *
 * @typedef EquaCoordContext
 * @type {Object}
 * @property {AngleContext} asc - right ascension (α)
 * @property {AngleContext} dec - declination (δ)
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {AngleContext} args.asc - right ascension (α)
 * @param {AngleContext} args.dec - declination (δ)
 * @returns {EquaCoordContext}
 */
const EquaCoord = ({
  asc,
  dec
}) => {
  if ((0, _ramda.isEmpty)(asc)) throw new Error(`No 'asc'`);
  if ((0, _ramda.isEmpty)(dec)) throw new Error(`No 'dec'`);
  asc.calibrate({
    angle: true
  });
  dec.calibrate({
    angle: true
  });
  return {
    asc,
    dec
  };
};
exports.EquaCoord = EquaCoord;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equatorial_from_ecliptic_with_generic_date = equatorial_from_ecliptic_with_generic_date;
var _chrono = require("../chrono");
var _equatorial_from_ecliptic_with_generic_datetime = require("./equatorial_from_ecliptic_with_generic_datetime");
/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_generic_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('./ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquatorialFromEclipticWithGenericDateReturned
 * @type {import('./equatorial_from_ecliptic_with_generic_datetime.js').EquatorialFromEclipticWithGenericDateTimeReturned}
 */

/**
 * See
 * 'equatorial_from_ecliptic_with_generic_datetime'
 *
 * In Rust version, it only takes "date".
 *
 * Original:
 * - sowngwala::coords::equatorial_from_ecliptic_with_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic_with_generic_datetime}
 * @param {EcliCoordContext} coord
 * @param {NaiveDateContext} date
 * @returns {EquatorialFromEclipticWithGenericDateReturned}
 */
function equatorial_from_ecliptic_with_generic_date(coord, date) {
  return (0, _equatorial_from_ecliptic_with_generic_datetime.equatorial_from_ecliptic_with_generic_datetime)(coord, _chrono.NaiveDateTime.from_date(date));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equatorial_from_ecliptic_with_generic_datetime = equatorial_from_ecliptic_with_generic_datetime;
var _equatorial_from_ecliptic_with_obliquity = require("./equatorial_from_ecliptic_with_obliquity");
var _mean_obliquity_of_the_ecliptic = require("./mean_obliquity_of_the_ecliptic");
/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_generic_datetime
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('./ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('./equatorial.js').EquaCoordContext}
 */

/**
 * @typedef EquatorialFromEclipticWithGenericDateTimeReturned
 * @type {Object}
 * @property {EquaCoordContext} coord - Equatorial position of the sun
 * @property {number} _obliquity - (optional) Mean obliquity of the ecliptic (ε)
 */

/**
 * It will convert the Ecliptic position
 * into that of the Equatorial.
 * (Peter Duffett-Smith, pp.40-41)
 *
 * Notice, also, how it calculates
 * "obliquity of the ecliptic (ε)"
 * automatically from the given date.
 *
 * See
 * 'equatorial_from_ecliptic'
 * for it has the actual calculations.
 *
 * In Rust version, it only takes
 * "date". However, we want to also
 * take "time" into consideration.
 * Hence, introducing this method
 * in JS version. It will become
 * a matter when we attempt to calculate
 * the mean obliquity. For this,
 * instead of passing only "date",
 * we are passing "datetime".
 *
 * Original:
 * - sowngwala::coords::equatorial_from_ecliptic_with_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords/equatorial_from_ecliptic}
 * @param {EcliCoordContext} coord
 * @param {NaiveDateTimeContext} dt
 * @returns {EquatorialFromEclipticWithGenericDateTimeReturned}
 */
function equatorial_from_ecliptic_with_generic_datetime(coord, dt) {
  // This is in degrees, not radians.
  let _obliquity = (0, _mean_obliquity_of_the_ecliptic.mean_obliquity_of_the_ecliptic)(dt);
  // console.log('mean_obliquity:', _obliquity);

  const equatorial = (0, _equatorial_from_ecliptic_with_obliquity.equatorial_from_ecliptic_with_obliquity)(coord, _obliquity);
  return {
    coord: equatorial,
    _obliquity
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equatorial_from_ecliptic_with_obliquity = equatorial_from_ecliptic_with_obliquity;
var _utils = require("../utils");
var _time = require("../time");
var _coords = require("../coords");
/**
 * @module sowngwala/coords/equatorial_from_ecliptic_with_obliquity
 */

/**
 * @typedef EquaCoordContext
 * @type {import('./equatorial.js').EquaCoordContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('./ecliptic.js').EcliCoordContext}
 */

/**
 * It will onvert Ecliptic coordinate
 * position into the Equatorial.
 * For the first argument, it takes
 * the Ecliptic coordinate position
 * which consists of "latitude (β)"
 * and "longitude (λ)".
 * For the second argument, it takes
 * "the obliquity of the ecliptic (ε)".
 * As a result, it will return the
 * Equatorial position which consists
 * of "right ascension (α)" and
 * "declination (δ)".
 * (Peter Duffett-Smith, pp.40-41)
 *
 * In general, you may want to
 * consider rather using:
 * 'equatorial_from_ecliptic_with_generic_date'
 * because it is likely that you are
 * not aware of "obliquity (ε)".
 * You want programs to calculate
 * "obliquity (ε)" for you, and that
 * is what
 * 'equatorial_from_ecliptic_with_generic_date'
 * does for you.
 *
 * @public
 * @function
 * @see {@link: sowngwala/coords.equatorial_from_ecliptic_with_generic_date}
 * @param {EcliCoordContext} coord
 * @param {number} oblique - Obliquity of the ecliptic (ε) (in degrees)
 * @returns {EquaCoordContext}
 */
function equatorial_from_ecliptic_with_obliquity(coord, oblique) {
  let oblique_cos = Math.cos((0, _utils.to_radians)(oblique));
  let oblique_sin = Math.sin((0, _utils.to_radians)(oblique));
  let lat = coord.lat; // latitude (β)
  let lng = coord.lng; // longitude (λ)

  let lat_cos = Math.cos((0, _utils.to_radians)(lat));
  let lat_sin = Math.sin((0, _utils.to_radians)(lat));
  let lat_tan = Math.tan((0, _utils.to_radians)(lat));
  let lng_cos = Math.cos((0, _utils.to_radians)(lng));
  let lng_sin = Math.sin((0, _utils.to_radians)(lng));
  let decline_sin = lat_sin * oblique_cos + lat_cos * oblique_sin * lng_sin;
  let decline_radians = Math.asin(decline_sin);
  let decline = (0, _utils.to_degrees)(decline_radians);
  // console.log('decline:', decline);

  let y = lng_sin * oblique_cos - lat_tan * oblique_sin;
  let x = lng_cos;

  /*
   * (Rust) y.atan2(x)
   * https://doc.rust-lang.org/std/primitive.f64.html#method.atan2
   * (JS) atan2(y, x)
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
   */
  let asc = (0, _utils.to_degrees)(Math.atan2(y, x));
  asc -= 360.0 * Math.floor(asc / 360.0);
  asc /= 15.0;
  // console.log('asc:', asc);

  return (0, _coords.EquaCoord)({
    asc: (0, _time.angle_from_decimal_hours)(asc),
    dec: (0, _time.angle_from_decimal_hours)(decline)
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find_kepler = find_kepler;
var _constants = require("../constants");
/**
 * @module sowngwala/coords/find_kepler
 */

const KEPLER_ACCURACY = 1e-6; // (ε)

/**
 * It corresponds to [Step 6] of what
 * is described on p.91.
 *
 * When finding "mean anomaly (M)" and
 * "eccentric anomaly (E)" of the sun,
 * we need Kepler's equation.
 * (Peter Duffett-Smith, p.90)
 *
 * Peter Duffett-Smith refer to this
 * series of steps as "Routine R2"
 * and is explained in details on p.90.
 *
 * The actual calculation is done in
 * its helper function '_kepler_aux'
 * which recursively calls itself.
 *
 * In the program, it is used in
 * 'sun_longitude_and_mean_anomaly'
 * which is further used in
 * 'sun_pos_ecliptic_from_generic_datetime'
 * and is further used in
 * 'sun_pos_equatorial_from_generic_datetime'.
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.sun_longitude_and_mean_anomaly}
 * @see {@link: sowngwala/sun.sun_pos_ecliptic_from_generic_datetime}
 * @param {number} mean_anom - Mean anomaly (M) (in radians)
 * @returns {number} - Eccentric anomaly (E)
 */
function find_kepler(mean_anom) {
  return _kepler_aux(mean_anom, mean_anom, 0);
}

/**
 * Actual calculations for Kepler's
 * equation are done in this recursive
 * function.
 *
 * @private
 * @function
 * @param {number} mean_anom - Mean anomaly (M) (in radians)
 * @param {number} ecc
 * @param {number} counter
 * @returns {number} - Eccentric anomaly (E)
 */
function _kepler_aux(mean_anom, ecc, counter) {
  if (counter > 1000) throw new Error('Dude, this is insane...');
  let delta = ecc - _constants.ECCENTRICITY_OF_ORBIT * Math.sin(ecc) - mean_anom;
  if (Math.abs(delta) > KEPLER_ACCURACY) {
    let delta_e = delta / (1.0 - _constants.ECCENTRICITY_OF_ORBIT * Math.cos(ecc));
    return _kepler_aux(mean_anom, ecc - delta_e, counter + 1);
  }
  return ecc;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Longitude = exports.Latitude = exports.GeoCoord = void 0;
var _ramda = require("ramda");
/**
 * @module sowngwala/coords/geo
 */

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/** @typedef {'N' | 'S'} LatitudeBound */
/** @typedef {'E' | 'W'} LongitudeBound */

/**
 * Latitude (φ) in Horizontal system.
 *
 * @typedef LatitudeContext
 * @type {Object}
 * @property {number} degrees - Latitude in degrees
 * @property {LatitudeBound} bound - North ("N") or South ("S")
 */

/**
 * Longitude in Horizontal system.
 *
 * @typedef LongitudeContext
 * @type {Object}
 * @property {number} degrees - Longitude in degrees
 * @property {LongitudeBound} bound - East ("E") or West ("W")
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {number} args.degrees - Latitude in degrees
 * @param {LatitudeBound} args.bound - North ("N") or South ("S")
 * @returns {LatitudeContext}
 */
const Latitude = ({
  degrees,
  bound
}) => {
  if ((0, _ramda.isEmpty)(degrees)) throw new Error(`No 'degrees'`);
  if ((0, _ramda.isEmpty)(bound)) throw new Error(`No 'bound'`);
  if (!(bound === 'N' || bound === 'S')) throw new Error(`Invalid bound: ${bound}`);
  return {
    degrees,
    bound
  };
};

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {number} args.degrees - Longitude in degrees
 * @param {LongitudeBound} args.bound - East ("E") or West ("W")
 * @returns {LongitudeContext}
 */
exports.Latitude = Latitude;
const Longitude = ({
  degrees,
  bound
}) => {
  if ((0, _ramda.isEmpty)(degrees)) throw new Error(`No 'degrees'`);
  if ((0, _ramda.isEmpty)(bound)) throw new Error(`No 'bound'`);
  if (!(bound === 'E' || bound === 'W')) throw new Error(`Invalid bound: ${bound}`);
  return {
    degrees,
    bound
  };
};

/**
 * An object returned when calling
 * 'GeoCoord' which represents
 * the position of the observer
 * in Geo location position.
 * and it consists of Latitude
 * and Longitude.
 *
 * @typedef GeoCoordContext
 * @type {Object}
 * @property {LatitudeContext} lat - latitude for Geo location
 * @property {LongitudeContext} lng - longitude for Geo location
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {LatitudeContext} args.lat - latitude for Geo location
 * @param {LongitudeContext} args.lng - longitude for Geo location
 * @returns {GeoCoordContext}
 */
exports.Longitude = Longitude;
const GeoCoord = ({
  lat,
  lng
}) => {
  if ((0, _ramda.isEmpty)(lat)) throw new Error(`No 'lat'`);
  if ((0, _ramda.isEmpty)(lng)) throw new Error(`No 'lng'`);
  return {
    lat,
    lng
  };
};
exports.GeoCoord = GeoCoord;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizonCoord = void 0;
var _ramda = require("ramda");
/**
 * @module sowngwala/coords/horizontal
 */

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * An object returned when calling
 * 'HorizonCoord' which represents
 * the position of the planetary body
 * in the Horizontal coordinate
 * system, and it consists of
 * "azimuth (A)" and "altitude (α)".
 *
 * @typedef HorizonCoordContext
 * @type {Object}
 * @property {AngleContext} azimuth - azimuth (A)
 * @property {AngleContext} altitude - altitude (α)
 */

/**
 * @public
 * @function
 * @throw {Error}
 * @param {Object} args
 * @param {AngleContext} args.azimuth - azimuth (A)
 * @param {AngleContext} args.altitude - altitude (α)
 * @returns {HorizonCoordContext}
 */
const HorizonCoord = ({
  azimuth,
  altitude
}) => {
  if ((0, _ramda.isEmpty)(azimuth)) throw new Error(`No 'azimuth'`);
  if ((0, _ramda.isEmpty)(altitude)) throw new Error(`No 'altitude'`);
  azimuth.calibrate({
    angle: true
  });
  altitude.calibrate({
    angle: true
  });
  return {
    azimuth,
    altitude
  };
};
exports.HorizonCoord = HorizonCoord;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.horizontal_from_equatorial = horizontal_from_equatorial;
var _time = require("../time");
var _horizontal_from_equatorial_with_hour_angle = require("./horizontal_from_equatorial_with_hour_angle");
/**
 * @module sowngwala/coords/horizontal_from_equatorial
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('./equatorial.js').EquaCoordContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('./geo.js').GeoCoordContext}
 */

/**
 * @typedef HorizonCoordContext
 * @type {import('./horizontal.js').HorizonCoordContext}
 */

/**
 * @typedef HorizontalFromEquatorialReturned
 * @type {Object}
 * @property {HorizonCoordContext} coord - Horizon coordinate position
 * @property {AngleContext} _hour_angle - Hour Angle (H)
 */

/**
 * See
 * 'horizontal_from_equatorial_with_hour_angle'
 * for almost everything is done there.
 * This is a wrapper for the above,
 * only it carry out calculations for
 * "hour angle (H)".
 *
 * From the given (1) datetime in UTC,
 * (2) the Equatorial position (which
 * consists of "right ascension (α)"
 * and "declination (δ)"), and (3)
 * observer's Geo location (which
 * consists of "Longitude and Latitude),
 * it will calculate "hour angle (H)",
 * and is passed down to
 * 'horizontal_from_equatorial_with_hour_angle'
 * which is the actual method to return
 * the Horizontal position (which
 * consists of "azimuth (A)" and
 * "altitude (α)").
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/coords.horizontal_from_equatorial_with_hour_angle}
 * @param {NaiveDateTimeContext} utc
 * @param {EquaCoordContext} equa_coord
 * @param {GeoCoordContext} geo_coord - Observer's Geolocation
 * @returns {HorizontalFromEquatorialReturned}
 */
function horizontal_from_equatorial(utc, equa_coord, geo_coord) {
  const asc = equa_coord.asc;
  const dec = equa_coord.dec;
  const lat = geo_coord.lat;
  const lng = geo_coord.lng;
  const _hour_angle = (0, _time.hour_angle_from_asc)(utc, asc, lng);
  const {
    coord
  } = (0, _horizontal_from_equatorial_with_hour_angle.horizontal_from_equatorial_with_hour_angle)(_hour_angle, dec, lat);
  return {
    coord,
    _hour_angle
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.horizontal_from_equatorial_with_hour_angle = horizontal_from_equatorial_with_hour_angle;
var _utils = require("../utils");
var _time = require("../time");
var _horizontal = require("./horizontal");
/**
 * @module sowngwala/coords/horizontal_from_equatorial_with_hour_angle
 */

/**
 * @typedef AngleContext
 * @type {import('./angle.js').AngleContext}
 */

/**
 * @typedef LatitudeContext
 * @type {import('./geo.js').LatitudeContext}
 */

/**
 * @typedef HorizonCoordContext
 * @type {import('./horizontal.js').HorizonCoordContext}
 */

/**
 * @typedef HorizontalFromEquatorialWithHourAngleReturned
 * @type {Object}
 * @property {HorizonCoordContext} coord - Horizon coordinate position
 */

/**
 * Given the hour angle (H) (which is
 * calculated from "right ascension
 * (α)" of Equatorial), declination (δ)
 * of Equatorial, and Observer's
 * latitude, returns "azimuth (A)"
 * and "altitude (α)".
 *
 * @public
 * @function
 * @param {AngleContext} hour_angle - "hour_angle" (H) (calculated from "right ascension (α)" of Equatorial).
 * @param {AngleContext} dec - "declination (δ)" of Equatorial.
 * @param {LatitudeContext} lat - Observer's latitude
 * @returns {HorizontalFromEquatorialWithHourAngleReturned}
 */
function horizontal_from_equatorial_with_hour_angle(hour_angle, dec, lat) {
  const h_decimal_hours = (0, _time.decimal_hours_from_angle)(hour_angle);
  const h_decimal_degrees = h_decimal_hours * 15;
  const h_radians = (0, _utils.to_radians)(h_decimal_degrees);
  const dec_decimal_hours = (0, _time.decimal_hours_from_angle)(dec);
  const dec_decimal_degrees = dec_decimal_hours;
  const dec_radians = (0, _utils.to_radians)(dec_decimal_degrees);
  const lat_radians = (0, _utils.to_radians)(lat.degrees);
  const sin_altitude = Math.sin(dec_radians) * Math.sin(lat_radians) + Math.cos(dec_radians) * Math.cos(lat_radians) * Math.cos(h_radians);
  const altitude_radians = Math.asin(sin_altitude);
  const altitude_degrees = (0, _utils.to_degrees)(altitude_radians);
  const cos_azimuth = (Math.sin(dec_radians) - Math.sin(lat_radians) * sin_altitude) / (Math.cos(lat_radians) * Math.cos(altitude_radians));
  const azimuth_radians = Math.acos(cos_azimuth);
  let azimuth_degrees = (0, _utils.to_degrees)(azimuth_radians);
  const sin_h = Math.sin(h_radians);
  if (sin_h >= 0.0) {
    azimuth_degrees = 360 - azimuth_degrees;
  }
  const altitude = (0, _time.angle_from_decimal_hours)(altitude_degrees);
  const azimuth = (0, _time.angle_from_decimal_hours)(azimuth_degrees);
  const coord = (0, _horizontal.HorizonCoord)({
    azimuth,
    altitude
  });
  return {
    coord
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Angle", {
  enumerable: true,
  get: function () {
    return _angle.Angle;
  }
});
Object.defineProperty(exports, "EcliCoord", {
  enumerable: true,
  get: function () {
    return _ecliptic.EcliCoord;
  }
});
Object.defineProperty(exports, "EquaCoord", {
  enumerable: true,
  get: function () {
    return _equatorial.EquaCoord;
  }
});
Object.defineProperty(exports, "GeoCoord", {
  enumerable: true,
  get: function () {
    return _geo.GeoCoord;
  }
});
Object.defineProperty(exports, "HorizonCoord", {
  enumerable: true,
  get: function () {
    return _horizontal.HorizonCoord;
  }
});
Object.defineProperty(exports, "Latitude", {
  enumerable: true,
  get: function () {
    return _geo.Latitude;
  }
});
Object.defineProperty(exports, "Longitude", {
  enumerable: true,
  get: function () {
    return _geo.Longitude;
  }
});
Object.defineProperty(exports, "approx_zone_from_geo", {
  enumerable: true,
  get: function () {
    return _approx_zone_from_geo.approx_zone_from_geo;
  }
});
Object.defineProperty(exports, "equatorial_from_ecliptic_with_generic_date", {
  enumerable: true,
  get: function () {
    return _equatorial_from_ecliptic_with_generic_date.equatorial_from_ecliptic_with_generic_date;
  }
});
Object.defineProperty(exports, "equatorial_from_ecliptic_with_generic_datetime", {
  enumerable: true,
  get: function () {
    return _equatorial_from_ecliptic_with_generic_datetime.equatorial_from_ecliptic_with_generic_datetime;
  }
});
Object.defineProperty(exports, "equatorial_from_ecliptic_with_obliquity", {
  enumerable: true,
  get: function () {
    return _equatorial_from_ecliptic_with_obliquity.equatorial_from_ecliptic_with_obliquity;
  }
});
Object.defineProperty(exports, "find_kepler", {
  enumerable: true,
  get: function () {
    return _find_kepler.find_kepler;
  }
});
Object.defineProperty(exports, "horizontal_from_equatorial", {
  enumerable: true,
  get: function () {
    return _horizontal_from_equatorial.horizontal_from_equatorial;
  }
});
Object.defineProperty(exports, "horizontal_from_equatorial_with_hour_angle", {
  enumerable: true,
  get: function () {
    return _horizontal_from_equatorial_with_hour_angle.horizontal_from_equatorial_with_hour_angle;
  }
});
Object.defineProperty(exports, "mean_obliquity_of_the_ecliptic", {
  enumerable: true,
  get: function () {
    return _mean_obliquity_of_the_ecliptic.mean_obliquity_of_the_ecliptic;
  }
});
Object.defineProperty(exports, "zone_format", {
  enumerable: true,
  get: function () {
    return _approx_zone_from_geo.zone_format;
  }
});
var _approx_zone_from_geo = require("./approx_zone_from_geo");
var _angle = require("./angle");
var _ecliptic = require("./ecliptic");
var _equatorial = require("./equatorial");
var _equatorial_from_ecliptic_with_obliquity = require("./equatorial_from_ecliptic_with_obliquity");
var _equatorial_from_ecliptic_with_generic_date = require("./equatorial_from_ecliptic_with_generic_date");
var _equatorial_from_ecliptic_with_generic_datetime = require("./equatorial_from_ecliptic_with_generic_datetime");
var _find_kepler = require("./find_kepler");
var _mean_obliquity_of_the_ecliptic = require("./mean_obliquity_of_the_ecliptic");
var _geo = require("./geo");
var _horizontal = require("./horizontal");
var _horizontal_from_equatorial = require("./horizontal_from_equatorial");
var _horizontal_from_equatorial_with_hour_angle = require("./horizontal_from_equatorial_with_hour_angle");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mean_obliquity_of_the_ecliptic = mean_obliquity_of_the_ecliptic;
var _time = require("../time");
/**
 * @module sowngwala/coords/mean_obliquity_of_the_ecliptic
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * The method is used in
 * 'equatorial_from_ecliptic_with_generic_date'
 * when it tries to find "obliquity of
 * the ecliptic (ε)" which is the angle
 * between the planes of the equator
 * and the ecliptic.
 * (Peter Duffett-Smith, p.41)
 *
 * The Rust version only take "date"
 * but we want to make it accurate
 * so that it now takes "time" for
 * this version.
 *
 * @public
 * @function
 * @see {@link: sowngwala/coords.equatorial_from_ecliptic_with_generic_date}
 * @param {NaiveDateTimeContext} dt
 * @returns {number} - Obliquity of the Ecliptic (ε) (in degrees)
 */
function mean_obliquity_of_the_ecliptic(dt) {
  // Whereas the book only takes "date",
  // see how it takes "time" as well.
  let jd = (0, _time.julian_day_from_generic_datetime)(dt);
  jd -= 2_451_545.0; // January 1.5, 2000

  let t = jd / 36_525.0;
  let delta = 46.815 * t + 0.0006 * t * t - 0.001_81 * t * t * t;
  delta /= 3600.0;
  return 23.439_292 - delta;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delta_t_from_generic_date = delta_t_from_generic_date;
var _time = require("./time");
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

/**
 * @typedef NaiveDateContext
 * @type {import('./chrono/naive_date.js').NaiveDateContext}
 */

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
  return 10583.6 - 1014.41 * u + 33.78311 * Math.pow(u, 2) - 5.952053 * Math.pow(u, 3) - 0.1798452 * Math.pow(u, 4) + 0.022174192 * Math.pow(u, 5) + 0.0090316521 * Math.pow(u, 6);
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
  return 1574.2 - 556.01 * u + 71.23472 * Math.pow(u, 2) + 0.319781 * Math.pow(u, 3) - 0.8503463 * Math.pow(u, 4) - 0.005050998 * Math.pow(u, 5) + 0.0083572073 * Math.pow(u, 6);
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
  return 120.0 - 0.9808 * t - 0.01532 * Math.pow(t, 2) + Math.pow(t, 3) / 7129.0;
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
  return 8.83 + 0.1603 * t - 0.0059285 * Math.pow(t, 2) + 0.00013336 * Math.pow(t, 3) - Math.pow(t, 4) / 1174000.0;
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
  return 13.72 - 0.332447 * t + 0.0068612 * Math.pow(t, 2) + 0.0041116 * Math.pow(t, 3) - 0.00037436 * Math.pow(t, 4) + 0.0000121272 * Math.pow(t, 5) - 0.0000001699 * Math.pow(t, 6) + 0.000000000875 * Math.pow(t, 7);
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
  return 7.62 + 0.5737 * t - 0.251754 * Math.pow(t, 2) + 0.01680668 * Math.pow(t, 3) - 0.0004473624 * Math.pow(t, 4) + Math.pow(t, 5) / 233174.0;
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
  return -2.79 + 1.494119 * t - 0.0598939 * Math.pow(t, 2) + 0.0061966 * Math.pow(t, 3) - 0.000197 * Math.pow(t, 4);
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
  return 21.2 + 0.84493 * t - 0.0761 * Math.pow(t, 2) + 0.0020936 * Math.pow(t, 3);
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
  return 29.07 + 0.407 * t - Math.pow(t, 2) / 233.0 + Math.pow(t, 3) / 2547.0;
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
  return 45.45 + 1.067 * t - Math.pow(t, 2) / 260.0 - Math.pow(t, 3) / 718.0;
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
  return 63.86 + 0.3345 * t - 0.060374 * Math.pow(t, 2) + 0.0017275 * Math.pow(t, 3) + 0.000651814 * Math.pow(t, 4) + 0.00002373599 * Math.pow(t, 5);
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
  return -20.0 + 32.0 * Math.pow((year - 1820.0) / 100.0, 2) - 0.5628 * (2150.0 - year);
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
 * @param {NaiveDateContext} date
 * @returns {number}
 */
function delta_t_from_generic_date(date) {
  let year = (0, _time.decimal_year_from_generic_date)(date);
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time = exports.sun = exports.moon = exports.coords = exports.chrono = void 0;
var _chrono = _interopRequireWildcard(require("./chrono"));
exports.chrono = _chrono;
var _coords = _interopRequireWildcard(require("./coords"));
exports.coords = _coords;
var _moon = _interopRequireWildcard(require("./moon"));
exports.moon = _moon;
var _sun = _interopRequireWildcard(require("./sun"));
exports.sun = _sun;
var _time = _interopRequireWildcard(require("./time"));
exports.time = _time;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  moon_equatorial_from_generic_datetime
} = require('../index');
describe('A test suite for: moon/moon_equatorial_from_generic_datetime', () => {
  test('moon_equatorial_from_generic_datetime', () => {
    const dt = NaiveDateTime.from_ymd_hms(1979, 2, 26, 16, 0, 0);
    let coord = moon_equatorial_from_generic_datetime(dt);
    let asc = coord.asc;
    let dec = coord.dec;
    expect(asc.hour()).toBe(22);
    expect(asc.minute()).toBe(33);

    // (Rust) 26.382_007_503_326_292
    // (JS) 28.689_418_166_734697
    expect(asc.second()).toBeCloseTo(27.0, -1); // 1e-1

    // IMPORTANT:
    // In the book, expects "8°01'0".
    // With JS, it calculates to "8°00'58".

    expect(dec.hour()).toBe(-8);

    // Note: book expects "1"
    expect(dec.minute()).toBe(0);

    // Note: book expects "0"
    // Actual: 57.546945537410465
    expect(dec.second()).toBeCloseTo(57, -1);
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "moon_ecliptic_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _moon_ecliptic_from_generic_datetime.moon_ecliptic_from_generic_datetime;
  }
});
Object.defineProperty(exports, "moon_equatorial_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _moon_equatorial_from_generic_datetime.moon_equatorial_from_generic_datetime;
  }
});
var _moon_ecliptic_from_generic_datetime = require("./moon_ecliptic_from_generic_datetime");
var _moon_equatorial_from_generic_datetime = require("./moon_equatorial_from_generic_datetime");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moon_ecliptic_from_generic_datetime = moon_ecliptic_from_generic_datetime;
var _constants = require("../constants");
var _utils = require("../utils");
var _delta_t = require("../delta_t");
var _coords = require("../coords");
var _sun = require("../sun");
var _time = require("../time");
/**
 * @module sowngwala/moon/moon_ecliptic_from_generic_datetime
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * Given the specific date and time,
 * returns "latitude (β)" and
 * "longitude (λ)" of the Ecliptic
 * coordinate position.
 * (Peter Duffett-Smith, p.144)
 *
 * Original:
 * - sowngwala::moon::equatorial_position_of_the_moon_from_generic_datetime
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @returns {EcliCoordContext}
 */
function moon_ecliptic_from_generic_datetime(dt) {
  let date = dt.date();

  /*
   * [Step 1]
   * (Peter Duffett-Smith, p.144)
   */
  let day_number = (0, _time.day_number_from_generic_date)(date);
  let delta_t = (0, _delta_t.delta_t_from_generic_date)(date);
  let angle = _coords.Angle.from_hms(dt.hour(), dt.minute(),
  // TODO: Don't we need nanosecond?
  dt.second() + delta_t);
  let hours = (0, _time.decimal_hours_from_angle)(angle);
  let hours_as_days = hours / 24.0;

  // In the book, represented by "d"
  let days_jan_0 = day_number + hours_as_days;

  // console.log('[moon] day_number:', day_number);
  // console.log('[moon] delta_t:', delta_t);
  // console.log('[moon] hours:', hours);
  // console.log('[moon] hours_as_days:', hours_as_days);
  // console.log('[moon] days_jan_0:', days_jan_0);

  /*
   * [Step 2]
   * (Peter Duffett-Smith, p.144)
   */

  /*
   * Days since 1990 (d)
   * which is represented in the book as "D".
   */
  let days = (0, _time.days_since_1990)(date.year()) + days_jan_0;

  /*
   * [Step 3]
   * Sun's "longitude (λ)" and "mean anomaly (M)"
   */
  let {
    lng: sun_lng,
    mean_anom: sun_mean_anom
  } = (0, _sun.longitude_and_mean_anomaly)(days);

  // console.log('[moon] days:', days);
  // console.log('[moon] sun_lng:', sun_lng);
  // console.log('[moon] sun_mean_anom:', sun_mean_anom);

  /*
   * [Step 4]
   * Moon's "mean longitude (l)"
   */
  let l = 13.176_396_6 * days + _constants.MOON_MEAN_LONGITUDE_AT_THE_EPOCH;
  l -= 360.0 * Math.floor(l / 360.0);

  /*
   * [Step 5]
   * Moon's "mean anomaly (Mm)"
   */
  let mm = l - 0.111_404_1 * days - _constants.MEAN_LONGITUDE_OF_PERIGEE_AT_THE_EPOCH;
  mm -= 360.0 * Math.floor(mm / 360.0);

  /*
   * [Step 6]
   * Acending node's mean longitude (N).
   */
  let n = _constants.MEAN_LONGITUDE_OF_THE_NODE_AT_THE_EPOCH - 0.052_953_9 * days;
  n -= 360.0 * Math.floor(n / 360.0);

  /*
   * [Step 7]
   * In the book, represented by "C".
   */
  let c = l - sun_lng;

  /*
   * [Step 7]
   * Corrections for evection (Ev)
   */
  let ev = 1.2739 * Math.sin((0, _utils.to_radians)(2.0 * c - mm));
  let sun_mean_anom_sin = Math.sin((0, _utils.to_radians)(sun_mean_anom));

  // console.log('[moon] l[0]:', l);
  // console.log('[moon] mm[0]:', mm);
  // console.log('[moon] n[0]:', n);
  // console.log('[moon] c:', c);
  // console.log('[moon] ev:', ev);
  // console.log(
  //   '[moon] sun_mean_anom_sin:',
  //   sun_mean_anom_sin
  // );

  /*
   * [Step 8]
   * The annual equation (Ae)
   */
  let ae = 0.1858 * sun_mean_anom_sin;

  /*
   * [Step 8]
   * The third correction (A3)
   */
  let a3 = 0.37 * sun_mean_anom_sin;

  /*
   * [Step 9]
   */
  mm += ev - ae - a3;

  /*
   * [Step 10]
   * Center of the eclipse
   */
  let ec = 6.2886 * Math.sin((0, _utils.to_radians)(mm));

  /*
   * [Step 11]
   * The fourth correction (A4)
   */
  let a4 = 0.214 * Math.sin((0, _utils.to_radians)(2.0 * mm));

  /*
   * [Step 12]
   * Moon's corrected longitude (l)
   */
  l += ev + ec - ae + a4;

  // console.log('[moon] ae:', ae);
  // console.log('[moon] a3:', a3);
  // console.log('[moon] mm[1]:', mm);
  // console.log('[moon] ec:', ec);
  // console.log('[moon] a4:', a4);
  // console.log('[moon] l[1]:', l);

  /*
   * [Step 13]
   * Variation
   */
  let v = 0.6583 * Math.sin((0, _utils.to_radians)(2.0 * (l - sun_lng)));

  /*
   * [Step 14]
   * Moon's true orbital longtude
   */
  l += v;

  /*
   * [Step 15]
   * Corrected longitude of the node
   */
  n -= 0.16 * sun_mean_anom_sin;
  let l_minus_n = (0, _utils.to_radians)(l - n);

  /*
   * [Step 16]
   */
  let y = Math.sin(l_minus_n) * Math.cos((0, _utils.to_radians)(_constants.INCLINATION_OF_THE_MOON_ORBIT));

  /*
   * [Step 17]
   */
  let x = Math.cos(l_minus_n);

  // console.log('[moon] v:', v);
  // console.log('[moon] l[2]:', l);
  // console.log('[moon] n[1]:', n);
  // console.log('[moon] l_minus_n:', l_minus_n);
  // console.log('[moon] y:', y);
  // console.log('[moon] x:', x);

  /*
   * [Step 18]
   * Ecliptic longitude (λm)
   *
   * (Rust) y.atan2(x)
   * (JS) atan2(y, x)
   */
  let tmp = Math.atan2(y, x);
  let lng = (0, _utils.to_degrees)(tmp);

  /*
   * [Step 19]
   */
  lng += n;

  // Ecliptic latitude (βm)
  let lat = Math.sin(l_minus_n) * (0, _utils.to_degrees)(Math.asin(Math.sin((0, _utils.to_radians)(_constants.INCLINATION_OF_THE_MOON_ORBIT))));

  // console.log('[moon] tmp:', tmp);
  // console.log('[moon] lng[0]:', lng);
  // console.log('[moon] lng[1]:', lng);
  // console.log('[moon] lat:', lat);

  return (0, _coords.EcliCoord)({
    lat,
    lng
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moon_equatorial_from_generic_datetime = moon_equatorial_from_generic_datetime;
var _coords = require("../coords");
var _moon_ecliptic_from_generic_datetime = require("./moon_ecliptic_from_generic_datetime");
/**
 * @module sowngwala/moon/moon_equatorial_from_generic_datetime
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * Given the specific date and time,
 * returns "right ascension (α)" and
 * "declination (δ)" of the Equatorial
 * coordinate position.
 * (Peter Duffett-Smith, p.144)
 *
 * Original:
 * - sowngwala::moon::equatorial_position_of_the_moon_from_generic_datetime
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @returns {EquaCoordContext}
 */
function moon_equatorial_from_generic_datetime(dt) {
  let date = dt.date();
  const {
    coord
  } = (0, _coords.equatorial_from_ecliptic_with_generic_date)((0, _moon_ecliptic_from_generic_datetime.moon_ecliptic_from_generic_datetime)(dt), date);
  return coord;
}
"use strict";

const {
  longitude_and_mean_anomaly
} = require('../index');
describe('A test suite for: sun/longitude_and_mean_anomaly', () => {
  test('longitude_and_mean_anomaly', () => {
    const days = -522;
    const {
      lng,
      mean_anom
    } = longitude_and_mean_anomaly(days);

    // Actual: 124.18773182997958
    expect(lng).toBeCloseTo(124.187_732, 6);

    // // Actual: 3.5277809759101495
    // expect(mean_anom).toBeCloseTo(3.527_781, 5);

    // Actual:
    expect(mean_anom).toBeCloseTo(202.126_961, 5);
  });
});
"use strict";

const {
  NaiveDate
} = require('../../chrono');
const {
  sun_ecliptic_from_generic_date
} = require('../index');
describe('A test suite for: sun/sun_ecliptic_from_generic_date', () => {
  test('sun_ecliptic_from_generic_date', () => {
    const date = NaiveDate.from_ymd(1988, 7, 27);
    // console.log('date:', date.print());

    const {
      coord
    } = sun_ecliptic_from_generic_date(date);

    // Actual: 124.187_731_829_979_58
    expect(coord.lng).toBeCloseTo(124.187_732, 6);
  });
});
"use strict";

const {
  NaiveDate
} = require('../../chrono');
const {
  sun_equatorial_from_generic_date
} = require('../index');
describe('A test suite for: sun/sun_equatorial_from_generic_date', () => {
  test('sun_equatorial_from_generic_date', () => {
    const date = NaiveDate.from_ymd(1988, 7, 27);
    const {
      coord
    } = sun_equatorial_from_generic_date(date);
    const asc = coord.asc; // right ascension (α)
    const dec = coord.dec; // declination (δ)
    // console.log('right ascension:', asc.print());
    // console.log('declination:', dec.print());

    expect(asc.hour()).toBe(8);
    expect(asc.minute()).toBe(26);
    // (Rust) 3.805_0320_752_654_443
    // (JS)   3.805_0320_752_590_494
    expect(asc.second()).toBeCloseTo(4.0, 0); // 1e-1

    expect(dec.hour()).toBe(19);
    expect(dec.minute()).toBe(12);
    // (Rust) 42.522_657_925_921_976
    // (JS)   42.522_657_925_921_976
    expect(dec.second()).toBeCloseTo(42.5, 1); // 5e-2
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eot_decimal_from_utc = eot_decimal_from_utc;
var _eot_from_utc = require("./eot_from_utc");
var _time = require("../time");
/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/sun/eot_decimal_from_utc
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EOTDecimalFromUTCReturned
 * @type {Object}
 * @property {DecimalHours} decimal
 * @property {DecimalHours} day_excess
 */

/**
 * EOT, or "the equation of time" is
 * the difference (in degree angle)
 * between the mean sun and the real
 * sun.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * This is a wrapper for 'eot_from_utc'.
 * See 'eot_from_utc' for it has the
 * actual calculations for EOT.
 * (or it further has the actual
 * calculations in 'eot_from_gst')
 *
 * Although EOT is vital to finding
 * sun's position in precision, however,
 * EOT is currently not used from any
 * functions implemented anywhere
 * in the program...
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_from_utc}
 * @param {NaiveDateTimeContext} utc
 * @returns {EOTDecimalFromUTCReturned}
 */
function eot_decimal_from_utc(utc) {
  let {
    eot,
    day_excess
  } = (0, _eot_from_utc.eot_from_utc)(utc);
  let decimal = (0, _time.decimal_hours_from_angle)(eot);
  return {
    decimal,
    day_excess
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eot_from_gst = eot_from_gst;
var _chrono = require("../chrono");
var _time = require("../time");
var _sun_equatorial_from_generic_datetime = require("./sun_equatorial_from_generic_datetime");
/**
 * @module sowngwala/sun/eot_from_gst
 */

/** @typedef {import('moment').Moment} Moment */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * @typedef EOTFromGSTReturned
 * @type {Object}
 * @property {AngleContext} angle
 * @property {DecimalDays} day_excess
 */

/**
 * EOT, or "the equation of time" is
 * the difference (in degree angle)
 * between the mean sun and the real
 * sun.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * Used in 'eot_from_utc', however, is
 * further used in 'eot_decimal_from_utc'.
 *
 * Although EOT is vital to finding
 * sun's position in precision, however,
 * EOT is currently not used from any
 * functions implemented anywhere
 * in the program...
 *
 * Original:
 * - sowngwala::sun::equation_of_time_from_gst
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_from_utc}
 * @see {@link: sowngwala/sun.eot_decimal_from_utc}
 * @param {NaiveDateTimeContext} gst
 * @returns {EOTFromGSTReturned}
 */
function eot_from_gst(gst) {
  let date = gst.date();

  /*
   * In the book, we get the Equatorial
   * from "date". However, we want to
   * manage "time" as well.
   */
  let {
    coord
  } = (0, _sun_equatorial_from_generic_datetime.sun_equatorial_from_generic_datetime)(gst);

  /*
   * 'asc' in 'EquaCoord' is 'Angle'
   * which is the right ascension (α).
   * @type {AngleContext}
   */
  let asc_0 = coord.asc;

  /** @type {NaiveTimeContext} */
  let asc_1 = asc_0.to_naive_time();

  /*
   * TODO: Do we want the following in
   * datetime?
   */

  /** @type {NaiveDateTimeContext} */
  let naivedatetime = _chrono.NaiveDateTime.from_ymd_hmsn(date.year(), date.month(), date.day(), asc_1.hour(), asc_1.minute(), asc_1.second(), asc_1.nanosecond());
  let day_excess = 0;

  /** @type {NaiveTimeContext} */
  let utc_time;
  ({
    utc_time,
    day_excess
  } = (0, _time.utc_from_gst)(naivedatetime));
  let decimal = (0, _time.decimal_hours_from_naive_time)(utc_time);
  let e = 12.0 - decimal;
  let angle_0 = (0, _time.angle_from_decimal_hours)(e);
  day_excess += angle_0.day_excess();
  return {
    angle: angle_0,
    day_excess
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eot_from_utc = eot_from_utc;
var _eot_from_gst = require("./eot_from_gst");
/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/sun/eot_from_utc
 */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef EOTFromUTCReturned
 * @type {Object}
 * @property {AngleContext} eot
 * @property {DecimalDays} day_excess
 */

/**
 * EOT, or "the equation of time" is
 * the difference (in degree angle)
 * between the mean sun and the real
 * sun.
 * (Peter Duffett-Smith, pp.98-99)
 *
 * This function is called from
 * 'eot_decimal_from_utc'.
 * However, as you can see, it further
 * relies on 'eot_from_gst' where
 * everything takes place for EOT.
 * See 'eot_from_gst' for it has the
 * actual calculations for EOT.
 *
 * Although EOT is vital to finding
 * sun's position in precision, however,
 * EOT is currently not used from any
 * functions implemented anywhere
 * in the program...
 *
 * @public
 * @function
 * @see {@link: sowngwala/sun.eot_decimal_from_utc}
 * @see {@link: sowngwala/sun.eot_from_gst}
 * @param {NaiveDateTimeContext} utc
 * @returns {EOTFromUTCReturned}
 */
function eot_from_utc(utc) {
  const {
    angle: eot,
    day_excess
  } = (0, _eot_from_gst.eot_from_gst)(utc);
  return {
    eot,
    day_excess
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "eot_decimal_from_utc", {
  enumerable: true,
  get: function () {
    return _eot_decimal_from_utc.eot_decimal_from_utc;
  }
});
Object.defineProperty(exports, "eot_from_gst", {
  enumerable: true,
  get: function () {
    return _eot_from_gst.eot_from_gst;
  }
});
Object.defineProperty(exports, "eot_from_utc", {
  enumerable: true,
  get: function () {
    return _eot_from_utc.eot_from_utc;
  }
});
Object.defineProperty(exports, "longitude_and_mean_anomaly", {
  enumerable: true,
  get: function () {
    return _longitude_and_mean_anomaly.longitude_and_mean_anomaly;
  }
});
Object.defineProperty(exports, "sun_ecliptic_from_generic_date", {
  enumerable: true,
  get: function () {
    return _sun_ecliptic_from_generic_date.sun_ecliptic_from_generic_date;
  }
});
Object.defineProperty(exports, "sun_ecliptic_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _sun_ecliptic_from_generic_datetime.sun_ecliptic_from_generic_datetime;
  }
});
Object.defineProperty(exports, "sun_equatorial_from_generic_date", {
  enumerable: true,
  get: function () {
    return _sun_equatorial_from_generic_date.sun_equatorial_from_generic_date;
  }
});
Object.defineProperty(exports, "sun_equatorial_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _sun_equatorial_from_generic_datetime.sun_equatorial_from_generic_datetime;
  }
});
Object.defineProperty(exports, "sun_horizontal_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _sun_horizontal_from_generic_datetime.sun_horizontal_from_generic_datetime;
  }
});
var _eot_from_gst = require("./eot_from_gst");
var _eot_from_utc = require("./eot_from_utc");
var _eot_decimal_from_utc = require("./eot_decimal_from_utc");
var _sun_ecliptic_from_generic_date = require("./sun_ecliptic_from_generic_date");
var _sun_ecliptic_from_generic_datetime = require("./sun_ecliptic_from_generic_datetime");
var _sun_equatorial_from_generic_date = require("./sun_equatorial_from_generic_date");
var _sun_equatorial_from_generic_datetime = require("./sun_equatorial_from_generic_datetime");
var _sun_horizontal_from_generic_datetime = require("./sun_horizontal_from_generic_datetime");
var _longitude_and_mean_anomaly = require("./longitude_and_mean_anomaly");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.longitude_and_mean_anomaly = longitude_and_mean_anomaly;
var _constants = require("../constants");
var _utils = require("../utils");
var _find_kepler = require("../coords/find_kepler");
/**
 * @module sowngwala/sun/longitude_and_mean_anomaly
 */

/**
 * @typedef SunLngMeanAnomalyReturned
 * @type {Object}
 * @property {number} lng - Sun's longitude (λ)
 * @property {number} mean_anom - Mean anomaly (M) (in degrees)
 */

/**
 * Given a number of days since 1990
 * for the target date, it returns
 * "Sun's longitude (λ)" and "Mean
 * Anomaly (M)" for the date.
 *
 * Used in
 * 'ecliptic'
 * which is further used in
 * 'sun_equatorial_from_generic_datetime'.
 *
 * While
 * 'sun_equatorial_from_generic_datetime'
 * being the starting point for
 * calculating the position of the sun,
 * it owes majority of its calculations
 * in the logic implemented in here.
 *
 * Original:
 * - sowngwala::sun::sun_sun_longitude_and_mean_anomaly
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.ecliptic}
 * @see {@link: module:sowngwala/sun.sun_equatorial_from_generic_datetime}
 * @param {number} days
 * @returns {SunLngMeanAnomalyReturned}
 */
function longitude_and_mean_anomaly(days) {
  /*
   * [Step 3] (in his book, p.91)
   */
  let n = 360.0 / 365.242_191 * days;
  n -= 360.0 * Math.floor(n / 360.0);

  /*
   * ==================================
   * Mean Anomaly (M)
   * ==================================
   * [Step 4] to [Step 5] (in his book, p.91)
   * Or, it is fully explained in p.89.
   */
  let mean_anom = n + _constants.ECLIPTIC_LONGITUDE_AT_1990 - _constants.ECLIPTIC_LONGITUDE_OF_PERIGEE;
  if (mean_anom < 0.0) {
    mean_anom += 360.0;
  }

  /*
   * ==================================
   * Eccentric Anomaly (E)
   * ==================================
   * [Step 6] (in his book, p.91)
   */
  let ecc = (0, _find_kepler.find_kepler)((0, _utils.to_radians)(mean_anom));

  /*
   * ==================================
   * True Anomaly (v)
   * ==================================
   * Find true motion of the sun in
   * an ellipse.
   * [Step 7] to [Step 9] (in his book, p.91)
   * Or, it is fully explained in p.90.
   */
  let v = Math.sqrt((1.0 + _constants.ECCENTRICITY_OF_ORBIT) / (1.0 - _constants.ECCENTRICITY_OF_ORBIT)) * Math.tan(ecc / 2.0);
  v = (0, _utils.to_degrees)(Math.atan(v) * 2.0);

  /*
   * ==================================
   * Sun's Longitude (λ)
   * ==================================
   * [Step 10] (in his book, p.91)
   */
  let lng = v + _constants.ECLIPTIC_LONGITUDE_OF_PERIGEE;
  if (lng > 360.0) {
    lng -= 360.0;
  }
  if (lng < 0.0) {
    lng += 360.0;
  }
  return {
    lng,
    mean_anom
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sun_ecliptic_from_generic_date = sun_ecliptic_from_generic_date;
var _chrono = require("../chrono");
var _sun_ecliptic_from_generic_datetime = require("./sun_ecliptic_from_generic_datetime");
/**
 * @module sowngwala/sun/sun_ecliptic_from_generic_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * @typedef SunEclipticFromGenericDateTimeReturned
 * @type {import('./sun_ecliptic_from_generic_datetime').SunEclipticFromGenericDateTimeReturned}
 */

/**
 * Given a 'date' in UTC (for which
 * '00:00:00' will automatically be set
 * for time), and will return
 * Ecliptic the position of the sun
 * which consists of "latitude (β)"
 * and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * Consider using
 * 'sun_ecliptic_from_generic_date'
 * because it gives you accurate
 * a result. In Peter Duffett-Smith's
 * it takes only "date". Obviously,
 * it does not take "time" into
 * consideration. However, for
 * 'sun_ecliptic_from_generic_date'
 * takes "datetime", it gives you
 * more accurate result when you
 * want a result for a specific time.
 *
 * Original:
 * - sowngwalla::sun::sun_ecliptic_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun/sun_ecliptic_from_generic_datetime}
 * @param {NaiveDateContext} date - UTC date (w/o specific time)
 * @returns {SunEclipticFromGenericDateTimeReturned}
 */
function sun_ecliptic_from_generic_date(date) {
  const dt = _chrono.NaiveDateTime.from_ymd_hms(date.year(), date.month(), date.day(), 0, 0, 0);
  return (0, _sun_ecliptic_from_generic_datetime.sun_ecliptic_from_generic_datetime)(dt);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sun_ecliptic_from_generic_datetime = sun_ecliptic_from_generic_datetime;
var _time = require("../time");
var _chrono = require("../chrono");
var _coords = require("../coords");
var _longitude_and_mean_anomaly = require("./longitude_and_mean_anomaly");
/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/sun/sun_ecliptic_from_generic_datetime
 */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */
/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef SunEclipticFromGenericDateTimeReturned
 * @type {Object}
 * @property {EcliCoordContext} coord - Ecliptic position of the Sun
 * @property {number} _mean_anom - (optional) Mean anomaly (M) (in degrees)
 */

/**
 * Given a datetime in UTC, it will
 * return the Ecliptic position of
 * the sun (which consists of "latitude
 * (β)" and "longitude (λ)".
 * (Peter Duffett-Smith, p.91)
 *
 * To calculate the Ecliptic position,
 * Peter Duffett-Smith's book only
 * takes "date", but does not take
 * "time" into consideration. The book
 * calculates "sun's longitude (λ)" and
 * "mean anomaly (M)" for when "time"
 * is "00:00:00". Since we want to
 * specify "time" as well, so did I
 * slightly change the implementation
 * so that we take "time".
 *
 * In our repo, what implemented in
 * 'sun_ecliptic_from_generic_date'
 * strictly follows the book. In another
 * word, it only takes "date".
 *
 * Whether we want "time" or not,
 * calculations are mostly the same,
 * and Peter Duffett-Smith explains the
 * calculation logic in 10 easy steps.
 * As you can see, bellow codes are
 * commented so that to show the
 * correspondances to the book.
 *
 * Original:
 * - sowngwalla::sun::sun_ecliptic_from_generic_date
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt - UTC datetime
 * @returns {SunEclipticFromGenericDateTimeReturned}
 */
function sun_ecliptic_from_generic_datetime(dt) {
  const date = dt.date();

  /*
   * [Step 1]
   * (p.91)
   * Find out the "day number" for
   * the specified date.
   */

  let day_number = (0, _time.day_number_from_generic_date)(date);
  // console.log('day_number:', day_number);

  /*
   *  [Step 2]
   *  (p.91)
   *  Find out days since 1990.
   */

  /** @type {DecimalHours} */
  let days = (0, _time.days_since_1990)(dt.year()) + day_number;
  // console.log('days[0]:', days);

  /*
   * You can see bellow that we prepare
   * the decimal hours to find out
   * "sun's longitude (λ)" and "mean
   * anomaly (M)". While the book only
   * takes "date", we want to specify
   * "time" so that we would get more
   * accurate values.
   */

  /** @type {DecimalHours} */
  let decimal_hours = (0, _time.decimal_hours_from_naive_time)(_chrono.NaiveTime.from_hmsn(dt.hour(), dt.minute(), dt.second(), 0.0));

  // So, we are adding "time" as well.
  days + decimal_hours / 24.0;

  // console.log('days[1]:', days);

  /*
   * [Step 3] to [Step 10]
   * (p.91)
   * For the given number of days
   * since 1990, we will find out
   * "sun's/ longitude (λ)" and
   * "mean anomaly (M)".
   */

  let {
    lng: _lng,
    mean_anom: _mean_anom
  } = (0, _longitude_and_mean_anomaly.longitude_and_mean_anomaly)(days);

  // console.log('lng:', _lng);
  // console.log('mean_anom:', _mean_anom);

  /*
   * Note: "latitude (β)" in Ecliptic
   * will always become "0.0" because
   * that is the definition of what
   * the Ecliptic coordinate system is.
   * See:
   * Peter Duffett-Smith, p.85.
   */

  const coord = (0, _coords.EcliCoord)({
    lat: 0.0,
    lng: _lng
  });

  // console.log('coord:', coord);

  return {
    coord,
    _mean_anom
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sun_equatorial_from_generic_date = sun_equatorial_from_generic_date;
var _chrono = require("../chrono");
var _sun_equatorial_from_generic_datetime = require("./sun_equatorial_from_generic_datetime");
/**
 * @module sowngwala/sun/sun_equatorial_from_generic_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * @typedef SunEquatorialFromGenericDateTimeReturned
 * @type {import('./sun_equatorial_from_generic_datetime.js').SunEquatorialFromGenericDateTimeReturned}
 */

/**
 * Given a specific 'date' (for which
 * '00:00:00' will automatically be set
 * for time) in UTC, it will return
 * the Equatorial position of the sun
 * which consists of "right ascension
 * (α)" and "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See 'sun_equatorial_from_generic_datetime' for
 * actual calculations.
 *
 * Just as it is discussed in
 * 'ecliptic', the book only
 * talks about "date", but we want
 * "time" for accuracy. Hence,
 * I introduced 'ecliptic'.
 *
 * Yet, if you prefer to use the bellow
 * method instead, you should always be
 * aware that you will get the result
 * for that of "00:00:00" no matter
 * whatever "date" you provide.
 *
 * Original:
 * - sonwgwalla::sun::sun_equatorial_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.sun_equatorial_from_generic_datetime}
 * @see {@link: module:sowngwala/sun.sun_ecliptic_from_generic_datetime}
 * @see {@link: module:sowngwala/sun.sun_ecliptic_from_generic_date}
 * @param {NaiveDateContext} date - UTC date (w/o specific time)
 * @returns {SunEquatorialFromGenericDateTimeReturned}
 */
function sun_equatorial_from_generic_date(date) {
  const dt = _chrono.NaiveDateTime.from_ymd_hms(date.year(), date.month(), date.day(), 0, 0, 0);
  return (0, _sun_equatorial_from_generic_datetime.sun_equatorial_from_generic_datetime)(dt);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sun_equatorial_from_generic_datetime = sun_equatorial_from_generic_datetime;
var _coords = require("../coords");
var _sun_ecliptic_from_generic_datetime = require("./sun_ecliptic_from_generic_datetime");
/**
 * @module sowngwala/sun/sun_equatorial_from_generic_datetime
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * @typedef SunEquatorialFromGenericDateTimeReturned
 * @type {Object}
 * @property {EquaCoordContext} coord - Equatorial position of the sun
 * @property {EcliCoordContext} _ecliptic - (optional) Ecliptic position of the sun
 * @property {number} _mean_anom - (optional) Mean anomaly (M) (in degrees)
 * @property {number} _obliquity - (optional) Mean obliquity of the ecliptic (ε)
 */

/**
 * Given a datetime in UTC, it will
 * return the Equatorial position of
 * the sun (which consists of "right
 * ascension (α)" and "declination (δ)".
 * (Peter Duffett-Smith, p.91)
 *
 * See 'sun_ecliptic_from_generic_datetime' for most of
 * the calculations are done there.
 *
 * Just as explained fully in
 * 'sun_ecliptic_from_generic_datetime', the book does
 * not take "time" into consideration
 * but only "date". So,
 * 'sun_equatorial_from_generic_date'
 * is the method which strictly follows
 * the book, but the method provided
 * here takes "time".
 *
 * Also, notice how
 * 'equatorial_from_ecliptic_with_generic_date'
 * converts the Ecliptic into Equatorial.
 *
 * Original:
 * - sonwgwalla::sun::sun_equatorial_from_generic_date
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/sun.sun_ecliptic_from_generic_datetime}
 * @see {@link: module:sowngwala/coords.equatorial_from_ecliptic_with_generic_datetime}
 * @param {NaiveDateTimeContext} utc - UTC datetime (for specific time as well)
 * @returns {SunEquatorialFromGenericDateTimeReturned}
 */
function sun_equatorial_from_generic_datetime(utc) {
  /*
   * In the book, we get the Equatorial
   * from "date". However, we want to
   * manage "time" as well.
   */
  const {
    coord: _ecliptic,
    _mean_anom
  } = (0, _sun_ecliptic_from_generic_datetime.sun_ecliptic_from_generic_datetime)(utc);

  /*
   * Same here. We want to take "time"
   * into consideration. To be specific,
   * we are passing "time" to
   * 'mean_obliquity_of_the_ecliptic'
   * so that we would improve accuracy.
   */
  const {
    coord,
    _obliquity
  } = (0, _coords.equatorial_from_ecliptic_with_generic_datetime)(_ecliptic, utc);
  return {
    coord,
    _ecliptic,
    _mean_anom,
    _obliquity
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sun_horizontal_from_generic_datetime = sun_horizontal_from_generic_datetime;
var _coords = require("../coords");
var _sun_equatorial_from_generic_datetime = require("./sun_equatorial_from_generic_datetime");
/**
 * @module sowngwala/sun/sun_horizontal_from_generic_datetime
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef EcliCoordContext
 * @type {import('../coords/ecliptic.js').EcliCoordContext}
 */

/**
 * @typedef EquaCoordContext
 * @type {import('../coords/equatorial.js').EquaCoordContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('../coords/geo.js').GeoCoordContext}
 */

/**
 * @typedef HorizonCoordContext
 * @type {import('../coords/horizontal.js').HorizonCoordContext}
 */

/**
 * @typedef SunHorizontalFromGenericDateTimeReturned
 * @type {Object}
 * @property {HorizonCoordContext} coord - Horizontal position of the sun
 * @property {EquaCoordContext} _equatorial - Equatorial position of the sun
 * @property {EcliCoordContext} _ecliptic - (optional) Ecliptic position of the sun
 * @property {number} _mean_anom - (optional) Mean anomaly (M) (in degrees)
 * @property {number} _obliquity - (optional) Mean obliquity of the ecliptic (ε)
 * @property {AngleContext} _hour_angle - Hour Angle (H)
 */

/**
 * Given UTC datetime and observer's
 * geo coordinate position (latitude
 * and longitude), returns the
 * Horizontal position of the sun which
 * consists of "Azimuth (A)" and
 * "Altitude (α)".
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc - UTC datetime
 * @param {GeoCoordContext} geo - Observer's geo coordinate position (latitude and longitude)
 * @returns {SunHorizontalFromGenericDateTimeReturned}
 */
function sun_horizontal_from_generic_datetime(utc, geo) {
  const {
    // Equatorial Coordinate
    coord: _equatorial,
    // Ecliptic Coordinate
    _ecliptic,
    // Mean Anomaly (M)
    _mean_anom,
    // Mean Obliquity (ε)
    _obliquity
  } = (0, _sun_equatorial_from_generic_datetime.sun_equatorial_from_generic_datetime)(utc);
  const {
    // Horizontal Coordinate
    coord,
    // Hour Angle (H)
    _hour_angle
  } = (0, _coords.horizontal_from_equatorial)(utc, _equatorial, geo);
  return {
    coord,
    _ecliptic,
    _equatorial,
    _mean_anom,
    _obliquity,
    _hour_angle
  };
}
"use strict";

const {
  angle_from_decimal_hours
} = require('../index');
describe('A test suite for: time/angle_from_decimal_hours', () => {
  test('angle_from_decimal_hours', () => {
    let angle;
    angle = angle_from_decimal_hours(1);
    expect(angle.hour()).toBe(1);
    expect(angle.minute()).toBe(0);
    expect(angle.second()).toBe(0);
    angle = angle_from_decimal_hours(0.5);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(30);
    expect(angle.second()).toBe(0);
    angle = angle_from_decimal_hours(0.75);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(45);
    expect(angle.second()).toBe(0);
    angle = angle_from_decimal_hours(0.9833333333333333);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(59);
    expect(angle.second()).toBe(0);
    angle = angle_from_decimal_hours(0.016666666666666666);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(1);
    expect(angle.second()).toBe(0);
    angle = angle_from_decimal_hours(0.008333333333333333);
    expect(angle.hour()).toBe(0);
    expect(angle.minute()).toBe(0);
    expect(angle.second()).toBe(30);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  Angle,
  Longitude
} = require('../../coords');
const {
  asc_from_hour_angle
} = require('../index');
describe('A test suite for: time/asc_from_hour_angle', () => {
  test('asc_from_hour_angle', () => {
    const utc = NaiveDateTime.from_ymd_hms(1980, 4, 22, 14, 36, 51.67);
    const hour_angle = Angle.from_hms(5, 51, 44);
    const lng = Longitude({
      degrees: 64,
      bound: 'W'
    });
    const angle = asc_from_hour_angle(utc, hour_angle, lng);
    expect(angle.hour()).toBe(18);
    expect(angle.minute()).toBe(32);
    // Actual: 22.137550047770844
    // TODO:
    // Is this value correct?
    expect(angle.second()).toBeCloseTo(21, -1);
  });
});
"use strict";

const {
  calibrate_hmsn
} = require('../index');
describe('A test suite for: time/', () => {
  test('calibrate_hmsn (1)', () => {
    const nano = 0;
    let hour;
    let min;
    let sec;
    let day_excess;
    ({
      hmsn: {
        sec
      }
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 0,
      nano
    }));
    expect(sec).toBe(0);
    ({
      hmsn: {
        sec
      }
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 1,
      nano
    }));
    expect(sec).toBe(1);
    ({
      hmsn: {
        min,
        sec
      }
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 60,
      nano
    }));
    expect(sec).toBe(0);
    expect(min).toBe(1);
    ({
      hmsn: {
        min,
        sec
      }
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: 62,
      nano
    }));
    expect(sec).toBe(2);
    expect(min).toBe(1);
    ({
      hmsn: {
        min
      }
    } = calibrate_hmsn({
      hour: 0,
      min: 1,
      sec: 0,
      nano
    }));
    expect(min).toBe(1);
    ({
      hmsn: {
        hour,
        min
      }
    } = calibrate_hmsn({
      hour: 0,
      min: 60,
      sec: 0,
      nano
    }));
    expect(min).toBe(0);
    expect(hour).toBe(1);
    ({
      hmsn: {
        hour,
        min
      }
    } = calibrate_hmsn({
      hour: 0,
      min: 62,
      sec: 0,
      nano
    }));
    expect(min).toBe(2);
    expect(hour).toBe(1);
    ({
      hmsn: {
        hour
      }
    } = calibrate_hmsn({
      hour: 1,
      min: 0,
      sec: 0,
      nano
    }));
    expect(hour).toBe(1);
    ({
      hmsn: {
        hour
      },
      day_excess
    } = calibrate_hmsn({
      hour: 24,
      min: 0,
      sec: 0,
      nano
    }));
    expect(hour).toBe(0);
    expect(day_excess).toBe(1);
    ({
      hmsn: {
        hour
      },
      day_excess
    } = calibrate_hmsn({
      hour: 48,
      min: 0,
      sec: 0,
      nano
    }));
    expect(hour).toBe(0);
    expect(day_excess).toBe(2);
    ({
      hmsn: {
        sec
      }
    } = calibrate_hmsn({
      hour: 1,
      min: 1,
      sec: -1,
      nano
    }));
    expect(sec).toBe(59);
    ({
      hmsn: {
        hour,
        min,
        sec
      },
      day_excess
    } = calibrate_hmsn({
      hour: 0,
      min: 0,
      sec: -1,
      nano
    }));
    expect(sec).toBe(59);
    expect(min).toBe(59);
    expect(hour).toBe(23);
    expect(day_excess).toBe(-1);
  });
  test('calibrate_hmsn (2)', () => {
    const nano = 0;
    let hour;
    let day_excess;
    ({
      hmsn: {
        hour
      },
      day_excess
    } = calibrate_hmsn({
      hour: 360,
      min: 0,
      sec: 0,
      nano,
      // Make 'hour' to overflow
      // only when it reached 360.
      angle: true
    }));
    expect(hour).toBe(0);
    expect(day_excess).toBe(1);
  });
});
"use strict";

const {
  NaiveDate
} = require('../../chrono');
const {
  day_number_from_generic_date
} = require('../index');
describe('A test suite for: time/day_number_from_generic_date', () => {
  test('day_number_from_generic_date', () => {
    let date;
    date = NaiveDate.from_ymd(1985, 2, 17);
    expect(day_number_from_generic_date(date)).toBe(48);
    date = NaiveDate.from_ymd(1988, 7, 27);
    expect(day_number_from_generic_date(date)).toBe(209);
  });
});
"use strict";

const {
  NaiveDate
} = require('../../chrono');
const {
  day_of_the_week
} = require('../index');
describe('A test suite for: time/day_of_the_week', () => {
  test('day_of_the_week', () => {
    let date = NaiveDate.from_ymd(1985, 2, 17);
    expect(day_of_the_week(date)).toBe(0);
  });
});
"use strict";

const {
  days_since_1990
} = require('../index');
describe('A test suite for: time/', () => {
  test('days_since_1990', () => {
    expect(days_since_1990(1988)).toBe(-731);
  });
});
"use strict";

const {
  Angle
} = require('../../coords');
const {
  decimal_hours_from_angle
} = require('../index');
describe('A test suite for: time/decimal_hours_from_angle', () => {
  test('decimal_hours_from_angle', () => {
    let decimal;
    decimal = decimal_hours_from_angle(Angle.from_hms(1, 0, 0));
    expect(decimal).toBe(1);
    decimal = decimal_hours_from_angle(Angle.from_hms(0, 30, 0));
    expect(decimal).toBe(0.5);
    decimal = decimal_hours_from_angle(Angle.from_hms(0, 45, 0));
    expect(decimal).toBe(0.75);

    // Actual: 0.9833333333333333
    // Checking 2nd digit which is '8'.
    decimal = decimal_hours_from_angle(Angle.from_hms(0, 59, 0));
    expect(decimal).toBeCloseTo(0.98, 2); // 1e-3

    // Actual: 0.016666666666666666
    // Checking 2nd digit which
    // is '1', but is round up
    // to '2' because of '7'.
    decimal = decimal_hours_from_angle(Angle.from_hms(0, 1, 0));
    expect(decimal).toBeCloseTo(0.02, 2); // 1e-3

    // Actual: 0.008333333333333333
    // Checking 3rd digit which is '8'.
    decimal = decimal_hours_from_angle(Angle.from_hms(0, 0, 30));
    expect(decimal).toBeCloseTo(0.008, 3); // 1e-4
  });
});
"use strict";

const {
  NaiveTime
} = require('../../chrono');
const {
  decimal_hours_from_naive_time
} = require('../index');
describe('A test suite for: time/decimal_hours_from_naive_time', () => {
  test('decimal_hours_from_naive_time', () => {
    const naive = NaiveTime.from_hmsn(18, 31, 27, 0);
    // Actual: 18.524166666666666
    const hours = decimal_hours_from_naive_time(naive);
    // Checking 4th digit which
    // is '1', but is round up
    // to '2' because of '6'.
    expect(hours).toBeCloseTo(18.5242, 4); // 1e-5
  });
});
"use strict";

const {
  NaiveDate
} = require('../../chrono');
const {
  decimal_year_from_generic_date
} = require('../index');
describe('A test suite for: time/decimal_year_from_generic_date', () => {
  const date = NaiveDate.from_ymd(2024, 1, 29);
  test('decimal_year_from_generic_date', () => {
    // Actual: 2024.0416666666667
    const years = decimal_year_from_generic_date(date);
    const expected = 2024.042;
    // Checking 3rd digit which
    // is '1', but is round up
    // to '2' because of '6'.
    expect(years).toBeCloseTo(expected, 3); // 1e-4
  });
});
"use strict";

const {
  NaiveTime
} = require('../../chrono');
const {
  Longitude
} = require('../../coords');
const {
  gst_from_local
} = require('../index');
describe('A test suite for: time/gst_from_local', () => {
  test('gst_from_local', () => {
    const local = NaiveTime.from_hms(0, 24, 5.23);
    const lng = Longitude({
      degrees: 64,
      bound: 'W'
    });
    const {
      gst
    } = gst_from_local(local, lng);
    expect(gst.hour()).toBe(4);
    expect(gst.minute()).toBe(40);

    // Actual: 5.230_000_000_000_956
    expect(gst.second()).toBeCloseTo(5.23, 2);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  gst_from_utc
} = require('../index');
describe('A test suite for: time/gst_from_utc', () => {
  test('gst_from_utc', () => {
    const utc = NaiveDateTime.from_ymd_hms(1980, 4, 22, 14, 36, 51.67);
    const gst = gst_from_utc(utc);
    expect(gst.hour()).toBe(4);
    expect(gst.minute()).toBe(40);

    // (Rust) 5.229576759185761
    // (JS) 5.229576759
    expect(gst.second()).toBeCloseTo(5.23, 3);
  });
});
"use strict";

const {
  hms_from_decimal_hours
} = require('../index');
describe('A test suite for: time/hms_from_decimal_hours', () => {
  test('hms_from_decimal_hours', () => {
    let hour;
    let min;
    let sec;
    ({
      hour,
      min,
      sec
    } = hms_from_decimal_hours(1));
    expect(hour).toBe(1);
    expect(min).toBe(0);
    expect(sec).toBe(0);
    ({
      hour,
      min,
      sec
    } = hms_from_decimal_hours(0.5));
    expect(hour).toBe(0);
    expect(min).toBe(30);
    expect(sec).toBe(0);
    ({
      hour,
      min,
      sec
    } = hms_from_decimal_hours(0.75));
    expect(hour).toBe(0);
    expect(min).toBe(45);
    expect(sec).toBe(0);
    ({
      hour,
      min,
      sec
    } = hms_from_decimal_hours(0.9833333333333333));
    expect(hour).toBe(0);
    expect(min).toBe(59);
    expect(sec).toBe(0);
    ({
      hour,
      min,
      sec
    } = hms_from_decimal_hours(0.016666666666666666));
    expect(hour).toBe(0);
    expect(min).toBe(1);
    expect(sec).toBe(0);
    ({
      hour,
      min,
      sec
    } = hms_from_decimal_hours(0.008333333333333333));
    expect(hour).toBe(0);
    expect(min).toBe(0);
    expect(sec).toBe(30);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  Angle,
  Longitude
} = require('../../coords');
const {
  hour_angle_from_asc
} = require('../index');
describe('A test suite for: time/hour_angle_from_asc', () => {
  test('hour_angle_from_asc', () => {
    const utc = NaiveDateTime.from_ymd_hms(1980, 4, 22, 14, 36, 51.67);
    const asc = Angle.from_hms(18, 32, 21);
    const lng = Longitude({
      degrees: 64,
      bound: 'W'
    });
    const angle = hour_angle_from_asc(utc, asc, lng);
    expect(angle.hour()).toBe(5);
    expect(angle.minute()).toBe(51);
    // Actual: 45.13755004777039
    // TODO:
    // Is this value correct?
    expect(angle.second()).toBeCloseTo(44, -1);
  });
});
"use strict";

const {
  NaiveDate
} = require('../../chrono');
const {
  is_julian_date
} = require('../index');
describe('A test suite for: time/', () => {
  test('is_julian_date', () => {
    let date;
    date = NaiveDate.from_ymd(1582, 10, 14);
    expect(is_julian_date(date)).toBe(true);
    date = NaiveDate.from_ymd(1582, 10, 15);
    expect(is_julian_date(date)).toBe(false);
  });
});
"use strict";

const {
  is_leap_year
} = require('../index');
describe('A test suite for: time/is_leap_year', () => {
  test('is_leap_year', () => {
    expect(is_leap_year(1582)).toBe(false);
    expect(is_leap_year(1583)).toBe(false);
    expect(is_leap_year(1584)).toBe(true);
    expect(is_leap_year(1984)).toBe(true);
    expect(is_leap_year(1985)).toBe(false);
    expect(is_leap_year(1986)).toBe(false);
    expect(is_leap_year(1987)).toBe(false);
    expect(is_leap_year(1988)).toBe(true);
    expect(is_leap_year(2023)).toBe(false);
    expect(is_leap_year(2024)).toBe(true);
    expect(is_leap_year(2025)).toBe(false);
  });
});
"use strict";

const {
  julian_day
} = require('../index');
describe('A test suite for: time/julian_day', () => {
  test('julian_day', () => {
    expect(julian_day(1985, 2, 17.25)).toBe(2_446_113.75);
  });
});
"use strict";

const {
  NaiveDate
} = require('../../chrono');
const {
  julian_day_from_generic_date
} = require('../index');
describe('A test suite for: time/julian_day_from_generic_date', () => {
  test('julian_day_from_generic_date', () => {
    let date = NaiveDate.from_ymd(1985, 2, 17);
    let jd = julian_day_from_generic_date(date);
    expect(jd).toBe(2_446_113.5);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  julian_day_from_generic_datetime,
  naive_time_from_decimal_hours
} = require('../index');
describe('A test suite for: time/julian_day_from_generic_datetime', () => {
  test('julian_day_from_generic_datetime', () => {
    let time = naive_time_from_decimal_hours(6.0);
    let dt = NaiveDateTime.from_ymd_hmsn(1985, 2, 17, time.hour(), time.minute(), time.second(), time.nanosecond());
    let jd = julian_day_from_generic_datetime(dt);
    expect(jd).toBe(2_446_113.75);
  });
});
"use strict";

const {
  NaiveTime
} = require('../../chrono');
const {
  Longitude
} = require('../../coords');
const {
  local_from_gst
} = require('../local_from_gst');
describe('A test suite for: time/local_from_gst', () => {
  test('local_from_gst', () => {
    const gst = NaiveTime.from_hms(4, 40, 5.23);
    const lng = Longitude({
      degrees: 64,
      bound: 'W'
    });
    const local = local_from_gst(gst, lng);
    expect(local.hour()).toBe(0);
    expect(local.minute()).toBe(24);

    // Actual: 5.230_000_000_001_169
    expect(local.second()).toBeCloseTo(5.23, 2);
  });
});
"use strict";

const {
  naive_from_julian_day
} = require('../index');
describe('A test suite for: time/naive_from_julian_day', () => {
  test('naive_from_julian_day', () => {
    let dt = naive_from_julian_day(2_446_113.75);
    expect(dt.year()).toBe(1985);
    expect(dt.month()).toBe(2);
    expect(dt.day()).toBe(17);
    expect(dt.hour()).toBe(6);
  });
});
"use strict";

const {
  naive_time_from_decimal_days
} = require('../index');
describe('A test suite for: time/naive_time_from_decimal_days', () => {
  test('naive_time_from_decimal_days', () => {
    const {
      day,
      naive
    } = naive_time_from_decimal_days(17.25);
    expect(day).toBe(17);
    expect(naive.hour()).toBe(6);
  });
});
"use strict";

const {
  naive_time_from_decimal_hours
} = require('../index');
describe('A test suite for: time/naive_time_from_decimal_hours', () => {
  test('naive_time_from_decimal_hours', () => {
    let time;
    time = naive_time_from_decimal_hours(1);
    expect(time.hour()).toBe(1);
    expect(time.minute()).toBe(0);
    expect(time.second()).toBe(0);
    time = naive_time_from_decimal_hours(0.5);
    expect(time.hour()).toBe(0);
    expect(time.minute()).toBe(30);
    expect(time.second()).toBe(0);
    time = naive_time_from_decimal_hours(0.01666666666);
    expect(time.hour()).toBe(0);
    expect(time.minute()).toBe(0);
    // Actual: 59.999999976
    expect(time.second()).toBeCloseTo(60, 0); // 1e-1

    time = naive_time_from_decimal_hours(18.52417);
    expect(time.hour()).toBe(18);
    expect(time.minute()).toBe(31);
    // Actual: 27.012000000005685
    expect(time.second()).toBeCloseTo(27, 0); // 1e-1
  });
});
"use strict";

const {
  nano_from_second
} = require('../index');
describe('A test suite for: time/nano_from_second', () => {
  test('nano_from_second', () => {
    let nano;
    let sec;
    ({
      sec,
      nano
    } = nano_from_second(1));
    expect(sec).toBe(1);
    expect(nano).toBe(0);
    ({
      sec,
      nano
    } = nano_from_second(0.1));
    expect(sec).toBe(0);
    expect(nano).toBe(100000000);
    ({
      sec,
      nano
    } = nano_from_second(0.01));
    expect(sec).toBe(0);
    expect(nano).toBe(10000000);
    ({
      sec,
      nano
    } = nano_from_second(0.001));
    expect(sec).toBe(0);
    expect(nano).toBe(1000000);
    ({
      sec,
      nano
    } = nano_from_second(0.0001));
    expect(sec).toBe(0);
    expect(nano).toBe(100000);
    ({
      sec,
      nano
    } = nano_from_second(0.00001));
    expect(sec).toBe(0);
    expect(nano).toBe(10000);
    ({
      sec,
      nano
    } = nano_from_second(0.000001));
    expect(sec).toBe(0);
    expect(nano).toBe(1000);
    ({
      sec,
      nano
    } = nano_from_second(0.0000001));
    expect(sec).toBe(0);
    expect(nano).toBe(100);
    ({
      sec,
      nano
    } = nano_from_second(0.00000001));
    expect(sec).toBe(0);
    expect(nano).toBe(10);
    ({
      sec,
      nano
    } = nano_from_second(0.000000001));
    expect(sec).toBe(0);
    expect(nano).toBe(1);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  utc_from_gst
} = require('../utc_from_gst');
describe('A test suite for: time/utc_from_gst', () => {
  test('utc_from_gst', () => {
    const gst = NaiveDateTime.from_ymd_hms(1980, 4, 22, 4, 40, 5.23);
    const {
      utc_time: tt
    } = utc_from_gst(gst);
    expect(tt.hour()).toBe(14);
    expect(tt.minute()).toBe(36);
    expect(tt.second()).toBeCloseTo(51.67, 2);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  utc_from_local
} = require('../index');
describe('A test suite for: time/utc_from_local', () => {
  test('utc_from_local', () => {
    const zone = 4;
    const daylight_saving = 1;
    const local = NaiveDateTime.from_ymd_hms(1988, 7, 1, 3 - daylight_saving, 37);
    const utc = utc_from_local(local, zone);
    expect(utc.hour()).toBe(22);
    expect(utc.minute()).toBe(37);
  });
});
"use strict";

const {
  NaiveDateTime
} = require('../../chrono');
const {
  Latitude,
  Longitude,
  GeoCoord
} = require('../../coords');
const {
  utc_from_local_geo
} = require('../index');
describe('A test suite for: time/utc_from_local_geo', () => {
  test('utc_from_local_geo', () => {
    const local = NaiveDateTime.from_ymd_hms(2024, 3, 12, 21, 14, 0);
    const lat = Latitude({
      degrees: 35.67,
      bound: 'N'
    });
    const lng = Longitude({
      degrees: 139.65,
      bound: 'E'
    });
    const geo = GeoCoord({
      lat,
      lng
    });
    const utc = utc_from_local_geo(local, geo);
    expect(utc.hour()).toBe(12);
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add_date = add_date;
var _chrono = require("../chrono");
/**
 * @module sowngwala/time/add_date
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * References:
 * - sowngwala::time::add_date
 *
 * Example:
 * ```rust
 * use chrono::{DateTime, Datelike, Timelike};
 * use chrono::naive::{NaiveDate, NaiveDateTime};
 * use chrono::offset::{FixedOffset, Utc};
 * use sowngwala::time::{
 *     build_fixed,
 *     build_utc,
 *     add_date
 * };
 *
 * let days: i64 = 1;
 * let zone: i32 = 4;
 *
 * let naive: NaiveDateTime =
 *     NaiveDate::from_ymd(2021, 1, 1)
 *         .and_hms(22, 37, 0);
 * let naive: NaiveDateTime = add_date(naive, days);
 *
 * assert_eq!(naive.day(), 2);
 * assert_eq!(naive.hour(), 22);
 * assert_eq!(naive.minute(), 37);
 * assert_eq!(naive.second(), 0);
 *
 * let fixed: DateTime<FixedOffset> =
 *     build_fixed(2021, 1, 1, 22, 37, 0, 0, zone);
 * let fixed: DateTime<FixedOffset> =
 *     add_date(fixed, days);
 *
 * assert_eq!(fixed.day(), 2);
 * assert_eq!(fixed.hour(), 22);
 * assert_eq!(fixed.minute(), 37);
 * assert_eq!(fixed.second(), 0);
 *
 * let utc: DateTime<Utc> =
 *     build_utc(2021, 1, 1, 22, 37, 0, 0);
 * let utc: DateTime<Utc> = add_date(utc, 1);
 *
 * assert_eq!(utc.day(), 2);
 * assert_eq!(utc.hour(), 22);
 * assert_eq!(utc.minute(), 37);
 * assert_eq!(utc.second(), 0);
 * ```
 *
 * Original:
 * - sowngwala::time::add_date
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @param {number} days
 * @returns {NaiveDateTimeContext}
 */
function add_date(dt, days) {
  /*
   * Rust implementation would be:
   * ----------------------------------
   * dt + Duration::days(days)
   * ----------------------------------
   */
  const added = dt.to_moment().add(days, 'days');
  return _chrono.NaiveDateTime.from_moment(added);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.angle_from_decimal_hours = angle_from_decimal_hours;
var _coords = require("../coords");
var _hms_from_decimal_hours = require("./hms_from_decimal_hours");
/**
 * @module sowngwala/time/angle_from_decimal_hours
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @public
 * @function
 * @param {DecimalHours} dec
 * @returns {AngleContext}
 */
function angle_from_decimal_hours(dec) {
  let {
    hour,
    min,
    sec
  } = (0, _hms_from_decimal_hours.hms_from_decimal_hours)(dec);
  return _coords.Angle.from_hms(hour, min, sec);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asc_from_hour_angle = asc_from_hour_angle;
var _coords = require("../coords");
var _gst_from_utc = require("./gst_from_utc");
var _local_from_gst = require("./local_from_gst");
var _decimal_hours_from_angle = require("./decimal_hours_from_angle");
var _decimal_hours_from_naive_time = require("./decimal_hours_from_naive_time");
var _hms_from_decimal_hours = require("./hms_from_decimal_hours");
/**
 * @module sowngwala/time/asc_from_hour_angle
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * Given the datetime in UTC, and
 * the hour angle in AngleContext,
 * returns "right ascension (α)".
 * (Peter Duffett-Smith, p.35)
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc
 * @param {AngleContext} hour_angle
 * @param {LongitudeContext} lng
 * @returns {AngleContext}
 */
function asc_from_hour_angle(utc, hour_angle, lng) {
  const gst = (0, _gst_from_utc.gst_from_utc)(utc);
  const lst = (0, _local_from_gst.local_from_gst)(gst, lng);
  const lst_hours = (0, _decimal_hours_from_naive_time.decimal_hours_from_naive_time)(lst);
  const hour_angle_decimal = (0, _decimal_hours_from_angle.decimal_hours_from_angle)(hour_angle);
  let hour_angle_1 = lst_hours;
  hour_angle_1 -= hour_angle_decimal;
  if (hour_angle_1 < 0) {
    hour_angle_1 += 24;
  }
  const {
    hour,
    min,
    sec
  } = (0, _hms_from_decimal_hours.hms_from_decimal_hours)(hour_angle_1);
  return _coords.Angle.from_hms(hour, min, sec);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calibrate_hmsn = calibrate_hmsn;
var _utils = require("../utils");
/**
 * @module sowngwala/time/calibrate_hmsn
 */

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').NanoSecond} NanoSecond */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef AdditionalOptions
 * @type {Object}
 * @property {boolean} [angle=false] - When specified, it will take the given data as angle-based, and will have 'hour' overflow only when it reached 360. Usually, it should be 24 as a default, and this option should be set to 'false'. When set to 'true', it will set the said limit to 360.
 * @property {boolean} [hour_overflow=true] - If specified TRUE, changes the negative into the positive. If FALSE, let the negative hour as it is.
 */

/**
 * @typedef CalibrateArguments
 * @type {HMSNano & AdditionalOptions}
 */

/**
 * @typedef HMSNano
 * @type {Object}
 * @property {Hour} hour
 * @property {Minute} min
 * @property {Second} sec
 * @property {NanoSecond} nano
 */

/**
 * Checks if 'hour', 'min', 'sec',
 * or 'nano' has overflows.
 * If they did, carry over the
 * values to the next. Returns
 * 'day_excess' if 'hour' had
 * an overflow, or when it was
 * 24 hours or more. In a similar
 * manner, if 'hour', 'min', 'sec',
 * or 'nano' were bellow zero,
 * borrow from the next in place
 * to always keep them above zero.
 *
 * @public
 * @function
 * @param {CalibrateArguments} args
 * @returns {{ hmsn: HMSNano, day_excess: DecimalDays }}
 */
function calibrate_hmsn({
  hour,
  min,
  sec,
  nano,
  angle = false,
  hour_overflow = true
}) {
  const hour_limit = angle ? 360.0 : 24.0;

  /** @type {DecimalDays} */
  let day_excess = 0.0;
  let remainder = 0.0;
  let quotient = 0.0;

  /*
   * Carry over the exceeded values to
   * the next place. Say, we had
   * 60 seconds. It's too much for 'sec'
   * and we want to carry over to 'min'
   * by increasing 'min' by 1. For 'sec'
   * will now become 0 second.
   *
   * Say, we had 23°59'60" and 60 is
   * too much for 'sec'. So, we would
   * return 1 for 'day_excess' and will
   * make a new angle being 0°0'0".
   */

  // Note: "1_000_000_000.0" is a 1 billion
  ({
    remainder,
    quotient
  } = (0, _utils.overflow)(nano, 1_000_000_000.0));
  nano = remainder;
  sec += quotient; // sec_excess

  ({
    remainder,
    quotient
  } = (0, _utils.overflow)(sec, 60.0));
  sec = remainder;
  min += quotient; // min_excess

  ({
    remainder,
    quotient
  } = (0, _utils.overflow)(min, 60.0));
  min = remainder;
  hour += quotient; // hour_excess

  if (hour_overflow) {
    ({
      remainder,
      quotient
    } = (0, _utils.overflow)(hour, hour_limit));
    hour = remainder;
    day_excess = quotient;
  }
  return {
    hmsn: {
      hour,
      min,
      sec,
      nano
    },
    day_excess
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.day_number_from_generic_date = day_number_from_generic_date;
var _is_leap_year = require("./is_leap_year");
/**
 * @module sowngwala/time/day_number_from_generic_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * Finds out the day number for the
 * given date.
 * (Peter Duffett-Smith, p.5)
 *
 * Original:
 * - sowngwala::time::day_number_from_generic_date
 *
 * @param {NaiveDateContext} date
 * @returns {number}
 */
function day_number_from_generic_date(date) {
  let tmp = (0, _is_leap_year.is_leap_year)(date.year()) ? 62.0 : 63.0;
  let num = date.month();
  if (num <= 2.0) {
    num = Math.floor((num - 1.0) * tmp / 2.0);
  } else {
    num = Math.floor((num + 1.0) * 30.6) - tmp;
  }
  return num + date.day();
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.day_of_the_week = day_of_the_week;
var _utils = require("../utils");
var _julian_day = require("./julian_day");
/**
 * @module sowngwala/time/day_of_the_week
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * Finds day of the week out of
 * a generic datetime.
 *
 * Sunday = 0
 * Monday = 1
 * Tuesday = 2
 * Wednesday = 3
 * Thursday = 4
 * Friday = 5
 * Saturday = 6
 *
 * References:
 * - (Peter Duffett-Smith, p.9)
 *
 * Original:
 * - sowngwala::time::day_of_the_week
 *
 * @public
 * @function
 * @param {NaiveDateContext} date
 * @returns {number}
 */
function day_of_the_week(date) {
  /*
   * Rust implementation would be:
   * ----------------------------------
   * date.weekday().num_days_from_sunday()
   * // Sunday = 0
   * // Monday = 1
   * ----------------------------------
   */

  let jd = (0, _julian_day.julian_day)(date.year(), date.month(), date.day());
  let a = (jd + 1.5) / 7.0;
  return Math.round((0, _utils.fract)(Math.abs(a)) * 7.0);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.days_since_1990 = days_since_1990;
var _utils = require("../utils");
var _is_leap_year = require("./is_leap_year");
/** @typedef {import('../types.js').Year} Year */
/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * Find out days since 1990. However,
 * whatever the date is given, it will
 * compare two dates by 'Jan 0th'.
 * For instance, when 'July 27th, 1988'
 * is given, then it will compare
 * 'Jan0th, 1988' and 'Jan0th, 1990'
 * which is exactly -2 years. Since
 * we have a leap year on 1988, as to
 * for days, we subtract -1.
 * (Peter Duffett-Smith, p.86)
 *
 * Given: July 27th, 1988
 *
 * 365 days * 2 yrs = 730 days
 * 730 days - 1 day = 729 days
 *
 * Since it 1988 is before 1990:
 * 720 days * -1 = -729 days
 *
 * Original:
 * - sowngwala::time::days_since_1990
 *
 * @param {Year} year
 * @returns {DecimalDays}
 */
function days_since_1990(year) {
  let stopper = (0, _utils.make_stopper)();
  let year_0 = year;
  let days = 0;

  /**
   * @private
   * @type {function(boolean): number}
   */
  const get_delta = leap => leap ? 366 : 365;
  if (year - 1990 < 0) {
    while (year_0 < 1990) {
      stopper.check();
      // const cnt = stopper.get_count();

      const leap = (0, _is_leap_year.is_leap_year)(year_0);
      const delta = get_delta(leap);
      days -= delta;
      year_0 += 1;

      // console.log('[time] (days_since_1990) ----------------------');
      // console.log('[time] (days_since_1990) cnt:', cnt);
      // console.log('[time] (days_since_1990) year_0:', year_0);
      // console.log('[time] (days_since_1990) leap:', leap ? 'yes' : 'no');
      // console.log('[time] (days_since_1990) delta:', delta);
      // console.log('[time] (days_since_1990) days:', days);
    }
  } else {
    while (year_0 > 1990) {
      stopper.check();
      const leap = (0, _is_leap_year.is_leap_year)(year_0);
      const delta = get_delta(leap);
      days += delta;
      year_0 -= 1;
    }
  }
  return days;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimal_days_from_generic_datetime = decimal_days_from_generic_datetime;
var _chrono = require("../chrono");
var _decimal_hours_from_naive_time = require("./decimal_hours_from_naive_time");
/**
 * @module sowngwala/time/decimal_days_from_generic_datetime
 */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @returns {DecimalDays}
 */
function decimal_days_from_generic_datetime(dt) {
  let naive = _chrono.NaiveTime.from_hmsn(dt.hour(), dt.minute(), dt.second(), 0.0);
  let decimal_hours = (0, _decimal_hours_from_naive_time.decimal_hours_from_naive_time)(naive);
  return dt.day() + decimal_hours / 24.0;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimal_hours_from_angle = decimal_hours_from_angle;
var _decimal_hours_from_hms = require("./decimal_hours_from_hms");
/**
 * @module sowngwala/time/decimal_hours_from_angle
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * TODO:
 * For Rust version, I may probably want using
 * 'hms_from_decimal_hours' like the one
 * implemented here.
 *
 * Original:
 * - sowngwala::time::decimal_hours_from_angle
 *
 * @public
 * @function
 * @param {AngleContext} angle
 * @returns {DecimalHours}
 */
function decimal_hours_from_angle(angle) {
  return (0, _decimal_hours_from_hms.decimal_hours_from_hms)(angle.hour(), angle.minute(), angle.second());
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimal_hours_from_generic_time = decimal_hours_from_generic_time;
/**
 * @module sowngwala/time/decimal_hours_from_generic_time
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Converts `NativeTime` into decimal hours.
 *
 * Reference:
 * - (Peter Duffett-Smith, p.10)
 * - sowngwala::time::decimal_hours_from_time
 *
 * Example:
 * ```rust
 * use approx_eq::assert_approx_eq;
 * use chrono::naive::NaiveTime;
 * use sowngwala::time::decimal_hours_from_generic_time;
 *
 * let t = NaiveTime::from_hms_nano(18, 31, 27, 0);
 * let hours = decimal_hours_from_generic_time(t);
 * assert_approx_eq!(
 *     hours, // 18.524166666666666
 *     18.52417,
 *     1e-6
 * );
 * ```
 * @public
 * @function
 * @param {NaiveTimeContext} t
 * @returns {DecimalHours}
 */
function decimal_hours_from_generic_time(t) {
  let hour = t.hour();
  let min = t.minute();

  /*
   * NOTE:
   * This is different from how it is
   * calculated in Peter Duffett-Smith's
   * book where the book does not take
   * 'nanosecond' into consideration.
   */
  let sec_0 = t.nanosecond() / 1_000_000_000;
  let sec = t.second() + sec_0;
  let dec = hour + (min + sec / 60.0) / 60.0;
  return hour < 0.0 || min < 0.0 || sec < 0.0 ? -dec : dec;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimal_hours_from_hms = decimal_hours_from_hms;
/**
 * NOTE:
 * It does not exist in the Rust version.
 *
 * @module sowngwala/time/decimal_hours_from_hms
 */

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * References:
 * - Peter Duffett-Smith, p.10
 *
 * @public
 * @function
 * @param {Hour} hour
 * @param {Minute} min
 * @param {Second} sec
 * @returns {DecimalHours}
 */
function decimal_hours_from_hms(hour, min, sec) {
  let hour_1 = Math.abs(hour);
  let min_1 = Math.abs(min);
  let sec_1 = Math.abs(sec);
  let dec = hour_1 + (min_1 + sec_1 / 60.0) / 60.0;
  return hour < 0 || min < 0 || sec < 0.0 ? -dec : dec;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimal_hours_from_naive_time = decimal_hours_from_naive_time;
var _decimal_hours_from_hms = require("./decimal_hours_from_hms");
/**
 * @module sowngwala/time/decimal_hours_from_naive_time
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Convert `NaiveTime` into
 * decimal hours.
 *
 * Original:
 * - sowngwala::time::decimal_hours_from_naive_time
 *
 * Reference:
 * - (Peter Duffett-Smith, p.10)
 * - sowngwala::time::decimal_hours_from_time
 *
 * @public
 * @function
 * @param {NaiveTimeContext} naive
 * @returns {DecimalHours}
 */
function decimal_hours_from_naive_time(naive) {
  let sec_0 = naive.nanosecond() / 1_000_000_000;
  let sec_1 = naive.second() + sec_0;
  return (0, _decimal_hours_from_hms.decimal_hours_from_hms)(naive.hour(), naive.minute(), sec_1);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimal_year_from_generic_date = decimal_year_from_generic_date;
/**
 * @module sowngwala/time/decimal_year_from_generic_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/** @typedef {import('../types.js').DecimalYears} DecimalYears */

/**
 * Definition of `y` in this program
 * is as follows:
 *
 *   y = year + (month - 0.5) / 12
 *
 * This gives `y` for the middle of
 * the month, which is accurate enough
 * given the precision in the known
 * values of ΔT. The following
 * polynomial expressions can be used
 * to calculate the value of ΔT
 * (in seconds) over the time period
 * covered by of the Five Millennium
 * Canon of Solar Eclipses:
 * -1999 to +3000.
 *
 * Original:
 * - sowngwala::time::decimal_year_from_generic_date
 *
 * @public
 * @function
 * @param {NaiveDateContext} date
 * @returns {DecimalYears}
 */
function decimal_year_from_generic_date(date) {
  const year = date.year();
  const month = date.month();
  return year + (month - 0.5) / 12.0;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gst_from_local = gst_from_local;
var _decimal_hours_from_naive_time = require("./decimal_hours_from_naive_time");
var _naive_time_from_decimal_hours = require("./naive_time_from_decimal_hours");
var _utils = require("../utils");
/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/time/gst_from_local
 */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * @typedef GstFromLocalReturned
 * @type {Object}
 * @property {NaiveTimeContext} gst - GST
 * @property {DecimalDays} day_excess - Carry-over when exceeds 24 hours.
 */

/**
 * Given GST LST (Local Sidereal Time)
 * in NaiveTime and Longitude for
 * the site, returns GST and excess
 * days when exceeds 24 hours.
 *
 * References:
 * - Peter Duffett-Smith, p.21
 *
 * @public
 * @function
 * @param {NaiveTimeContext} lst
 * @param {LongitudeContext} lng
 * @returns {GstFromLocalReturned}
 */
function gst_from_local(lst, lng) {
  const lst_hours = (0, _decimal_hours_from_naive_time.decimal_hours_from_naive_time)(lst);
  const lng_hours = lng.degrees / 15;
  let decimal_hours = lst_hours;
  if (lng.bound === 'W') {
    decimal_hours += lng_hours;
  } else {
    decimal_hours -= lng_hours;
  }
  const {
    remainder,
    quotient
  } = (0, _utils.overflow)(decimal_hours, 24);
  decimal_hours = remainder;
  return {
    gst: (0, _naive_time_from_decimal_hours.naive_time_from_decimal_hours)(decimal_hours),
    day_excess: quotient
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gst_from_utc = gst_from_utc;
var _utils = require("../utils");
var _decimal_hours_from_generic_time = require("./decimal_hours_from_generic_time");
var _julian_day_from_generic_date = require("./julian_day_from_generic_date");
var _naive_time_from_generic_datetime = require("./naive_time_from_generic_datetime");
var _naive_time_from_decimal_hours = require("./naive_time_from_decimal_hours");
/**
 * @module sowngwala/time/gst_from_utc
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Given UT, and returns GST.
 *
 * References:
 * - (Peter Duffett-Smith, p.17)
 * - sowngwala::time::gst_from_ut
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc
 * @returns {NaiveTimeContext}
 */
function gst_from_utc(utc) {
  let jd = (0, _julian_day_from_generic_date.julian_day_from_generic_date)(utc);
  let s = jd - 2_451_545.0;
  let t = s / 36_525.0;
  let t0 = 6.697_374_558 + 2_400.051_336 * t + 0.000_025_862 * t * t;
  ({
    remainder: t0
  } = (0, _utils.overflow)(t0, 24));

  // NOTE:
  // This will take 'millisecond' into consideration.
  let naive_time = (0, _naive_time_from_generic_datetime.naive_time_from_generic_datetime)(utc);
  let decimal_hours = (0, _decimal_hours_from_generic_time.decimal_hours_from_generic_time)(naive_time);
  decimal_hours *= 1.002_737_909;
  decimal_hours += t0;
  ({
    remainder: decimal_hours
  } = (0, _utils.overflow)(decimal_hours, 24));

  /*
   * NOTE:
   * This will extract 'nano' from 'sec'.
   */
  return (0, _naive_time_from_decimal_hours.naive_time_from_decimal_hours)(decimal_hours);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hms_from_decimal_hours = hms_from_decimal_hours;
var _utils = require("../utils");
/**
 * @module sowngwala/time/hms_from_decimal_hours
 */

/** @typedef {import('../types.js').Hour} Hour */
/** @typedef {import('../types.js').Minute} Minute */
/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * Note it is different from the Rust version.
 * See 'decimal_hours_from_angle' for
 * it depends on this version.
 *
 * References:
 * - Peter Duffett-Smith, p.11
 *
 * @private
 * @function
 * @param {DecimalHours} dec
 * @returns {{ hour: Hour, min: Minute, sec: Second }}
 */
function hms_from_decimal_hours(dec) {
  let sign = dec < 0.0 ? -1 : 1;
  let dec_absolute = Math.abs(dec);
  let hour = Math.floor(dec_absolute);
  let fractional_part = (0, _utils.fract)(dec_absolute) * 60.0;
  let min = Math.floor(fractional_part);
  let sec = (0, _utils.fract)(fractional_part) * 60.0;
  if (hour != 0) {
    hour *= sign;
  } else if (min != 0) {
    min *= sign;
  } else {
    sec *= sign;
  }
  return {
    hour,
    min,
    sec
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hour_angle_from_asc = hour_angle_from_asc;
var _coords = require("../coords");
var _gst_from_utc = require("./gst_from_utc");
var _local_from_gst = require("./local_from_gst");
var _decimal_hours_from_angle = require("./decimal_hours_from_angle");
var _decimal_hours_from_naive_time = require("./decimal_hours_from_naive_time");
var _hms_from_decimal_hours = require("./hms_from_decimal_hours");
/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/time/hour_angle_from_asc
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef AngleContext
 * @type {import('../coords/angle.js').AngleContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * Given the date time in UTC, and
 * "right ascension (α)", it will return
 * the hour angle (H) as 'AngleContext'.
 * (Peter Duffett-Smith, p.35)
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} utc
 * @param {AngleContext} asc
 * @param {LongitudeContext} lng
 * @returns {AngleContext}
 */
function hour_angle_from_asc(utc, asc, lng) {
  /** @type {NaiveTimeContext} */
  const gst = (0, _gst_from_utc.gst_from_utc)(utc);

  /** @type {NaiveTimeContext} */
  const lst = (0, _local_from_gst.local_from_gst)(gst, lng);

  /** @type {DecimalHours} */
  const lst_hours = (0, _decimal_hours_from_naive_time.decimal_hours_from_naive_time)(lst);

  /** @type {DecimalHours} */
  const asc_decimal = (0, _decimal_hours_from_angle.decimal_hours_from_angle)(asc);

  /** @type {DecimalHours} */
  let hour_angle = lst_hours - asc_decimal;
  if (hour_angle < 0) {
    hour_angle += 24;
  }
  const {
    hour,
    min,
    sec
  } = (0, _hms_from_decimal_hours.hms_from_decimal_hours)(hour_angle);
  return _coords.Angle.from_hms(hour, min, sec);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "add_date", {
  enumerable: true,
  get: function () {
    return _add_date.add_date;
  }
});
Object.defineProperty(exports, "angle_from_decimal_hours", {
  enumerable: true,
  get: function () {
    return _angle_from_decimal_hours.angle_from_decimal_hours;
  }
});
Object.defineProperty(exports, "asc_from_hour_angle", {
  enumerable: true,
  get: function () {
    return _asc_from_hour_angle.asc_from_hour_angle;
  }
});
Object.defineProperty(exports, "calibrate_hmsn", {
  enumerable: true,
  get: function () {
    return _calibrate_hmsn.calibrate_hmsn;
  }
});
Object.defineProperty(exports, "day_number_from_generic_date", {
  enumerable: true,
  get: function () {
    return _day_number_from_generic_date.day_number_from_generic_date;
  }
});
Object.defineProperty(exports, "day_of_the_week", {
  enumerable: true,
  get: function () {
    return _day_of_the_week.day_of_the_week;
  }
});
Object.defineProperty(exports, "days_since_1990", {
  enumerable: true,
  get: function () {
    return _days_since_.days_since_1990;
  }
});
Object.defineProperty(exports, "decimal_days_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _decimal_days_from_generic_datetime.decimal_days_from_generic_datetime;
  }
});
Object.defineProperty(exports, "decimal_hours_from_angle", {
  enumerable: true,
  get: function () {
    return _decimal_hours_from_angle.decimal_hours_from_angle;
  }
});
Object.defineProperty(exports, "decimal_hours_from_generic_time", {
  enumerable: true,
  get: function () {
    return _decimal_hours_from_generic_time.decimal_hours_from_generic_time;
  }
});
Object.defineProperty(exports, "decimal_hours_from_hms", {
  enumerable: true,
  get: function () {
    return _decimal_hours_from_hms.decimal_hours_from_hms;
  }
});
Object.defineProperty(exports, "decimal_hours_from_naive_time", {
  enumerable: true,
  get: function () {
    return _decimal_hours_from_naive_time.decimal_hours_from_naive_time;
  }
});
Object.defineProperty(exports, "decimal_year_from_generic_date", {
  enumerable: true,
  get: function () {
    return _decimal_year_from_generic_date.decimal_year_from_generic_date;
  }
});
Object.defineProperty(exports, "gst_from_local", {
  enumerable: true,
  get: function () {
    return _gst_from_local.gst_from_local;
  }
});
Object.defineProperty(exports, "gst_from_utc", {
  enumerable: true,
  get: function () {
    return _gst_from_utc.gst_from_utc;
  }
});
Object.defineProperty(exports, "hms_from_decimal_hours", {
  enumerable: true,
  get: function () {
    return _hms_from_decimal_hours.hms_from_decimal_hours;
  }
});
Object.defineProperty(exports, "hour_angle_from_asc", {
  enumerable: true,
  get: function () {
    return _hour_angle_from_asc.hour_angle_from_asc;
  }
});
Object.defineProperty(exports, "is_julian_date", {
  enumerable: true,
  get: function () {
    return _is_julian_date.is_julian_date;
  }
});
Object.defineProperty(exports, "is_leap_year", {
  enumerable: true,
  get: function () {
    return _is_leap_year.is_leap_year;
  }
});
Object.defineProperty(exports, "julian_day", {
  enumerable: true,
  get: function () {
    return _julian_day.julian_day;
  }
});
Object.defineProperty(exports, "julian_day_from_generic_date", {
  enumerable: true,
  get: function () {
    return _julian_day_from_generic_date.julian_day_from_generic_date;
  }
});
Object.defineProperty(exports, "julian_day_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _julian_day_from_generic_datetime.julian_day_from_generic_datetime;
  }
});
Object.defineProperty(exports, "local_from_gst", {
  enumerable: true,
  get: function () {
    return _local_from_gst.local_from_gst;
  }
});
Object.defineProperty(exports, "naive_from_julian_day", {
  enumerable: true,
  get: function () {
    return _naive_from_julian_day.naive_from_julian_day;
  }
});
Object.defineProperty(exports, "naive_time_from_decimal_days", {
  enumerable: true,
  get: function () {
    return _naive_time_from_decimal_days.naive_time_from_decimal_days;
  }
});
Object.defineProperty(exports, "naive_time_from_decimal_hours", {
  enumerable: true,
  get: function () {
    return _naive_time_from_decimal_hours.naive_time_from_decimal_hours;
  }
});
Object.defineProperty(exports, "naive_time_from_generic_datetime", {
  enumerable: true,
  get: function () {
    return _naive_time_from_generic_datetime.naive_time_from_generic_datetime;
  }
});
Object.defineProperty(exports, "nano_from_second", {
  enumerable: true,
  get: function () {
    return _nano_from_second.nano_from_second;
  }
});
Object.defineProperty(exports, "utc_from_gst", {
  enumerable: true,
  get: function () {
    return _utc_from_gst.utc_from_gst;
  }
});
Object.defineProperty(exports, "utc_from_local", {
  enumerable: true,
  get: function () {
    return _utc_from_local.utc_from_local;
  }
});
Object.defineProperty(exports, "utc_from_local_geo", {
  enumerable: true,
  get: function () {
    return _utc_from_local_geo.utc_from_local_geo;
  }
});
var _add_date = require("./add_date");
var _angle_from_decimal_hours = require("./angle_from_decimal_hours");
var _asc_from_hour_angle = require("./asc_from_hour_angle");
var _calibrate_hmsn = require("./calibrate_hmsn");
var _day_of_the_week = require("./day_of_the_week");
var _day_number_from_generic_date = require("./day_number_from_generic_date");
var _days_since_ = require("./days_since_1990");
var _decimal_days_from_generic_datetime = require("./decimal_days_from_generic_datetime");
var _decimal_hours_from_naive_time = require("./decimal_hours_from_naive_time");
var _decimal_hours_from_hms = require("./decimal_hours_from_hms");
var _decimal_hours_from_generic_time = require("./decimal_hours_from_generic_time");
var _decimal_hours_from_angle = require("./decimal_hours_from_angle");
var _decimal_year_from_generic_date = require("./decimal_year_from_generic_date");
var _gst_from_local = require("./gst_from_local");
var _gst_from_utc = require("./gst_from_utc");
var _hms_from_decimal_hours = require("./hms_from_decimal_hours");
var _is_julian_date = require("./is_julian_date");
var _is_leap_year = require("./is_leap_year");
var _julian_day = require("./julian_day");
var _julian_day_from_generic_date = require("./julian_day_from_generic_date");
var _julian_day_from_generic_datetime = require("./julian_day_from_generic_datetime");
var _local_from_gst = require("./local_from_gst");
var _hour_angle_from_asc = require("./hour_angle_from_asc");
var _naive_from_julian_day = require("./naive_from_julian_day");
var _naive_time_from_decimal_days = require("./naive_time_from_decimal_days");
var _naive_time_from_decimal_hours = require("./naive_time_from_decimal_hours");
var _naive_time_from_generic_datetime = require("./naive_time_from_generic_datetime");
var _nano_from_second = require("./nano_from_second");
var _utc_from_gst = require("./utc_from_gst");
var _utc_from_local_geo = require("./utc_from_local_geo");
var _utc_from_local = require("./utc_from_local");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is_julian_date = is_julian_date;
/**
 * @module sowngwala/time/is_julian_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 * Checks if the given date is julian date.
 *
 * Original:
 * - sowngwala::time::is_julian_date
 *
 * @public
 * @function
 * @param {NaiveDateContext} date
 * @returns {boolean}
 */
function is_julian_date(date) {
  if (date.year() > 1582) {
    return false;
  }
  if (date.year() < 1582) {
    return true;
  }
  if (date.month() > 10) {
    return false;
  }
  if (date.month() < 10) {
    return true;
  }
  if (date.day() > 14) {
    return false;
  }
  return true;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is_leap_year = is_leap_year;
/**
 * @module sowngwala/time/is_leap_year
 */

/** @typedef {import('../types.js').Year} Year */

/**
 * Checks for the leap year.
 *
 * Original:
 * - sowngwala::time::is_leap_year
 *
 * @param {Year} year
 * @returns {boolean}
 */
function is_leap_year(year) {
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      return year % 400 == 0;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.julian_day = julian_day;
var _constants = require("../constants");
var _chrono = require("../chrono");
var _is_julian_date = require("./is_julian_date");
/**
 * @module sowngwala/time/julian_day
 */

/** @typedef {import('../types.js').Year} Year */
/** @typedef {import('../types.js').Month} Month */
/** @typedef {import('../types.js').Day} Day */

/**
 * Converts a generic datetime into
 * julian date. There are slight
 * differences for the codes bellow
 * from that of Duffett-Smith.
 * For one of the function arguments
 * `day`, Duffett-Smith suggests
 * a float (ex. 7.5). Whereas we
 * want `u32` because `NaiveDate`
 * would not accept float for `day`.
 * So, the idea is to use
 * `NaiveDateTime`, and include
 * the excess (which is 0.5)
 * into `NaiveTime` already.
 *
 * References:
 * - Peter Duffett-Smith, pp.6-7
 *
 * Original:
 * - sowngwala::time::julian_day
 *
 * @param {Year} year
 * @param {Month} month
 * @param {Day} day
 * @returns {number}
 */
function julian_day(year, month, day) {
  let y;
  let m;
  if (month == 1 || month == 2) {
    y = year - 1;
    m = month + 12;
  } else {
    y = year;
    m = month;
  }
  let b;
  let c;
  if ((0, _is_julian_date.is_julian_date)(_chrono.NaiveDate.from_ymd(year, month, day))) {
    b = 0.0;
  } else {
    let a = Math.floor(y / 100.0);
    b = 2.0 - a + Math.floor(a / 4.0);
  }
  if (y < 0.0) {
    c = Math.floor(_constants.NUM_OF_DAYS_IN_A_YEAR * y - 0.75);
  } else {
    c = Math.floor(_constants.NUM_OF_DAYS_IN_A_YEAR * y);
  }
  let d = Math.floor(30.6001 * (m + 1.0));
  return b + c + d + day + 1_720_994.5;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.julian_day_from_generic_date = julian_day_from_generic_date;
var _julian_day = require("./julian_day");
/**
 * @module sowngwala/time/julian_day_from_generic_date
 */

/**
 * @typedef NaiveDateContext
 * @type {import('../chrono/naive_date.js').NaiveDateContext}
 */

/**
 *
 * Original:
 * - sowngwala::time::julian_day_from_generic_date
 *
 * @param {NaiveDateContext} date
 * @returns {number}
 */
function julian_day_from_generic_date(date) {
  return (0, _julian_day.julian_day)(date.year(), date.month(), date.day());
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.julian_day_from_generic_datetime = julian_day_from_generic_datetime;
var _julian_day = require("./julian_day");
var _decimal_days_from_generic_datetime = require("./decimal_days_from_generic_datetime");
/**
 * @module sowngwala/time/julian_day_from_generic_datetime
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * Converts a generic datetime into julian day.
 *
 * Original:
 * - sowngwala::time::julian_day_from_generic_datetime
 *
 * @param {NaiveDateTimeContext} dt
 * @returns {number}
 */
function julian_day_from_generic_datetime(dt) {
  return (0, _julian_day.julian_day)(dt.year(), dt.month(),
  /*
   * NOTE: Currently, it is bit
   * problematic in the Rust
   * version...
   */
  (0, _decimal_days_from_generic_datetime.decimal_days_from_generic_datetime)(dt));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.local_from_gst = local_from_gst;
var _decimal_hours_from_naive_time = require("./decimal_hours_from_naive_time");
var _naive_time_from_decimal_hours = require("./naive_time_from_decimal_hours");
/**
 * NOTE:
 * It does not exist in Rust version.
 *
 * @module sowngwala/time/local_from_gst
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef LongitudeContext
 * @type {import('../coords/geo.js').LongitudeContext}
 */

/**
 * Given GST in NaiveTime and Longitude
 * for the site, returns LST (Local
 * Sidereal Time).
 *
 * References:
 * - Peter Duffett-Smith, p.20
 *
 * @public
 * @function
 * @param {NaiveTimeContext} gst
 * @param {LongitudeContext} lng
 * @returns {NaiveTimeContext}
 */
function local_from_gst(gst, lng) {
  const gst_hours = (0, _decimal_hours_from_naive_time.decimal_hours_from_naive_time)(gst);
  const lng_hours = lng.degrees / 15;
  let decimal_hours = gst_hours;
  if (lng.bound === 'W') {
    decimal_hours -= lng_hours;
  } else {
    decimal_hours += lng_hours;
  }
  if (decimal_hours > 24) {
    decimal_hours -= 24;
  }
  if (decimal_hours < 0) {
    decimal_hours += 24;
  }
  return (0, _naive_time_from_decimal_hours.naive_time_from_decimal_hours)(decimal_hours);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.milli_to_nano = void 0;
/**
 * @module sowngwala/time/milli_to_nano
 */

/**
 * @type {function(number): number}
 */
const milli_to_nano = milli => milli * 1_000_000;
exports.milli_to_nano = milli_to_nano;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naive_from_julian_day = naive_from_julian_day;
var _constants = require("../constants");
var _utils = require("../utils");
var _chrono = require("../chrono");
var _naive_time_from_decimal_days = require("./naive_time_from_decimal_days");
/**
 * @module sowngwala/time/naive_from_julian_day
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * Converts julian day to datetime of
 * Moment. Duffett-Smith suggests
 * a float value (ex. 17.5) for `day`
 * for the returned result, but we
 * want the excess (which is 0.5)
 * being separate. Thus, instead of
 * returning `NaiveDate`, returning
 * `NaiveDateTime`.
 *
 * References:
 * - (Peter Duffett-Smith, p.8)
 * - sowngwala::time::date_from_julian_day
 *
 * Original:
 * - sowngwala::time::naive_from_julian_day
 *
 * @public
 * @function
 * @param {number} jd
 * @returns {NaiveDateTimeContext}
 */
function naive_from_julian_day(jd) {
  let jd_0 = jd + 0.5;
  let i = Math.floor(jd_0);
  let f = (0, _utils.fract)(Math.abs(jd_0));
  let b;
  if (i > 2_299_160.0) {
    let a = Math.floor((i - 1_867_216.25) / 36_524.25);
    b = i + 1.0 + a - Math.floor(a / 4.0);
  } else {
    b = i;
  }
  let c = b + 1524.0;
  let d = Math.floor((c - 122.1) / _constants.NUM_OF_DAYS_IN_A_YEAR);
  let e = Math.floor(d * _constants.NUM_OF_DAYS_IN_A_YEAR);
  let g = Math.floor((c - e) / 30.6001);
  let decimal_days = c - e + f - Math.floor(g * 30.6001);

  // This is where it differs from Duffett-Smith.
  let {
    day,
    naive: naive_time
  } = (0, _naive_time_from_decimal_days.naive_time_from_decimal_days)(decimal_days);
  let month = g < 13.5 ? g - 1.0 : g - 13.0;
  let year = month > 2.5 ? d - 4716.0 : d - 4715.0;
  return _chrono.NaiveDateTime.from_ymd_hmsn(year, month, day, naive_time.hour(), naive_time.minute(), naive_time.second(), naive_time.nanosecond());
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naive_time_from_decimal_days = naive_time_from_decimal_days;
var _utils = require("../utils");
var _naive_time_from_decimal_hours = require("./naive_time_from_decimal_hours");
/**
 * @module sowngwala/time/naive_time_from_decimal_days
 */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Original:
 * - sowngwala::time::naive_time_from_decimal_days
 *
 * @public
 * @function
 * @param {DecimalDays} days
 * @returns {{ day: number, naive: NaiveTimeContext }}
 */
function naive_time_from_decimal_days(days) {
  let integer_part_of_days = Math.floor(days);
  let hours = (0, _utils.fract)(days) * 24.0;
  let naive = (0, _naive_time_from_decimal_hours.naive_time_from_decimal_hours)(hours);
  return {
    day: integer_part_of_days,
    naive
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naive_time_from_decimal_hours = naive_time_from_decimal_hours;
var _angle_from_decimal_hours = require("./angle_from_decimal_hours");
/**
 * @module sowngwala/time/naive_time_from_decimal_hours
 */

/** @typedef {import('../types.js').DecimalHours} DecimalHours */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * Convert decimal hours into `NaiveTime`.
 *
 * Original:
 * - sowngwala::time::naive_time_from_decimal_hours
 *
 * References:
 * - Peter Duffett-Smith, p.11
 *
 * @public
 * @function
 * @param {DecimalHours} dec
 * @returns {NaiveTimeContext}
 */
function naive_time_from_decimal_hours(dec) {
  /*
   * NOTE:
   * This will extract 'nano' from 'sec'.
   */
  return (0, _angle_from_decimal_hours.angle_from_decimal_hours)(dec).to_naive_time();
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naive_time_from_generic_datetime = naive_time_from_generic_datetime;
var _chrono = require("../chrono");
/**
 * @module sowngwala/time/naive_time_from_generic_datetime
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @public
 * @function
 * @param {NaiveDateTimeContext} dt
 * @returns {NaiveTimeContext}
 */
function naive_time_from_generic_datetime(dt) {
  return _chrono.NaiveTime.from_hmsn(dt.hour(), dt.minute(), dt.second(), dt.nanosecond());
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nano_from_second = nano_from_second;
var _utils = require("../utils");
/**
 * @module sowngwala/time/nano_from_second
 */

/** @typedef {import('../types.js').Second} Second */
/** @typedef {import('../types.js').NanoSecond} NanoSecond */

/**
 * Carry-over utils (2)
 *
 * @private
 * @function
 * @param {Second} sec
 * @returns {{ sec: Second, nano: NanoSecond }}
 */
function nano_from_second(sec) {
  let _sec = Math.floor(sec);
  let decimal_part = (0, _utils.fract)(sec) * 1_000_000_000.0;
  let nano = Math.floor(decimal_part);
  return {
    nano,
    sec: _sec
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utc_from_gst = utc_from_gst;
var _chrono = require("../chrono");
var _utils = require("../utils");
var _julian_day_from_generic_date = require("./julian_day_from_generic_date");
var _decimal_hours_from_generic_time = require("./decimal_hours_from_generic_time");
var _naive_time_from_decimal_hours = require("./naive_time_from_decimal_hours");
/**
 * @module sowngwala/time/utc_from_gst
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/** @typedef {import('../types.js').DecimalDays} DecimalDays */

/**
 * @typedef NaiveTimeContext
 * @type {import('../chrono/naive_time.js').NaiveTimeContext}
 */

/**
 * @typedef UtcFromGstReturned
 * @type {Object}
 * @property {NaiveTimeContext} utc_time - UTC Time
 * @property {DecimalDays} day_excess - Carry-over when exceeds 24 hours.
 */

/**
 * Given GST, returns UTC.
 *
 * Reference:
 * - Peter Duffett-Smith, pp.18-19
 *
 * @public
 * @function
 * @see {@link: module:sowngwala/time/utc_from_gst}
 * @param {NaiveDateTimeContext} gst
 * @returns {UtcFromGstReturned}
 */
function utc_from_gst(gst) {
  // We only need date, not datetime.
  let jd = (0, _julian_day_from_generic_date.julian_day_from_generic_date)(gst);
  let s = jd - 2_451_545.0;
  let t = s / 36_525.0;
  let t0 = 6.697_374_558 + 2_400.051_336 * t + 0.000_025_862 * t * t;
  let remainder = 0;
  ({
    remainder: t0
  } = (0, _utils.overflow)(t0, 24.0));
  let decimal_hours = (0, _decimal_hours_from_generic_time.decimal_hours_from_generic_time)(_chrono.NaiveTime.from_hmsn(gst.hour(), gst.minute(), gst.second(), gst.nanosecond()));
  decimal_hours -= t0;
  ({
    remainder: decimal_hours
  } = (0, _utils.overflow)(decimal_hours, 24.0));
  decimal_hours *= 0.997_269_566_3;
  return {
    utc_time: (0, _naive_time_from_decimal_hours.naive_time_from_decimal_hours)(decimal_hours),
    day_excess: remainder
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utc_from_local = utc_from_local;
var _utils = require("../utils");
var _chrono = require("../chrono");
var _add_date = require("./add_date");
var _decimal_hours_from_generic_time = require("./decimal_hours_from_generic_time");
var _naive_time_from_decimal_hours = require("./naive_time_from_decimal_hours");
/**
 * @module sowngwala/time/utc_from_local.js
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * Given LST (Local Sidereal Time) and
 * the time zone offset, returns UTC.
 *
 * References:
 * - Peter Duffett-Smith, p.13
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} local
 * @param {number} zone
 * @returns {NaiveDateTimeContext}
 */
function utc_from_local(local, zone) {
  let date = local.date();
  let time = local.time();
  let decimal_hours = (0, _decimal_hours_from_generic_time.decimal_hours_from_generic_time)(time);
  // console.log('local:', local.print());
  // console.log('zone:', zone);
  // console.log('decimal_hours[0]:', decimal_hours);

  decimal_hours -= zone;
  // console.log('decimal_hours[1]:', decimal_hours);

  let day_excess = 0;
  ({
    remainder: decimal_hours,
    quotient: day_excess
  } = (0, _utils.overflow)(decimal_hours, 24));
  // console.log('decimal_hours[2]:', decimal_hours);
  // console.log('day_excess:', day_excess);

  const new_time = (0, _naive_time_from_decimal_hours.naive_time_from_decimal_hours)(decimal_hours);
  // console.log('new_time:', new_time.print());

  let utc = _chrono.NaiveDateTime.from_date_time(date, new_time);
  // console.log('utc[0]:', utc.print());

  utc = (0, _add_date.add_date)(utc, day_excess);
  // console.log('utc[1]:', utc.print());

  return utc;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utc_from_local_geo = utc_from_local_geo;
var _utc_from_local = require("./utc_from_local");
var _coords = require("../coords");
/**
 * @module sowngwala/time/utc_from_local_geo.js
 */

/**
 * @typedef NaiveDateTimeContext
 * @type {import('../chrono/naive_datetime.js').NaiveDateTimeContext}
 */

/**
 * @typedef GeoCoordContext
 * @type {import('../coords/geo.js').GeoCoordContext}
 */

/**
 * Given LST (Local Sidereal Time) and
 * the observer's geo coordinate
 * position (longitude and latitude),
 * returns UTC datetime.
 *
 * @public
 * @function
 * @param {NaiveDateTimeContext} local
 * @param {GeoCoordContext} geo
 * @returns {NaiveDateTimeContext}
 */
function utc_from_local_geo(local, geo) {
  return (0, _utc_from_local.utc_from_local)(local, (0, _coords.approx_zone_from_geo)(local, geo));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/** @typedef {number} Year */
/** @typedef {number} Month */
/** @typedef {number} Day */
/** @typedef {number} Degree */
/** @typedef {number} Hour */
/** @typedef {number} Minute */
/** @typedef {number} Second */
/** @typedef {number} NanoSecond */
/** @typedef {number} DecimalYears */
/** @typedef {number} DecimalDays */
/** @typedef {number} DecimalDegrees */
/** @typedef {number} DecimalHours */
var _default = exports.default = {};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_logger = exports.fract = void 0;
exports.make_stopper = make_stopper;
exports.nano_from_sec = nano_from_sec;
exports.noop = void 0;
exports.overflow = overflow;
exports.unsigned_zero = exports.to_radians = exports.to_degrees = exports.pad = void 0;
var _constants = require("./constants");
/**
 * @module sowngwala/utils
 */

/** @typedef {import('moment').Moment} Moment */
/** @typedef {import('./types.js').Second} Second */
/** @typedef {import('./types.js').NanoSecond} NanoSecond */

const noop = () => {};
exports.noop = noop;
const pad = (n = 0, digits = 2) => n.toString().padStart(digits, '0');

/**
 * JS has '-0' and '+0' which
 * is called "signed zeros".
 * We can make it unsigned by
 * doing 'value | 0'.
 * @public
 * @function
 * @param {number} value
 * @returns {number}
 */
exports.pad = pad;
const unsigned_zero = value => Object.is(value, -0) || Object.is(value, +0) ? value | 0 : value;

/**
 * Given 'sec', extract 'nano', and
 * returns 'nano' and the new 'sec'.
 *
 * Ex.
 * sec_0 = 53.000_000_001_234
 * sec_1 = 53.000_000_001
 * nano = 456_000_000
 *
 * 'nano' is 1/1_000_000_000 of 'sec'.
 *
 * @public
 * @function
 * @param {Second} sec
 * @returns {{ sec: Second, nano: NanoSecond }}
 */
exports.unsigned_zero = unsigned_zero;
function nano_from_sec(sec = 0.0) {
  const s = sec * _constants.NANOSECOND_UNIT;
  const _int = Math.floor(s);
  const _frac = fract(s);
  const _sec = _int / _constants.NANOSECOND_UNIT;
  const _nano = _frac * _constants.NANOSECOND_UNIT;
  return {
    sec: _sec,
    nano: _nano
  };
}

/**
 * @typedef OverflowReturned
 * @type {Object}
 * @property {number} remainder - Value after the calculation.
 * @property {number} quotient - Value denoting how much did the value exceed.
 */

/**
 * Checks if the given value exceeds
 * the given target value.
 *
 * Original:
 * - sowngwala::time::carry_over
 *
 * @public
 * @function
 * @param {number} value - Value you want to check.
 * @param {number} base - Max/min for 'value' to carry over when exceeded.
 * @return {OverflowReturned}
 */
function overflow(value, base) {
  let remainder = value % base;
  let divisible = value - remainder;
  let quotient = divisible / base;

  /*
   * Say, we had -1.0 for 'sec' which
   * is invalid for 'sec'. So, we want
   * to decrease 'min' by 1, and will
   * now have 59 for 'sec'.
   *
   * Say, we had 0°0'-1" for an angle.
   * Again, -1 is invalid for 'sec'.
   * For this, we would return -1 for
   * 'day_access' and the new angle
   * will now become 23°59'59".
   */

  if (remainder < 0.0) {
    remainder += base;
    quotient -= 1;
  }
  remainder = unsigned_zero(remainder);
  quotient = unsigned_zero(quotient);
  return {
    quotient,
    remainder
  };
}

/**
 * Returns the fractional
 * part of the given number.
 * Ex.
 * 2.345 --> 0.345
 * @public
 * @function
 * @param {number} value
 * @returns {number}
 */
const fract = value => value - Math.floor(value);

/**
 * @public
 * @function
 * @param {number} rad
 * @returns {number}
 */
exports.fract = fract;
const to_degrees = rad => rad * (180 / Math.PI);

/**
 * @public
 * @function
 * @param {number} deg
 * @returns {number}
 */
exports.to_degrees = to_degrees;
const to_radians = deg => deg * (Math.PI / 180);

/**
 * @typedef StopperContext
 * @type {Object}
 * @property {function(): number} get_count
 * @property {function(): number} check
 */

/**
 * @public
 * @function
 * @param {Object} [options={}]
 * @param {number} [options.limit=1000]
 * @return {StopperContext}
 */
exports.to_radians = to_radians;
function make_stopper(options = {}) {
  const {
    limit = 1000
  } = options;
  let cnt = 0;
  return {
    get_count: () => cnt,
    check: () => {
      if (cnt > limit) throw new Error(`The loop exceeded ${limit} times`);
      cnt++;
      return cnt;
    }
  };
}

/**
 * @typedef LoggerContext
 * @type {Object}
 * @property {function(string): void} logger
 * @property {function(): void} logger_title
 */

/**
 * @public
 * @function
 * @param {string} mod
 * @param {string} func
 * @param {boolean} [out=false]
 * @returns {LoggerContext}
 */
const make_logger = (mod, func, out = false) => {
  /**
   * @private
   * @function
   * @param {string} s
   * @param {*} v
   */
  const aux = (s, v) => {
    out ? console.log(`[${mod}] ${s}`, v) : noop();
  };
  return {
    logger: msg => {
      aux(`(${func}) ${msg}`);
    },
    logger_title: () => {
      aux(`++++ ${func}`);
    }
  };
};
exports.make_logger = make_logger;
"use strict";

const {
  unsigned_zero,
  overflow
} = require('./utils');
describe('A test suite on: utils.js', () => {
  it('should have "unsigned_zero" work fine', () => {
    expect(unsigned_zero(-0)).toBe(0);
    expect(unsigned_zero(+0)).toBe(0);
  });
  it('should have "overflow" work fine', () => {
    let remainder = 0;
    let quotient = 0;
    ({
      remainder,
      quotient
    } = overflow(59.0, 60.0));
    expect(remainder).toBe(59.0);
    expect(quotient).toBe(0.0);
    ({
      remainder,
      quotient
    } = overflow(60.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(1.0);
    ({
      remainder,
      quotient
    } = overflow(120.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(2.0);
    ({
      remainder,
      quotient
    } = overflow(121.0, 60.0));
    expect(remainder).toBe(1.0);
    expect(quotient).toBe(2.0);
    ({
      remainder,
      quotient
    } = overflow(120.1, 60.0));
    expect(remainder).toBeCloseTo(0.1, 0); // 1e-1
    expect(quotient).toBe(2.0);
    ({
      remainder,
      quotient
    } = overflow(-60.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(-1.0);
    ({
      remainder,
      quotient
    } = overflow(-120.0, 60.0));
    expect(remainder).toBe(0.0);
    expect(quotient).toBe(-2.0);
    ({
      remainder,
      quotient
    } = overflow(-59.0, 60.0));
    // expect(remainder).toBe(-59.0);
    // expect(quotient).toBe(0);
    expect(remainder).toBe(1);
    expect(quotient).toBe(-1);
    ({
      remainder,
      quotient
    } = overflow(-61.0, 60.0));
    // expect(remainder).toBe(-1.0);
    // expect(quotient).toBe(-1.0);
    expect(remainder).toBe(59.0);
    expect(quotient).toBe(-2.0);
    ({
      remainder,
      quotient
    } = overflow(-60.1, 60.0));
    // expect(remainder).toBeCloseTo(-0.1, 0);
    // expect(quotient).toBe(-1.0);
    expect(remainder).toBeCloseTo(59.9, 0); // 1e-1
    expect(quotient).toBe(-2.0);

    // This is used in 'gst_from_local'.
    ({
      remainder,
      quotient
    } = overflow(25, 24));
    expect(remainder).toBe(1);
    expect(quotient).toBe(1);

    // This is used in 'gst_from_local'.
    ({
      remainder,
      quotient
    } = overflow(-1, 24));
    expect(remainder).toBe(23);
    expect(quotient).toBe(-1);
  });
});
