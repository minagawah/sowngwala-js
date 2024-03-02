export function asc_from_hour_angle(utc: Moment, hour_angle: AngleContext, lng: LongitudeContext): AngleContext;
export type Moment = import('moment').Moment;
export type AngleContext = import('../coords/angle.js').AngleContext;
export type NaiveTimeContext = import('../chrono/naive_time.js').NaiveTimeContext;
export type LongitudeContext = import('../coords/geo.js').LongitudeContext;
