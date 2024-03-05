/**
 * @module sowngwala/time
 */

export { add_date } from './add_date';
export { angle_from_decimal_hours } from './angle_from_decimal_hours';
export { asc_from_hour_angle } from './asc_from_hour_angle';
export { calibrate_hmsn } from './calibrate_hmsn';
export { day_of_the_week } from './day_of_the_week';
export { day_number_from_generic_date } from './day_number_from_generic_date';
export { days_since_1990 } from './days_since_1990';
export { decimal_days_from_generic_datetime } from './decimal_days_from_generic_datetime';
export { decimal_hours_from_naive_time } from './decimal_hours_from_naive_time';
export { decimal_hours_from_hms } from './decimal_hours_from_hms';
export { decimal_hours_from_generic_time } from './decimal_hours_from_generic_time';
export { decimal_hours_from_angle } from './decimal_hours_from_angle';
export { decimal_year_from_generic_date } from './decimal_year_from_generic_date';
export { gst_from_local } from './gst_from_local';
export { gst_from_utc } from './gst_from_utc';
export { hms_from_decimal_hours } from './hms_from_decimal_hours';
export { is_julian_date } from './is_julian_date';
export { is_leap_year } from './is_leap_year';
export { julian_day } from './julian_day';
export { julian_day_from_generic_date } from './julian_day_from_generic_date';
export { julian_day_from_generic_datetime } from './julian_day_from_generic_datetime';
export { local_from_gst } from './local_from_gst';
export { hour_angle_from_asc } from './hour_angle_from_asc';
export { naive_from_julian_day } from './naive_from_julian_day';
export { naive_time_from_decimal_days } from './naive_time_from_decimal_days';
export { naive_time_from_decimal_hours } from './naive_time_from_decimal_hours';
export { naive_time_from_generic_datetime } from './naive_time_from_generic_datetime';
export { nano_from_second } from './nano_from_second';
export { utc_from_gst } from './utc_from_gst';
export { utc_from_local_geo } from './utc_from_local_geo';
export { utc_from_local } from './utc_from_local';

// export function j2000_from_julian_day(jd) {
//   return jd - J2000;
// }

// export function j2000_from_generic_datetime(dt) {
//   return j2000_from_julian_day(
//     julian_day_from_generic_datetime(dt)
//   );
// }

// export function modified_julian_day_from_julian_day(jd) {
//   return jd - 2_400_000.5;
// }

// export function modified_julian_day_from_generic_datetime(
//   dt
// ) {
//   return modified_julian_day_from_julian_day(
//     julian_day_from_generic_datetime(dt)
//   );
// }

// Example:
// ```rust
// use chrono::{
//   DateTime,
//   Datelike,
//   Timelike,
// };
// use chrono::naive::NaiveTime;
// use chrono::offset::{FixedOffset, Utc};
// use sowngwala::time::{
//     build_fixed,
//     eot_fortified_utc_from_fixed
// };
//
// let zone: i32 = 9;
// let fixed: DateTime<FixedOffset> =
//     build_fixed(2021, 1, 1, 9, 0, 0, 0, zone);
// let utc: DateTime<Utc> =
//     eot_fortified_utc_from_fixed(fixed);
//
// assert_eq!(utc.year(), 2020);
// assert_eq!(utc.month(), 12);
// assert_eq!(utc.day(), 31);
// assert_eq!(utc.hour(), 23);
// assert_eq!(utc.minute(), 59);
// assert_eq!(utc.second(), 34); // 34.227691152289594
// assert_eq!(utc.nanosecond(), 227_691_152);
// ```
// @public
// @function
// @param {Moment} utc
// @returns {EOTDecimalFromUTCReturned}

// export function eot_fortified_utc_from_fixed(
//     fixed: DateTime<FixedOffset>,
// ) -> DateTime<Utc> {
//     let utc_0: DateTime<Utc> = utc_from_fixed(fixed);
//
//     let utc_decimal =
//         decimal_hours_from_generic_time(
//             naive_from_utc(utc_0),
//         );
//     let (eot_decimal, day_excess): (f64, f64) =
//         eot_decimal_from_utc(utc_0);
//
//     let mut angle: Angle = angle_from_decimal_hours(
//         utc_decimal + eot_decimal,
//     );
//     angle.calibrate();
//     let t: NaiveTime = angle.to_naive_time();
//
//     let utc_1: DateTime<Utc> =
//         add_date(utc_0, day_excess as i64);
//
//     build_utc(
//         utc_1.year(),
//         utc_1.month(),
//         utc_1.day(),
//         t.hour(),
//         t.minute(),
//         t.second(),
//         t.nanosecond(),
//     )
// }
