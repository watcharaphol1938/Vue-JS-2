import '@testing-library/jest-dom';
import {render} from '@testing-library/vue';

import Footer from '@/components/common/Footer.vue';

import {getFooterDefaultData} from '@/mocks/customapp/footer';

/**
 * Footerの画面初期表示のテスト.
 */
describe('初期表示', () => {
  /**
   * APIから取得したアプリバージョンが含まれるか確認する.
   */
  test('初期表示', async () => {
    const footer = await render(Footer);
    await footer.findByText(getFooterDefaultData.appVersion);
  });
});
