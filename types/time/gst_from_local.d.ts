export function gst_from_local(lst: NaiveTimeContext, lng: LongitudeContext): GstFromLocalReturned;
export type DecimalDays = import('../types.js').DecimalDays;
export type NaiveTimeContext = import('../chrono/naive_time.js').NaiveTimeContext;
export type LongitudeContext = import('../coords/geo.js').LongitudeContext;
export type GstFromLocalReturned = {
    gst: NaiveTimeContext;
    day_excess: DecimalDays;
};
