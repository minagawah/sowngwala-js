export function eot_decimal_from_utc(utc: NaiveDateTimeContext): EOTDecimalFromUTCReturned;
export type DecimalHours = import('../types.js').DecimalHours;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type EOTDecimalFromUTCReturned = {
    decimal: DecimalHours;
    day_excess: DecimalHours;
};
