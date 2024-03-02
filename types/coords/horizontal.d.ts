export function HorizonCoord({ azimuth, altitude }: {
    azimuth: AngleContext;
    altitude: AngleContext;
}): HorizonCoordContext;
export type AngleContext = import('./angle.js').AngleContext;
export type HorizonCoordContext = {
    azimuth: AngleContext;
    altitude: AngleContext;
};
