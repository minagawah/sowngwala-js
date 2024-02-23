export function eot_decimal_from_utc(utc: Moment): EOTDecimalFromUTCReturned;
export type Moment = import('moment').Moment;
export type DecimalHours = import('../types.js').DecimalHours;
export type EOTDecimalFromUTCReturned = {
    decimal: DecimalHours;
    day_excess: DecimalHours;
};
