export function horizontal_from_equatorial(utc: Moment, equa_coord: EquaCoordContext, geo_coord: GeoCoordContext): HorizontalFromEquatorialReturned;
export type Moment = import('moment').Moment;
export type AngleContext = import('./angle.js').AngleContext;
export type EquaCoordContext = import('./equatorial.js').EquaCoordContext;
export type GeoCoordContext = import('./geo.js').GeoCoordContext;
export type HorizonCoordContext = import('./horizontal.js').HorizonCoordContext;
export type HorizontalFromEquatorialReturned = {
    coord: HorizonCoordContext;
    _hour_angle: AngleContext;
};
