import '@testing-library/jest-dom';
import {render, waitFor, fireEvent} from '@testing-library/vue';

import SelectorChildEquipment from '@/components/common/SelectorChildEquipment.vue';
import {
  getLineGroupsErrorNotFoundTestHandler,
  getLineGroup0ErrorNotFoundTestHandler,
  getLineGroup0LinesErrorNotFoundTestHandler,
  getLineGroupsTestData,
  getLineGroup0TestData,
  getEmptyLineGroupsTestData,
  getEmptyLinesTestData,
  getEmptyChildEquipsTestData,
  getLineGroup0ToChildEquips0TestData,
} from '@/mocks/common-backend/common-backend-v0-line-groups';

import {server} from '@/mocks/server';

/**
 * SelectorChildEquipmentの画面初期表示のテスト.
 */
describe('初期描画', () => {
  /**
   * ラベルのテキストが正しく描画されたか確認。
   */
  test('ラベルの確認', async () => {
    const selectorChildEquipment = await render(SelectorChildEquipment);

    selectorChildEquipment.getByText('ライン群');
    selectorChildEquipment.getByText('ライン');
    selectorChildEquipment.getByText('子設備');
  });

  /**
   * APIからライン群を取得し, ライン群の選択肢がある状態で以下を確認する.
   *    - ライン群・ライン・子設備セレクターが描画されているか
   *    - 全てのセレクターの選択初期値は空文字になっているか
   *    - ライン群セレクターのオプションにはAPIから取得したデータがセットされているか
   *    - ライン・子設備セレクターのオプションにはデータがセットされていないか
   */
  test('ライン群の選択肢あり', async () => {
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // ライン群・ライン・子設備セレクターが描画されているかと値の確認
    expect(selectorChildEquipment).hasSelectorValue({
      label: 'ライン群',
      expected: '',
    });
    expect(selectorChildEquipment).hasSelectorValue({
      label: 'ライン',
      expected: '',
    });
    expect(selectorChildEquipment).hasSelectorValue({
      label: '子設備',
      expected: '',
    });

    // オプションの数の確認
    await waitFor(() => {
      expect(selectorChildEquipment).hasSelectorOptions({
        label: 'ライン群',
        expected: getLineGroupsTestData.lineGroups,
      });
      expect(selectorChildEquipment).hasSelectorOptions({
        label: 'ライン',
        expected: [],
      });
      expect(selectorChildEquipment).hasSelectorOptions({
        label: '子設備',
        expected: [],
      });
    });
  });

  /**
   * 画面初期表示でライン群が空の場合に意図的に404エラーを起こすテスト.
   * APIから空のライン群を取得し, ライン群の選択肢がない状態で以下を確認する.
   *    - 画面描画後にエラーモーダルが表示されるか
   *    - ライン群・ライン・子設備セレクターが描画されているか
   *    - 全てのセレクターの選択初期値は空文字になっているか
   *    - 全てのセレクターのオプションにはデータがセットされていないか
   */
  test('ライン群の選択肢なし', async () => {
    window.alert = jest.fn();
    // 意図的に404エラーを起こすハンドラー
    server.resetHandlers(getLineGroupsErrorNotFoundTestHandler);
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // モーダルが表示されていることを確認する
    await waitFor(() => {
      expect(window.alert.mock.calls.length).toBe(1);
    });

    // エラーモーダルをクリアする
    await window.alert.mockClear();

    // ライン群・ライン・子設備セレクターが描画されているかと値の確認
    expect(selectorChildEquipment).hasSelectorValue({
      label: 'ライン群',
      expected: '',
    });
    expect(selectorChildEquipment).hasSelectorValue({
      label: 'ライン',
      expected: '',
    });
    expect(selectorChildEquipment).hasSelectorValue({
      label: '子設備',
      expected: '',
    });

    // オプションの数の確認
    await waitFor(() => {
      expect(selectorChildEquipment).hasSelectorOptions({
        label: 'ライン群',
        expected: getEmptyLineGroupsTestData.lineGroups,
      });
      expect(selectorChildEquipment).hasSelectorOptions({
        label: 'ライン',
        expected: [],
      });
      expect(selectorChildEquipment).hasSelectorOptions({
        label: '子設備',
        expected: [],
      });
    });
  });
});

/**
 * ライン群セレクターに対するイベントのテスト.
 */
describe('ライン群セレクターに対するイベントのテスト', () => {
  /**
   * APIからライン群を取得し, ライン群の選択肢がある状態で1つ選択し, 以下を確認する.
   *    - ライン群を選択できるか
   *    - ライン群選択後, ラインセレクターのオプションにデータがセットされるか
   */
  test('初期選択', async () => {
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // ライン群セレクターから選択する
    await selectOption({
      selectorChildEquipment: selectorChildEquipment,
      label: 'ライン群',
      option: {
        value: getLineGroupsTestData.lineGroups[0].id,
        text: getLineGroupsTestData.lineGroups[0].name,
      },
    });

    // ラインセレクターにデータがセットされることを確認する
    await waitFor(() => {
      expect(selectorChildEquipment).hasSelectorOptions({
        label: 'ライン',
        expected: getLineGroup0TestData.lines,
      });
    });
  });

  /**
   * APIからライン群を取得し, ライン群の選択肢がある状態で以下を確認する.
   *    - ライン群 > ライン > 子設備の順で全てのセレクターで値を選択できるか
   *    - 全て選択後, ライン群の選択値を変更できるか
   */
  test('ライン群の選択肢あり, 選択肢変更イベント', async () => {
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // 全てのセレクターを選択する
    await selectOptionAll({selectorChildEquipment: selectorChildEquipment});

    // ライン群の選択を変更する
    await selectOption({
      selectorChildEquipment: selectorChildEquipment,
      label: 'ライン群',
      option: {
        value: getLineGroupsTestData.lineGroups[1].id,
        text: getLineGroupsTestData.lineGroups[1].name,
      },
    });

    // ライン群の値が更新されたか確認する
    await waitFor(() =>
      expect(selectorChildEquipment).hasSelectorValue({
        label: 'ライン群',
        expected: getLineGroupsTestData.lineGroups[1].name,
      })
    );
  });
});

/**
 * ラインセレクターに対するイベントのテスト.
 */
describe('ラインセレクターに対するイベントのテスト', () => {
  /**
   * ラインの選択肢がある状態で, 以下を確認する.
   *    - 全てのセレクターを選択後, ラインの選択値を変更できるか
   */
  test('ラインの選択肢あり, 選択肢変更イベント', async () => {
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // 全てのセレクターを選択する
    await selectOptionAll({selectorChildEquipment: selectorChildEquipment});

    // ラインの選択を変更する
    await selectOption({
      selectorChildEquipment: selectorChildEquipment,
      label: 'ライン',
      option: {
        value: getLineGroup0TestData.lines[1].lineId,
        text: getLineGroup0TestData.lines[1].lineName,
      },
    });

    // ラインの値が更新されたか確認する
    await waitFor(() =>
      expect(selectorChildEquipment).hasSelectorValue({
        label: 'ライン',
        expected: getLineGroup0TestData.lines[1].lineName,
      })
    );
  });

  /**
   * ライン群選択時に意図的に404エラーを起こすテスト.
   * APIからライン群を取得し, ライン群の選択肢がある状態で以下を確認する.
   *    - ラインを持っていないライン群を選択すると404エラーが発生し, エラーモーダルが表示されるか
   *    - ラインを持っていないライン群を選択してもラインセレクターに選択肢はないか
   */
  test('ラインの選択肢なし', async () => {
    window.alert = jest.fn();
    // 意図的に404エラーを起こすハンドラー
    server.resetHandlers(...getLineGroup0ErrorNotFoundTestHandler);

    const selectorChildEquipment = await render(SelectorChildEquipment);

    // ライン群セレクターから選択する
    await selectOption({
      selectorChildEquipment: selectorChildEquipment,
      label: 'ライン群',
      option: {
        value: getLineGroupsTestData.lineGroups[0].id,
        text: getLineGroupsTestData.lineGroups[0].name,
      },
    });

    // モーダルが表示されていることを確認する
    await waitFor(() => {
      expect(window.alert.mock.calls.length).toBe(1);
    });

    // エラーモーダルをクリアする
    await window.alert.mockClear();

    // ラインセレクターに選択肢がないことを確認する
    await waitFor(() =>
      expect(selectorChildEquipment).hasSelectorOptions({
        label: 'ライン',
        expected: getEmptyLinesTestData.lines,
      })
    );
  });
});

/**
 * 子設備セレクターに対するイベントのテスト.
 */
describe('子設備セレクターに対するイベントのテスト', () => {
  /**
   * 子設備の選択肢がある状態で1つ選択後, 以下を確認する.
   *    - 選択した子設備IDがemitされる
   */
  test('子設備の選択肢あり, 選択・emitイベント', async () => {
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // 全てのセレクターを選択する
    await selectOptionAll({selectorChildEquipment: selectorChildEquipment});

    // 子設備セレクターで選択した値がemitされているか確認する
    expect(selectorChildEquipment).emittedUpdateValue(
      getLineGroup0ToChildEquips0TestData.childEquips[0].childEquipId
    );
  });

  /**
   * 子設備の選択肢がある状態で1つ選択後, 以下を確認する.
   *    - 別の子設備を選択し, 変更後の子設備IDがemitされるか
   */
  test('子設備の選択肢あり, 選択変更・emitイベント', async () => {
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // 全てのセレクターを選択する
    await selectOptionAll({selectorChildEquipment: selectorChildEquipment});

    // 子設備セレクターの選択を変更する
    await selectOption({
      selectorChildEquipment: selectorChildEquipment,
      label: '子設備',
      option: {
        value: getLineGroup0ToChildEquips0TestData.childEquips[1].childEquipId,
        text: getLineGroup0ToChildEquips0TestData.childEquips[1].childEquipName,
      },
    });

    // 子設備セレクターで選択後, 再選択した値がemitされているか確認する
    expect(selectorChildEquipment).emittedUpdateValue(
      getLineGroup0ToChildEquips0TestData.childEquips[1].childEquipId
    );
  });

  /**
   * ライン群選択時に意図的に404エラーを起こすテスト.
   * APIからライン群とラインを取得し, ライン群とラインの選択肢がある状態で以下を確認する.
   *    - 子設備を持っていないラインを選択すると404エラーが発生し, エラーモーダルが表示されるか
   *    - 子設備を持っていないラインを選択しても子設備セレクターに選択肢はないか
   */
  test('子設備の選択肢なし', async () => {
    window.alert = jest.fn();
    // 意図的に404エラーを起こすハンドラー
    server.resetHandlers(...getLineGroup0LinesErrorNotFoundTestHandler);
    const selectorChildEquipment = await render(SelectorChildEquipment);

    // ライン群セレクターから選択する
    await selectOption({
      selectorChildEquipment: selectorChildEquipment,
      label: 'ライン群',
      option: {
        value: getLineGroupsTestData.lineGroups[0].id,
        text: getLineGroupsTestData.lineGroups[0].name,
      },
    });

    // ラインセレクターから選択する
    await selectOption({
      selectorChildEquipment: selectorChildEquipment,
      label: 'ライン',
      option: {
        value: getLineGroup0TestData.lines[0].lineId,
        text: getLineGroup0TestData.lines[0].lineName,
      },
    });

    // モーダルが表示されていることを確認する
    await waitFor(() => {
      expect(window.alert.mock.calls.length).toBe(1);
    });

    // エラーモーダルをクリアする
    await window.alert.mockClear();

    // 子設備セレクターに選択肢がないことを確認する
    await waitFor(() =>
      expect(selectorChildEquipment).hasSelectorOptions({
        label: '子設備',
        expected: getEmptyChildEquipsTestData.childEquips,
      })
    );
  });
});

expect.extend({
  /**
   * 選択された値が期待値と一致しているかを確認する.
   * @param {Object} received - コンポーネント
   * @param {Object} - セレクターのテストIDと期待値
   * @return {Object} - テスト結果
   */
  hasSelectorValue(received, {label, expected}) {
    const selector = received.getByLabelText(label);
    const selectorValue = selector.value;
    if (selectorValue === expected) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('selectorValue') +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `SelectorValue:${this.utils.printReceived(selectorValue)}\n`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('selectorValue') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `SelectorValue:${this.utils.printReceived(selectorValue)}\n`,
      };
    }
  },
  /**
   * オプションの数が期待値と一致しているか確認する
   * @param {Object} received - コンポーネント
   * @param {Object} - セレクターのテストIDと期待値
   * @return {Object} - テスト結果
   */
  hasSelectorOptions(received, {label, expected}) {
    // const selector = received.getByTestId(testId);
    const input = received.getByLabelText(label);
    const datalist = input.nextElementSibling;
    if (datalist.options.length === expected.length) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('selectorOptions') +
          '\n\n' +
          `ExpectedLength: not ${this.utils.printExpected(expected.length)}\n` +
          `SelectorOptions:${this.utils.printReceived(
            datalist.options.length
          )}\n`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('selectorOptions') +
          '\n\n' +
          `ExpectedLength: ${this.utils.printExpected(expected.length)}\n` +
          `SelectorOptions:${this.utils.printReceived(
            datalist.options.length
          )}\n`,
      };
    }
  },
  /**
   * emitされた子設備IDが期待値と一致しているか確認する.
   * @param {Object} received - コンポーネント
   * @param {Object} expected - emitのインデックスと期待値
   * @return {Object} - テスト結果
   */
  emittedUpdateValue(received, expected) {
    const index = received.emitted()['update:childEquipmentId'].length - 1;
    const emittedValue =
      received.emitted()['update:childEquipmentId'][index][0];
    if (emittedValue === expected) {
      return {
        pass: true,
        message: () => '',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('emittedUpdateValue') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `EmittedValue: ${this.utils.printReceived(emittedValue)}\n`,
      };
    }
  },
});

/**
 * セレクターの選択イベントを発生させ, 選択されていることを確認する.
 * @param {Onject} param - コンポーネントとセレクターの設定用オブジェクト
 * @param {Object} param.selectorChildEquipment - コンポーネント
 * @param {String} param.testId - 選択対象のセレクターのテストID
 * @param {Object} param.option - 選択対象のセレクターのオプション ({value: value, text: text})
 */
const selectOption = async ({selectorChildEquipment, label, option}) => {
  // optionsにupdateイベントで選択するデータがセットされていることを確認する
  // 注意: optionを取得していないままupdateイベントを実行するとテストに失敗する
  await selectorChildEquipment.findByText(option.text);

  // 操作するセレクターを取得し, 選択イベントを発生させる
  const input = selectorChildEquipment.getByLabelText(label);
  await input.focus();
  await fireEvent.change(input, {target: {value: option.text}});
  await input.blur();
};

/**
 * 全てのセレクターを選択する.
 * @param {Object} param - コンポーネントとライン群・ライン・子設備セレクターの設定用オブジェクト
 * @param {Object} param.selectorChildEquipment - コンポーネント
 * @param {Object} param.lineGroupOption - ライン群の選択設定 ({value: value, text: text})
 * @param {Object} param.lineOption - ラインの選択設定 ({value: value, text: text})
 * @param {Object} param.childEquipOption -子設備の選択設定 ({value: value, text: text})
 */
const selectOptionAll = async ({
  selectorChildEquipment,
  lineGroupOption = {
    value: getLineGroupsTestData.lineGroups[0].id,
    text: getLineGroupsTestData.lineGroups[0].name,
  },
  lineOption = {
    value: getLineGroup0TestData.lines[0].lineId,
    text: getLineGroup0TestData.lines[0].lineName,
  },
  childEquipOption = {
    value: getLineGroup0ToChildEquips0TestData.childEquips[0].childEquipId,
    text: getLineGroup0ToChildEquips0TestData.childEquips[0].childEquipName,
  },
}) => {
  // ライン群セレクターから選択する
  await selectOption({
    selectorChildEquipment: selectorChildEquipment,
    label: 'ライン群',
    option: {
      value: lineGroupOption.value,
      text: lineGroupOption.text,
    },
  });

  // ラインセレクターから選択する
  await selectOption({
    selectorChildEquipment: selectorChildEquipment,
    label: 'ライン',
    option: {
      value: lineOption.value,
      text: lineOption.text,
    },
  });

  // 子設備セレクターから選択する
  await selectOption({
    selectorChildEquipment: selectorChildEquipment,
    label: '子設備',
    option: {
      value: childEquipOption.value,
      text: childEquipOption.text,
    },
  });
};
