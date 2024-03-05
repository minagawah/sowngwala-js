export function utc_from_gst(gst: NaiveDateTimeContext): UtcFromGstReturned;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type DecimalDays = import('../types.js').DecimalDays;
export type NaiveTimeContext = import('../chrono/naive_time.js').NaiveTimeContext;
export type UtcFromGstReturned = {
    utc_time: NaiveTimeContext;
    day_excess: DecimalDays;
};
