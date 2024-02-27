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
