export function sun_pos_equatorial(dt: Moment): SunPosEquatorialReturned;
export type Moment = import('moment').Moment;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type EquaCoordContext = import('../coords/equatorial.js').EquaCoordContext;
export type SunPosEquatorialReturned = {
    coord: EquaCoordContext;
    _ecliptic: EcliCoordContext;
    _mean_anom: number;
    _obliquity: number;
};
