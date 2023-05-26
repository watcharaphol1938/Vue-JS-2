/**
 * array.jsのテスト.
 */
import {getMinElement, getMaxElement} from '@/common/utils/array.js';

/**
 * getMinElement.
 *
 * 確認項目
 * ・配列の要素の最小値を取得できるか確認する.
 */
describe('getMinElementのテスト', () => {
  test('配列の要素が複数', () => {
    // インプットデータ
    const array = [327.5, 327.5, 137.4, 310.1];

    // テスト実施
    const result = getMinElement(array);
    expect(result).toBe(array[2]);
  });
  test('配列の要素が1つ', () => {
    // インプットデータ
    const array = [327.5];

    // テスト実施
    const result = getMinElement(array);
    expect(result).toBe(array[0]);
  });
});

/**
 * getMaxElement.
 *
 * 確認項目
 * ・配列の要素の最大値を取得できるか確認する.
 */
describe('getMaxElementのテスト', () => {
  test('配列の要素が複数', () => {
    // インプットデータ
    const array = [137.4, 137.4, 327.5, 310.1];

    // テスト実施
    const result = getMaxElement(array);
    expect(result).toBe(array[2]);
  });
  test('配列の要素が1つ', () => {
    // インプットデータ
    const array = [327.5];

    // テスト実施
    const result = getMaxElement(array);
    expect(result).toBe(array[0]);
  });
});
