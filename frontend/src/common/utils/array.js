export {getMinElement, getMaxElement};
/**
 * 配列の最小値を取得する.
 *
 * 引数の配列は最低1要素持つ必要がある.
 * @param {Array} array - 対象の配列
 * @return {Number|Date} arrayに含まれる最小値
 */
const getMinElement = (array) => {
  return array.reduce((min, cur) => {
    return Math.min(min, cur);
  });
};

/**
 * 配列の最大値を取得する.
 *
 * 引数の配列は最低1要素持つ必要がある.
 * @param {Array} array - 対象の配列
 * @return {Number|Date} arrayに含まれる最大値
 */
const getMaxElement = (array) => {
  return array.reduce((max, cur) => {
    return Math.max(max, cur);
  });
};
