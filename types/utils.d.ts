export function overflow(value: number, base: number): OverflowReturned;
export function make_stopper(options?: {
    limit?: number;
}): StopperContext;
export function noop(): void;
export function unsigned_zero(value: number): number;
export function fract(value: number): number;
export function to_degrees(rad: number): number;
export function to_radians(deg: number): number;
export function make_logger(mod: string, func: string, out?: boolean): LoggerContext;
export type StopperContext = {
    get_count: () => number;
    check: () => number;
};
export type Moment = import('moment').Moment;
export type OverflowReturned = {
    remainder: number;
    quotient: number;
};
export type LoggerContext = {
    logger: (arg0: string) => void;
    logger_title: () => void;
};
