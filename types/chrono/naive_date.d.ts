export type NaiveDate = {
    from_moment: FromMoment;
    from_ymd: FromYMD;
};
export const NaiveDate: NaiveDate;
export type Moment = import('moment').Moment;
export type Year = import('../types.js').Year;
export type Day = import('../types.js').Day;
export type Month = import('../types.js').Month;
export type Getter<T> = () => T;
export type NaiveDateContext = {
    year: Getter<Year>;
    month: Getter<Month>;
    day: Getter<Day>;
    to_moment: Getter<Moment>;
    print: () => void;
};
export type FromMoment = (dt: Moment) => NaiveDateContext;
export type FromYMD = (y: Year, m: Month, d: Day) => NaiveDateContext;
