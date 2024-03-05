export function approx_zone_from_geo(local: NaiveDateTimeContext, geo: GeoCoordContext): number;
export function zone_format(zone: number): string;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type GeoCoordContext = import('./geo.js').GeoCoordContext;
