export function equatorial_from_ecliptic_with_generic_datetime(coord: EcliCoordContext, dt: Moment): EquaCoordContext;
export type Moment = import('moment').Moment;
export type EquaCoordContext = import('./equatorial.js').EquaCoordContext;
export type EcliCoordContext = import('./ecliptic.js').EcliCoordContext;
