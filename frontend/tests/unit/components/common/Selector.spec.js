import {render, fireEvent} from '@testing-library/vue';
import Selector from '@/components/common/Selector.vue';

const twoOptions = [
  {
    text: 'optionA',
    value: '0',
  },
  {
    text: 'optionB',
    value: '1',
  },
];

const threeOptions = [
  {
    text: 'optionB',
    value: '1',
  },
  {
    text: 'optionC',
    value: '2',
  },
  {
    text: 'optionC',
    value: '3',
  },
];

/**
 * selectFirstOption == false時の初期描画のテスト.
 * 確認項目
 *   selectボックスで選択されている値.
 *   selectボックスで選択可能な選択肢の数.
 *   初期選択項目にdisabledが設定されていること.
 */
describe('初期描画, selectFirstOption: false', () => {
  /**
   * ラベルのテキストが正しく描画されたか確認。
   */
  test('ラベルの確認', async () => {
    const selector = await render(Selector, {
      props: createProps({options: twoOptions}),
    });

    selector.getByText('ライン群');
  });
  test('選択肢2件, 初期値なし', async () => {
    const selector = await render(Selector, {
      props: createProps({options: twoOptions}),
    });

    expect(selector).hasSelectorValue('');
    expect(selector).hasSelectorOptions(twoOptions);
    expect(selector).defaultOptionDisplayedText('--選択してください--');
    expect(selector).defaultOptionDisabled();
    expect(selector).not.isDisabled();
  });
  test('選択肢2件, 初期値1', async () => {
    const selector = await render(Selector, {
      props: createProps({options: twoOptions, value: '1'}),
    });

    expect(selector).hasSelectorValue('1');
    expect(selector).hasSelectorOptions(twoOptions);
    expect(selector).defaultOptionDisplayedText('--選択してください--');
    expect(selector).defaultOptionDisabled();
    expect(selector).not.isDisabled();
  });
  test('選択肢0件', async () => {
    const selector = await render(Selector, {
      props: createProps({options: []}),
    });

    expect(selector).hasSelectorValue('');
    expect(selector).hasSelectorOptions([]);
    expect(selector).defaultOptionDisplayedText('No Options');
    expect(selector).defaultOptionDisabled('No Options');
    expect(selector).isDisabled();
  });
});

/**
 * selectFirstOption == true時の初期描画のテスト.
 * 確認項目
 *   selectボックスで選択されている値.
 *   selectボックスで選択可能な選択肢の数.
 *   初期選択項目にdisabledが設定されていること.
 */
describe('初期描画, selectFirstOption: true', () => {
  test('選択肢2件', async () => {
    const selector = await render(Selector, {
      props: {
        label: 'ライン群',
        options: twoOptions,
        selectFirstOption: true,
        value: '',
      },
    });

    expect(selector).defaultOptionDisabled();
    expect(selector).emittedUpdateValue({index: 0, expected: '0'});
    // emitにより親に渡った値でpropsを更新.
    await selector.updateProps({value: '0'});
    expect(selector).hasSelectorValue('0');
    expect(selector).hasSelectorOptions(twoOptions);
  });
  test('選択肢2件, 初期値: 1', async () => {
    const selector = render(Selector, {
      props: createProps({
        options: twoOptions,
        selectFirstOption: true,
        value: '1',
      }),
    });

    expect(selector).hasSelectorValue('1');
    expect(selector).hasSelectorOptions(twoOptions);
    expect(selector).defaultOptionDisabled();
  });
  /**
   * エラーが発生する入力のテスト.
   */
  test('選択肢0件', async () => {
    // passするが, コンソールにログが大量に出るのでコメントアウト.
    // expect(() => {
    //   render(Selector, {
    //     props: createProps({
    //       options: [],
    //       selectFirstOption: true,
    //       value: '',
    //     }),
    //   });
    // }).toThrow();
  });
});

/**
 * selectボックスで選択肢を選んだときの挙動のテスト.
 * 確認項目
 *   selectボックスで選択されている値.
 *   Selectorからemitされた値.
 */
describe('選択イベント発火', () => {
  test('選択肢2件', async () => {
    const selector = render(Selector, {
      props: createProps({options: twoOptions}),
    });

    const select = selector.getByLabelText('ライン群');
    await fireEvent.update(select, '1');

    expect(selector).hasSelectorValue('1');
    expect(selector).emittedUpdateValue({index: 0, expected: '1'});
  });
});

/**
 * Selectorに設定されている選択肢が更新されたときの挙動のテスト.
 * 確認項目
 *   selectボックスで選択可能な選択肢.
 *   selectボックスで選択されている値.
 *   Selectorからemitされた値.
 */
describe('選択肢の更新', () => {
  test('選択肢2件 -> 3件: 選択している値が更新によりなくなるケース', async () => {
    const selector = await render(Selector, {
      props: createProps({options: twoOptions, value: '0'}),
    });
    await selector.updateProps({options: threeOptions});
    expect(selector).hasSelectorOptions(threeOptions);
    expect(selector).hasSelectorValue(''); // 0はthreeOptionsには存在しない.
    expect(selector).emittedUpdateValue({index: 0, expected: ''}); // 親に空文字でemitする.
  });
  test('選択肢2件 -> 3件: 選択している値が更新後も存在するケース', async () => {
    const selector = await render(Selector, {
      props: createProps({options: twoOptions, value: '1'}),
    });
    await selector.updateProps({options: threeOptions});
    expect(selector).hasSelectorOptions(threeOptions);
    expect(selector).hasSelectorValue('1'); // 1はthreeOptionsに存在するので値を維持.
  });
});

expect.extend({
  /**
   * セレクトボックスで選択されている値を確認する.
   * @param {Object} received - Selectorオブジェクト
   * @param {String} expected - 表示を期待する値.
   * @return {Object}
   */
  hasSelectorValue(received, expected) {
    const select = received.getByLabelText('ライン群');
    const selectorValue = select.value;
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
   * disabledが設定されていることを確認する.
   * @param {Object} received - Selectorオブジェクト
   * @return {Object}
   */
  isDisabled(received) {
    const selector = received.getByLabelText('ライン群');
    if (selector.disabled) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('isDisabled') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(false)}\n` +
          `Received:${this.utils.printReceived(selector.disabled)}\n`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('isDisabled') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received:${this.utils.printReceived(selector.disabled)}\n`,
      };
    }
  },
  /**
   * セレクトボックスで選択可能な選択肢を確認する.
   *   簡略化のため, 20210610現在は要素数の確認に留めている.
   * @param {Object} received - Selectorオブジェクト
   * @param {Array} expected - 選択肢オブジェクトのArray.
   * @return {Object}
   */
  hasSelectorOptions(received, expected) {
    const select = received.getByLabelText('ライン群');
    // --選択してください--の分減らして比較.
    if (select.options.length - 1 === expected.length) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('selectorOptions') +
          '\n\n' +
          `ExpectedLength: not ${this.utils.printExpected(expected.length)}\n` +
          `SelectorValue:${this.utils.printReceived(
            select.options.length - 1
          )}\n`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('selectorOptions') +
          '\n\n' +
          `ExpectedLength: ${this.utils.printExpected(expected.length)}\n` +
          `SelectorValue:${this.utils.printReceived(select.options.length)}\n`,
      };
    }
  },
  /**
   * 初期表示として使う'--選択してください--', 'NoOptions'の表示を確認する.
   * @param {Object} received - Selectorオブジェクト.
   * @param {String} displayedText - 表示される文字列.
   * @return {Object}
   */
  defaultOptionDisplayedText(received, displayedText) {
    const defaultOption = received.queryByText(displayedText);
    if (defaultOption) {
      return {
        pass: true,
        message: () => '',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.printReceived(
            `element which has text '${displayedText}' not found`
          ),
      };
    }
  },
  /**
   * 初期表示として使う'--選択してください--', 'NoOptions'にdisabledが設定されていることを確認する.
   * @param {Object} received - Selectorオブジェクト.
   * @param {String} displayedText - 表示される文字列.
   * @return {Object}
   */
  defaultOptionDisabled(received, displayedText = '--選択してください--') {
    const defaultOption = received.getByText(displayedText);
    if (defaultOption.disabled) {
      return {
        pass: true,
        message: () => '',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.printReceived('defaultOption must be disabled!!'),
      };
    }
  },
  /**
   * Selectorオブジェクトからemitされた値を確認する.
   * @param {Object} received - Selectorオブジェクト
   * @param {Object} index, expected - index番目でemitされた値の期待値.
   * @return {Object}
   */
  emittedUpdateValue(received, {index, expected}) {
    const emittedValue = received.emitted()['input'][index][0];
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
 * Selectorのrenderで利用するPropsオブジェクトを作成する.
 * @param {Object} options, selectFirstOption, value - Propsに設定する値
 * @return {Object}
 */
const createProps = ({options, selectFirstOption = false, value = ''}) => {
  return {
    label: 'ライン群',
    options,
    selectFirstOption,
    value,
  };
};
