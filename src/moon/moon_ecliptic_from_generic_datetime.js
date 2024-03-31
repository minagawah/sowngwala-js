/**
 * @module sowngwala/moon/moon_ecliptic_from_generic_datetime
 */

import {
  INCLINATION_OF_THE_MOON_ORBIT,
  MEAN_LONGITUDE_OF_PERIGEE_AT_THE_EPOCH,
  MEAN_LONGITUDE_OF_THE_NODE_AT_THE_EPOCH,
  MOON_MEAN_LONGITUDE_AT_THE_EPOCH,
} from '../constants';

import { to_radians, to_degrees } from '../utils';
import { delta_t_from_generic_date } from '../delta_t';
import { Angle, EcliCoord } from '../coords';
import { longitude_and_mean_anomaly } from '../sun';

import {
  day_number_from_generic_date,
  days_since_1990,
  decimal_hours_from_angle,
} from '../time';

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
export function moon_ecliptic_from_generic_datetime(dt) {
  let date = dt.date();

  /*
   * [Step 1]
   * (Peter Duffett-Smith, p.144)
   */
  let day_number = day_number_from_generic_date(date);

  let delta_t = delta_t_from_generic_date(date);

  let angle = Angle.from_hms(
    dt.hour(),
    dt.minute(),
    // TODO: Don't we need nanosecond?
    dt.second() + delta_t
  );

  let hours = decimal_hours_from_angle(angle);

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
  let days = days_since_1990(date.year()) + days_jan_0;

  /*
   * [Step 3]
   * Sun's "longitude (λ)" and "mean anomaly (M)"
   */
  let { lng: sun_lng, mean_anom: sun_mean_anom } =
    longitude_and_mean_anomaly(days);

  // console.log('[moon] days:', days);
  // console.log('[moon] sun_lng:', sun_lng);
  // console.log('[moon] sun_mean_anom:', sun_mean_anom);

  /*
   * [Step 4]
   * Moon's "mean longitude (l)"
   */
  let l =
    13.176_396_6 * days + MOON_MEAN_LONGITUDE_AT_THE_EPOCH;

  l -= 360.0 * Math.floor(l / 360.0);

  /*
   * [Step 5]
   * Moon's "mean anomaly (Mm)"
   */
  let mm =
    l -
    0.111_404_1 * days -
    MEAN_LONGITUDE_OF_PERIGEE_AT_THE_EPOCH;

  mm -= 360.0 * Math.floor(mm / 360.0);

  /*
   * [Step 6]
   * Acending node's mean longitude (N).
   */
  let n =
    MEAN_LONGITUDE_OF_THE_NODE_AT_THE_EPOCH -
    0.052_953_9 * days;

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
  let ev = 1.2739 * Math.sin(to_radians(2.0 * c - mm));

  let sun_mean_anom_sin = Math.sin(
    to_radians(sun_mean_anom)
  );

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
  let ec = 6.2886 * Math.sin(to_radians(mm));

  /*
   * [Step 11]
   * The fourth correction (A4)
   */
  let a4 = 0.214 * Math.sin(to_radians(2.0 * mm));

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
  let v =
    0.6583 * Math.sin(to_radians(2.0 * (l - sun_lng)));

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

  let l_minus_n = to_radians(l - n);

  /*
   * [Step 16]
   */
  let y =
    Math.sin(l_minus_n) *
    Math.cos(to_radians(INCLINATION_OF_THE_MOON_ORBIT));

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
  let lng = to_degrees(tmp);

  /*
   * [Step 19]
   */
  lng += n;

  // Ecliptic latitude (βm)
  let lat =
    Math.sin(l_minus_n) *
    to_degrees(
      Math.asin(
        Math.sin(to_radians(INCLINATION_OF_THE_MOON_ORBIT))
      )
    );

  // console.log('[moon] tmp:', tmp);
  // console.log('[moon] lng[0]:', lng);
  // console.log('[moon] lng[1]:', lng);
  // console.log('[moon] lat:', lat);

  return EcliCoord({ lat, lng });
}
