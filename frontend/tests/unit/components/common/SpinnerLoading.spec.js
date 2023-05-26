import {render} from '@testing-library/vue';
import SpinnerLoading from '@/components/common/SpinnerLoading.vue';

/**
 * SpinnerLoadingの画面初期表示のテスト.
 */
describe('初期表示', () => {
  /**
   * 文字列「Loading...」が含まれるか確認する.
   */
  test('初期表示', async () => {
    const spinnerLoading = await render(SpinnerLoading);
    await spinnerLoading.findByText('Loading...');
  });
});
