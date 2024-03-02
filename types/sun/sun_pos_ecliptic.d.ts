export function sun_pos_ecliptic(dt: Moment): SunPosEclipticReturned;
export type Moment = import('moment').Moment;
export type DecimalDays = import('../types.js').DecimalDays;
export type DecimalHours = import('../types.js').DecimalHours;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type SunPosEclipticReturned = {
    coord: EcliCoordContext;
    _mean_anom: number;
};
