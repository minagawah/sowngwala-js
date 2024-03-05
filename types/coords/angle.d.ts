export type Angle = {
    from_hms: FromHMS;
};
export const Angle: Angle;
export type NaiveTimeContext = import('../chrono/naive_time.js').NaiveTimeContext;
export type Degree = import('../types.js').Degree;
export type Hour = import('../types.js').Hour;
export type Minute = import('../types.js').Minute;
export type Second = import('../types.js').Second;
export type DecimalDays = import('../types.js').DecimalDays;
export type Getter<T> = () => T;
export type AngleContext = {
    hour: Getter<Hour>;
    minute: Getter<Minute>;
    second: Getter<Second>;
    day_excess: Getter<DecimalDays>;
    to_naive_time: ToNaiveTime;
    calibrate: Calibrate;
    print: () => void;
};
export type FromHMS = (h: Hour, m: Minute, s: Second) => AngleContext;
export type ToNaiveTime = () => NaiveTimeContext;
export type Calibrate = () => number;
