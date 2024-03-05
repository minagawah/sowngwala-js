export function eot_from_gst(gst: NaiveDateTimeContext): EOTFromGSTReturned;
export type Moment = import('moment').Moment;
export type DecimalDays = import('../types.js').DecimalDays;
export type NaiveTimeContext = import('../chrono/naive_time.js').NaiveTimeContext;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type AngleContext = import('../coords/angle.js').AngleContext;
export type EquaCoordContext = import('../coords/equatorial.js').EquaCoordContext;
export type EOTFromGSTReturned = {
    angle: AngleContext;
    day_excess: DecimalDays;
};
