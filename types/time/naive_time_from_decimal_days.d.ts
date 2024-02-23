export function naive_time_from_decimal_days(days: DecimalDays): {
    day: number;
    naive: NaiveTimeContext;
};
export type DecimalDays = import('../types.js').DecimalDays;
export type NaiveTimeContext = import('../chrono/naive_time.js').NaiveTimeContext;
