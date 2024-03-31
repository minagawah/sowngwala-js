export function sun_ecliptic_from_generic_datetime(dt: NaiveDateTimeContext): SunEclipticFromGenericDateTimeReturned;
export type DecimalDays = import('../types.js').DecimalDays;
export type DecimalHours = import('../types.js').DecimalHours;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type SunEclipticFromGenericDateTimeReturned = {
    coord: EcliCoordContext;
    _mean_anom: number;
};
