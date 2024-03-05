export function eot_from_utc(utc: NaiveDateTimeContext): EOTFromUTCReturned;
export type DecimalDays = import('../types.js').DecimalDays;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type AngleContext = import('../coords/angle.js').AngleContext;
export type EOTFromUTCReturned = {
    eot: AngleContext;
    day_excess: DecimalDays;
};
