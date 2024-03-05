export function equatorial_from_ecliptic_with_generic_datetime(coord: EcliCoordContext, dt: NaiveDateTimeContext): EquatorialFromEclipticWithGenericDateTimeReturned;
export type NaiveDateTimeContext = import('../chrono/naive_datetime.js').NaiveDateTimeContext;
export type EcliCoordContext = import('./ecliptic.js').EcliCoordContext;
export type EquaCoordContext = import('./equatorial.js').EquaCoordContext;
export type EquatorialFromEclipticWithGenericDateTimeReturned = {
    coord: EquaCoordContext;
    _obliquity: number;
};
