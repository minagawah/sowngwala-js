export function hms_from_decimal_hours(dec: DecimalHours): {
    hour: Hour;
    min: Minute;
    sec: Second;
};
export type Hour = import('../types.js').Hour;
export type Minute = import('../types.js').Minute;
export type Second = import('../types.js').Second;
export type DecimalHours = import('../types.js').DecimalHours;
