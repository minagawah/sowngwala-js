export function horizontal_from_equatorial_with_hour_angle(hour_angle: AngleContext, dec: AngleContext, lat: LatitudeContext): HorizontalFromEquatorialWithHourAngleReturned;
export type AngleContext = import('./angle.js').AngleContext;
export type LatitudeContext = import('./geo.js').LatitudeContext;
export type HorizonCoordContext = import('./horizontal.js').HorizonCoordContext;
export type HorizontalFromEquatorialWithHourAngleReturned = {
    coord: HorizonCoordContext;
};
