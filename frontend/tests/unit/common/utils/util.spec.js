import {isDefined} from '@/common/utils/util.js';

/**
 * isDefinedのテスト
 *
 * 確認項目
 * ・値がundefined, nullの場合はfalseを確認する.
 * ・値が0, 文字列の場合はtrueを確認する.
 */
describe('isDefinedのテスト', () => {
  test('値がundefined', () => {
    const value = undefined;

    const result = isDefined(value);
    expect(result).toBe(false);
  });
  test('値がnull', () => {
    const value = null;

    const result = isDefined(value);
    expect(result).toBe(false);
  });
  test('値が0', () => {
    const value = 0;

    const result = isDefined(value);
    expect(result).toBe(true);
  });
  test('値が文字列', () => {
    const value = 'test';

    const result = isDefined(value);
    expect(result).toBe(true);
  });
});
