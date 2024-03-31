export function sun_equatorial_from_generic_datetime(utc: NaiveDateTimeContext): SunEquatorialFromGenericDateTimeReturned;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type EcliCoordContext = import('../coords/ecliptic.js').EcliCoordContext;
export type EquaCoordContext = import('../coords/equatorial.js').EquaCoordContext;
export type SunEquatorialFromGenericDateTimeReturned = {
    coord: EquaCoordContext;
    _ecliptic: EcliCoordContext;
    _mean_anom: number;
    _obliquity: number;
};
