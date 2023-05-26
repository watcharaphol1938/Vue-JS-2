import '@testing-library/jest-dom';
import {render, fireEvent, waitFor} from '@testing-library/vue';
import TheCycleTimePage from '@/components/pages/CycleTimePage/TheCycleTimePage.vue';
import {ResizeObserverMock} from '../../../util/ResizeObserverMock.js';
import {server} from '@/mocks/server';
import {testHandlers} from '@/mocks/common-backend/common-backend-v0-line-groups';
import {
  getCycletimeNotFoundErrorTestHandler,
  getCycleTimePagingTestHandler,
} from '@/mocks/customapp/cycletime';

/**
 * ResizeObserverにモックをセット.
 */
window.ResizeObserver = ResizeObserverMock;

/**
 * TheCycleTimePageの画面初期表示のテスト.
 */
describe('初期描画', () => {
  /**
   * 初期表示で以下の描画を確認する.
   *    - ページタイトル「設備計測時間（サイクルタイム）時系列プロット」
   *    - DatetimeRangePicker
   *    - SelectorChildEquipment
   *    - 検索ボタン(非活性状態)
   *    - 検索（文字）
   *    - SplinnerLoading(描画されていないこと)
   *    - CycleTimeViewer(描画されていないこと)
   */
  test('画面初期表示', async () => {
    const component = await render(TheCycleTimePage);
    // ページタイトルの確認
    component.getByText('設備計測時間（サイクルタイム）時系列プロット');
    // DatetimeRangePickerの確認
    component.getByTestId('datetime-range-picker');
    // SelectorChildEquipmentの確認
    component.getByTestId('selector-child-equipment');

    // 検索ボタンの確認
    const button = component.getByTestId('search-button');
    // 子設備IDが選択されていない初期表示の状態で検索ボタンがDisabledであること
    expect(button).toBeDisabled();
    // 検索（文字）が表示されていること
    expect(component.queryByTestId('search-button-text')).toBeInTheDocument();
    // スピナーが表示されていないこと
    expect(component.queryByTestId('spinner')).not.toBeInTheDocument();
    // CycleTimeViewerが表示されていないこと
    expect(component.queryByTestId('viewer')).not.toBeInTheDocument();
  });
});

/**
 * 選択された子設備IDがある状態の検索ボタンのDisabled属性を確認する.
 *    - 前提としてDatetimeRangePickerは初期値が必ず入るため, チェックの条件に含めない
 *    - 選択された子設備IDがある場合, 検索ボタンはDisabledとならない(活性状態)
 */
describe('検索ボタンのDisabled属性のチェック', () => {
  /**
   * 選択された子設備IDがある状態のTheCycleTimePageを描画し,
   * 検索ボタンがDisabledとなっていないことを確認する
   */
  test('選択された子設備IDあり', async () => {
    const component = await render(TheCycleTimePage, {
      data() {
        return {
          childEquipmentId: 'childEquip0',
        };
      },
    });
    const button = component.getByTestId('search-button');
    expect(button).not.toBeDisabled();
  });
});

/**
 * 検索ボタンの押下からサイクルタイムデータ取得後までの以下イベントの動作を確認する.
 * 意図的に404エラーを起こすテストが含まれる
 *    - 初回検索(ページング処理なし)
 *    - 再検索(ページング処理なし)
 *    - 初回検索(ページング処理あり)
 *    - 検索時に404エラーを返却
 */
describe('検索ボタン押下～サイクルタイムデータ取得後の動作チェック', () => {
  /**
   * 初回検索時に以下の挙動を確認する.
   *    - dataset取得中
   *        - Spinnerが表示されること
   *        - 検索（文字）が非表示となること
   *        - 検索ボタンが非活性となること
   *    - dataset取得後
   *        - CycleTimeViewerが表示されること
   *        - Spinnerが非表示となること
   *        - 検索（文字）が表示されること
   *        - 検索ボタンが活性化されること
   */
  test('初回検索(ページングなし)', async () => {
    const component = await render(TheCycleTimePage, {
      data() {
        return {
          childEquipmentId: 'childEquip0',
        };
      },
    });

    // 検索ボタンをクリック
    const button = component.getByTestId('search-button');
    await fireEvent.click(button);

    // dataset取得中
    // 検索（文字）が非表示となること
    expect(
      component.queryByTestId('search-button-text')
    ).not.toBeInTheDocument();
    // Spinnerが表示されること
    await component.findByTestId('spinner');
    // 検索ボタンが非活性となること
    expect(button).toBeDisabled();

    // dataset取得後
    // CycleTimeViewerが表示されること
    await component.findByTestId('viewer');
    // 検索（文字）が表示されること
    expect(component.queryByTestId('search-button-text')).toBeInTheDocument();
    // Spinnerが表示されていないこと
    expect(component.queryByTestId('spinner')).not.toBeInTheDocument();
    // 検索ボタンが活性化されること
    expect(button).not.toBeDisabled();
  });

  /**
   * 再検索時に以下の挙動を確認する.
   *    - dataset取得中
   *        - 検索（文字）が非表示となること
   *        - Spinnerが表示されること
   *        - 検索ボタンが非活性となること
   *    - dataset取得後
   *        - CycleTimeViewerが表示されること
   *        - Spinnerが非表示となること
   *        - 検索（文字）が表示されること
   *        - 検索ボタンが活性化されること
   */
  test('再検索(ページングなし)', async () => {
    const component = await render(TheCycleTimePage, {
      data() {
        return {
          childEquipmentId: 'childEquip0',
        };
      },
    });
    // 1回目の検索
    // 検索ボタンをクリック
    const button = component.getByTestId('search-button');
    await fireEvent.click(button);
    // CycleTimeViewerが表示されること
    await component.findByTestId('viewer');

    // 2回目の検索
    // 検索ボタンをクリック
    await fireEvent.click(button);

    // dataset取得中
    // 検索（文字）が非表示となる
    expect(
      component.queryByTestId('search-button-text')
    ).not.toBeInTheDocument();
    // Spinnerが表示されること
    await component.findByTestId('spinner');
    // 検索ボタンが非活性となること
    expect(button).toBeDisabled();

    // dataset取得後
    // CycleTimeViewerが表示されること
    await component.findByTestId('viewer');
    // 検索（文字）が表示されること
    expect(component.queryByTestId('search-button-text')).toBeInTheDocument();
    // Spinnerが非表示となること
    expect(component.queryByTestId('spinner')).not.toBeInTheDocument();
    // 検索ボタンが活性化されること
    expect(button).not.toBeDisabled();
  });

  /**
   * 初回検索時に以下の挙動を確認する.
   *    - dataset取得中
   *        - Spinnerが表示されること
   *        - 検索（文字）が非表示となること
   *        - 検索ボタンが非活性となること
   *    - dataset取得後（pagingの1回目）
   *        - CycleTimeViewerが表示されること
   *        - 検索（文字）が非表示のままであること
   *        - Spinnerが表示されたままであること
   *        - 検索ボタンが非活性のままであること
   *    - dataset取得後（pagingの2回目）
   *        - CycleTimeViewerが表示されていること
   *        - Spinnerが非表示となること
   *        - 検索（文字）が表示されること
   *        - 検索ボタンが活性化されること
   */
  test('初回検索(ページングあり)', async () => {
    server.resetHandlers(...testHandlers, getCycleTimePagingTestHandler);
    const component = await render(TheCycleTimePage, {
      data() {
        return {
          childEquipmentId: 'childEquip0',
        };
      },
    });

    // 検索ボタンをクリック
    const button = component.getByTestId('search-button');
    await fireEvent.click(button);

    // 1回目dataset取得中
    // 検索（文字）が非表示となる
    expect(
      component.queryByTestId('search-button-text')
    ).not.toBeInTheDocument();
    // Spinnerが表示されること
    await component.findByTestId('spinner');
    // 検索ボタンが非活性となること
    expect(button).toBeDisabled();

    // 1回目dataset取得後
    // CycleTimeViewerが表示されること
    await component.findByTestId('viewer');
    // 検索（文字）が非表示のままであること
    expect(
      component.queryByTestId('search-button-text')
    ).not.toBeInTheDocument();
    // Spinnerが表示されたままであること
    expect(component.queryByTestId('spinner')).toBeInTheDocument();
    // 検索ボタンが非活性のままであること
    expect(button).toBeDisabled();

    // 2回目のdataset取得後（paging）
    await component.findByTestId('search-button-text');
    // Spinnerが表示されていないこと
    expect(component.queryByTestId('spinner')).not.toBeInTheDocument();
    // 検索（文字）が表示されること
    expect(component.queryByTestId('search-button-text')).toBeInTheDocument();
    // 検索ボタンが活性化されること
    expect(button).not.toBeDisabled();
  });

  /**
   * データ取得時に意図的に404エラーを起こすテスト.
   *    - エラーモーダルが表示されること
   *    - エラーモーダルと一緒にSpinnerが表示されること
   *    - エラーモーダル表示中は検索ボタンが非活性となること
   *    - エラーモーダルを閉じるとSpinnerが非表示となること
   *    - エラーモーダルを閉じると検索（文字）が表示されること
   *    - エラーモーダルを閉じると検索ボタンが活性化されること
   */
  test('データ取得時のエラー', async () => {
    window.alert = jest.fn();
    // 意図的に404エラーを起こすハンドラー
    server.resetHandlers(...testHandlers, getCycletimeNotFoundErrorTestHandler);

    const component = await render(TheCycleTimePage, {
      data() {
        return {
          childEquipmentId: 'childEquip1',
        };
      },
    });
    // 検索ボタンをクリック
    const button = component.getByTestId('search-button');
    await fireEvent.click(button);

    // Spinnerが表示されること
    expect(component.queryByTestId('spinner')).toBeInTheDocument();
    // 検索ボタンが非活性となること
    expect(button).toBeDisabled();

    // モーダルが表示されていることを確認する
    await waitFor(() => {
      expect(window.alert.mock.calls.length).toBe(1);
    });

    // エラーモーダルをクリアする
    await window.alert.mockClear();

    // Spinnerが非表示となること
    expect(component.queryByTestId('spinner')).not.toBeInTheDocument();
    // 検索（文字）が表示されること
    expect(component.queryByTestId('search-button-text')).toBeInTheDocument();
    // 検索ボタンが活性化されること
    expect(button).not.toBeDisabled();
  });
});
