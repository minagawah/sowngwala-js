export type NaiveTime = {
    from_hms: FromHMS;
    from_hmsn: FromHMSNano;
};
export const NaiveTime: NaiveTime;
export type Hour = import('../types.js').Hour;
export type Minute = import('../types.js').Minute;
export type Second = import('../types.js').Second;
export type NanoSecond = import('../types.js').NanoSecond;
export type DecimalDays = import('../types.js').DecimalDays;
export type Getter<T> = () => T;
export type NaiveTimeContext = {
    hour: Getter<Hour>;
    minute: Getter<Minute>;
    second: Getter<Second>;
    nanosecond: Getter<NanoSecond>;
    day_excess: Getter<DecimalDays>;
    calibrate: Calibrate;
    print: () => void;
};
export type FromHMS = (h: number, m: number, s: number) => NaiveTimeContext;
export type FromHMSNano = (h: number, m: number, s: number, n: number) => NaiveTimeContext;
export type Calibrate = () => number;
