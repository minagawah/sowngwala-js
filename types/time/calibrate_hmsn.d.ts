export function calibrate_hmsn({ hour, min, sec, nano, angle, hour_overflow, }: CalibrateArguments): {
    hmsn: HMSNano;
    day_excess: DecimalDays;
};
export type Hour = import('../types.js').Hour;
export type Minute = import('../types.js').Minute;
export type Second = import('../types.js').Second;
export type NanoSecond = import('../types.js').NanoSecond;
export type DecimalDays = import('../types.js').DecimalDays;
export type AdditionalOptions = {
    angle?: boolean;
    hour_overflow?: boolean;
};
export type CalibrateArguments = HMSNano & AdditionalOptions;
export type HMSNano = {
    hour: Hour;
    min: Minute;
    sec: Second;
    nano: NanoSecond;
};
