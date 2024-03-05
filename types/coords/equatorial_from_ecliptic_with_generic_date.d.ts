export function equatorial_from_ecliptic_with_generic_date(coord: EcliCoordContext, date: NaiveDateContext): EquatorialFromEclipticWithGenericDateReturned;
export type NaiveDateContext = import('../chrono/naive_date.js').NaiveDateContext;
export type EcliCoordContext = import('./ecliptic.js').EcliCoordContext;
export type EquatorialFromEclipticWithGenericDateReturned = import('./equatorial_from_ecliptic_with_generic_datetime.js').EquatorialFromEclipticWithGenericDateTimeReturned;
