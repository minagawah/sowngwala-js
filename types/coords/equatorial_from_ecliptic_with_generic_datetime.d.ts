export function equatorial_from_ecliptic_with_generic_datetime(coord: EcliCoordContext, dt: Moment): EquatorialFromEclipticWithGenericDateTimeReturned;
export type Moment = import('moment').Moment;
export type EcliCoordContext = import('./ecliptic.js').EcliCoordContext;
export type EquaCoordContext = import('./equatorial.js').EquaCoordContext;
export type EquatorialFromEclipticWithGenericDateTimeReturned = {
    coord: EquaCoordContext;
    _obliquity: number;
};
