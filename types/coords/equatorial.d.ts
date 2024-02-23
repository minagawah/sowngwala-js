export function EquaCoord({ asc, dec }: {
    asc: AngleContext;
    dec: AngleContext;
}): EquaCoordContext;
export type AngleContext = import('./angle.js').AngleContext;
export type EquaCoordContext = {
    asc: AngleContext;
    dec: AngleContext;
};
