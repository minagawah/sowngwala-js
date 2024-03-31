export function sun_horizontal_from_generic_datetime(utc: NaiveDateTimeContext, geo: GeoCoordContext): SunHorizontalFromGenericDateTimeReturned;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type AngleContext = import('../coords/angle.js').AngleContext;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type EquaCoordContext = import('../coords/equatorial.js').EquaCoordContext;
export type GeoCoordContext = import('../coords/geo.js').GeoCoordContext;
export type HorizonCoordContext = import('../coords/horizontal.js').HorizonCoordContext;
export type SunHorizontalFromGenericDateTimeReturned = {
    coord: HorizonCoordContext;
    _equatorial: EquaCoordContext;
    _ecliptic: EcliCoordContext;
    _mean_anom: number;
    _obliquity: number;
    _hour_angle: AngleContext;
};
