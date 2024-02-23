export function eot_from_utc(utc: Moment): EOTFromUTCReturned;
export type DecimalDays = import('../types.js').DecimalDays;
export type AngleContext = import('../coords/angle.js').AngleContext;
export type EOTFromUTCReturned = {
    eot: AngleContext;
    day_excess: DecimalDays;
};
export type Moment = import('moment').Moment;
