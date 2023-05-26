import '@testing-library/jest-dom';
import {render} from '@testing-library/vue';

import Header from '@/components/common/Header.vue';

import {getHeaderDefaultData} from '@/mocks/customapp/header';

/**
 * Headerの画面初期表示のテスト.
 */
describe('初期表示', () => {
  /**
   * APIから取得したアプリ名と姓名（英字）が含まれるか確認する.
   * ログアウト機能が存在するか確認する.
   */
  test('初期表示', async () => {
    const header = await render(Header);

    await header.findByText(getHeaderDefaultData.appName);
    await header.findByText(getHeaderDefaultData.cn);
    header.getByText('logout');
  });
});
