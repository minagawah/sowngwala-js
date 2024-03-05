export function sun_pos_ecliptic(dt: NaiveDateTimeContext): SunPosEclipticReturned;
export type DecimalDays = import('../types.js').DecimalDays;
export type DecimalHours = import('../types.js').DecimalHours;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type SunPosEclipticReturned = {
    coord: EcliCoordContext;
    _mean_anom: number;
};
