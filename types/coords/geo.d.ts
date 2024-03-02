export function Latitude({ degrees, bound }: {
    degrees: number;
    bound: LatitudeBound;
}): LatitudeContext;
export function Longitude({ degrees, bound }: {
    degrees: number;
    bound: LongitudeBound;
}): LongitudeContext;
export function GeoCoord({ lat, lng }: {
    lat: LatitudeContext;
    lng: LongitudeContext;
}): GeoCoordContext;
export type AngleContext = import('./angle.js').AngleContext;
export type LatitudeBound = 'N' | 'S';
export type LongitudeBound = 'E' | 'W';
export type LatitudeContext = {
    degrees: number;
    bound: LatitudeBound;
};
export type LongitudeContext = {
    degrees: number;
    bound: LongitudeBound;
};
export type GeoCoordContext = {
    lat: LatitudeContext;
    lng: LongitudeContext;
};
