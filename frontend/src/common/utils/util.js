export {isDefined};
/**
 * 値がundefinedでもnullでもないことを判定する.
 *
 * @param {Number|String} value - 値
 * @return {Boolean} 値であればtrue
 */
const isDefined = (value) => {
  return value !== undefined && value !== null;
};
