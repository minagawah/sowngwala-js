export function sun_pos_equatorial(utc: NaiveDateTimeContext): SunPosEquatorialReturned;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type EquaCoordContext = import('../coords/equatorial.js').EquaCoordContext;
export type SunPosEquatorialReturned = {
    coord: EquaCoordContext;
    _ecliptic: EcliCoordContext;
    _mean_anom: number;
    _obliquity: number;
};
