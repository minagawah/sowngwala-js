export function sun_pos_horizontal(utc: NaiveDateTimeContext, geo: GeoCoordContext): SunPosHorizontalReturned;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type AngleContext = import('../coords/angle.js').AngleContext;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type EquaCoordContext = import('../coords/equatorial.js').EquaCoordContext;
export type GeoCoordContext = import('../coords/geo.js').GeoCoordContext;
export type HorizonCoordContext = import('../coords/horizontal.js').HorizonCoordContext;
export type SunPosHorizontalReturned = {
    coord: HorizonCoordContext;
    _equatorial: EquaCoordContext;
    _ecliptic: EcliCoordContext;
    _mean_anom: number;
    _obliquity: number;
    _hour_angle: AngleContext;
};
