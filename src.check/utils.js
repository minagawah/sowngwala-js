/**
 * @module sowngwala/check/utils
 */

const ROUND_DIGITS = 100_000;

/**
 * @private
 * @function
 */
export const is_nullish = val =>
  typeof val === 'undefined' || val === null;

/**
 * @private
 * @function
 */
export const kebab_from_snake = snake =>
  snake.replace(/_/g, '-');

/**
 * @private
 * @function
 */
export const snake_from_kebab = kebab =>
  kebab.replace(/-/g, '_');

/**
 * @private
 * @function
 */
export const round = num =>
  Math.round(num * ROUND_DIGITS) / ROUND_DIGITS;

/**
 * @private
 * @function
 */
export function naive_date_from_date(date) {
  return [
    ['year', 'getFullYear'],
    ['month', 'getMonth'],
    ['day', 'getDate'],
    ['hour', 'getHours'],
    ['min', 'getMinutes'],
    ['sec', 'getSeconds'],
  ].reduce((acc, [key, method]) => {
    let value = date[method]();
    if (key === 'month') value++;
    acc[key] = value;
    return acc;
  }, {});
}

/*
 * This is the initial value for
 * 'debounce'.
 */
let time = Date.now();

/**
 * @function
 * @param {function} f
 * @param {number} delay
 * @returns {function(): void}
 */
export function debounce(f, delay) {
  let timeout = null;
  let args = null;

  /**
   * This is a wrapper function to 'f'.
   * @function
   */
  const g = () => {
    f.apply(null, args);
    time = Date.now();
  };

  return function () {
    args = arguments;

    if (!timeout && Date.now() >= time + delay) {
      g();
    } else {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(g, delay);
    }
  };
}
