import {render, fireEvent} from '@testing-library/vue';
import SelectorSearchable from '@/components/common/SelectorSearchable.vue';

const twoOptions = [
  {
    text: 'optionA',
    value: 'value0',
  },
  {
    text: 'optionB',
    value: 'value1',
  },
];

const threeOptions = [
  {
    text: 'optionB',
    value: 'value1',
  },
  {
    text: 'optionC',
    value: 'value2',
  },
  {
    text: 'optionC',
    value: 'value3',
  },
];

/**
 * selectFirstOption == false時の初期描画のテスト.
 * 確認項目
 *   表示されている文字列.
 *   selectボックスで選択可能な選択肢の数.
 *   Placeholderに設定されている文字列.
 *   disabledが設定されているか否か.
 */
describe('初期描画, selectFirstOption: false', () => {
  /**
   * ラベルのテキストが正しく描画されたか確認。
   */
  test('ラベルの確認', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: createProps({options: twoOptions}),
    });

    selectorSearchable.getByText('ライン群');
  });
  test('選択肢2件, 初期値なし', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: createProps({options: twoOptions}),
    });

    expect(selectorSearchable).displayedText('');
    expect(selectorSearchable).hasSelectorOptions(twoOptions);
    selectorSearchable.getByPlaceholderText('--選択してください--');
    expect(selectorSearchable).not.isDisabled();
  });
  test('選択肢2件, 初期値value1', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: createProps({options: twoOptions, value: twoOptions[1].value}),
    });

    expect(selectorSearchable).displayedText(twoOptions[1].text);
    expect(selectorSearchable).hasSelectorOptions(twoOptions);
    selectorSearchable.getByPlaceholderText('--選択してください--');
    expect(selectorSearchable).not.isDisabled();
  });
  test('選択肢0件', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: createProps({options: []}),
    });

    expect(selectorSearchable).displayedText('');
    expect(selectorSearchable).hasSelectorOptions([]);
    selectorSearchable.getByPlaceholderText('No options');
    expect(selectorSearchable).isDisabled();
  });
});

/**
 * selectFirstOption == true時の初期描画のテスト.
 * 確認項目
 *   初期描画時にemitされた値.
 *   表示されている文字列.
 *   selectボックスで選択可能な選択肢の数.
 *   Placeholderに設定されている文字列.
 *   disabledが設定されているか否か.
 */
describe('初期描画, selectFirstOption: true', () => {
  test('選択肢2件', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: {
        label: 'ライン群',
        options: twoOptions,
        selectFirstOption: true,
        value: '',
      },
    });

    expect(selectorSearchable).emittedUpdateValue(twoOptions[0].value);
    // emitにより親に渡った値でpropsを更新.
    await selectorSearchable.updateProps({value: twoOptions[0].value});
    expect(selectorSearchable).displayedText(twoOptions[0].text);

    expect(selectorSearchable).hasSelectorOptions(twoOptions);

    selectorSearchable.getByPlaceholderText('--選択してください--');
    expect(selectorSearchable).not.isDisabled();
  });
  test('選択肢2件', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: {
        label: 'ライン群',
        options: twoOptions,
        selectFirstOption: true,
        value: twoOptions[1].value,
      },
    });

    selectorSearchable.getByPlaceholderText('--選択してください--');
    expect(selectorSearchable).not.isDisabled();
    expect(selectorSearchable).displayedText(twoOptions[1].text);
    expect(selectorSearchable).hasSelectorOptions(twoOptions);
  });
  /**
   * 省略: エラーが発生する入力のテスト.
   */
  test('選択肢0件', async () => {});
});

/**
 * selectボックスで選択肢を選んだときの挙動のテスト.
 * 確認項目
 *   表示されている文字列.
 *   SelectorSearchableからemitされた値.
 */
describe('選択イベント発火', () => {
  test('選択肢2件: 選択肢に存在する値を入力.', async () => {
    const selectorSearchable = render(SelectorSearchable, {
      props: createProps({options: twoOptions}),
    });

    await updateInputValue(selectorSearchable, twoOptions[1].text);
    expect(selectorSearchable).displayedText(twoOptions[1].text);
    expect(selectorSearchable).emittedUpdateValue(twoOptions[1].value);
  });

  /**
   * selectボックスで存在したい値を入力したときのテスト.
   * 確認項目
   *   表示されている文字列が入力前から変化しないこと.
   *   最後にemitされた値が入力前の選択肢と一致していること.
   */
  test('選択肢2件: 値選択後, 選択肢に存在しない値を入力.', async () => {
    const selectorSearchable = render(SelectorSearchable, {
      props: createProps({options: twoOptions}),
    });

    await updateInputValue(selectorSearchable, twoOptions[1].text);
    expect(selectorSearchable).displayedText(twoOptions[1].text);
    expect(selectorSearchable).emittedUpdateValue(twoOptions[1].value);

    await updateInputValue(selectorSearchable, 'invalid Text');
    expect(selectorSearchable).displayedText(twoOptions[1].text);
    expect(selectorSearchable).emittedUpdateValue(twoOptions[1].value);
  });
});

/**
 * focus -> 更新せずにblurしたときの挙動
 * 確認項目
 *   selectボックスで表示されている文字列が空文字 -> 以前に選択した値 となること.
 */
describe('focus -> 更新せずにblurしたときの挙動', () => {
  test('選択肢2件: 選択肢に存在する値を入力.', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: createProps({options: twoOptions, value: twoOptions[1].value}),
    });

    expect(selectorSearchable).displayedText(twoOptions[1].text);
    const input = selectorSearchable.getByLabelText('ライン群');
    // focusでユーザ入力をシミュレート.
    await input.focus();
    expect(selectorSearchable).displayedText('');
    // 更新せずにblur.
    await input.blur();
    // 元の値にもどる.
    expect(selectorSearchable).displayedText(twoOptions[1].text);
  });
});

/**
 * Selectorに設定されている選択肢が更新されたときの挙動のテスト.
 * 確認項目
 *   selectボックスで選択可能な選択肢.
 *   selectボックスで表示されている文字列.
 *   Selectorからemitされた値.
 */
describe('選択肢の更新', () => {
  test('選択肢2件 -> 3件: 選択している値が更新によりなくなるケース', async () => {
    const selectorSearchable = render(SelectorSearchable, {
      props: createProps({options: twoOptions, value: twoOptions[0].value}),
    });
    await selectorSearchable.updateProps({options: threeOptions});
    expect(selectorSearchable).hasSelectorOptions(threeOptions);
    expect(selectorSearchable).displayedText(''); // twoOptions[0].valueはthreeOptionsには存在しない.
    expect(selectorSearchable).emittedUpdateValue(''); // 親に空文字でemitする.
  });
  test('選択肢2件 -> 3件: 選択している値が更新後も存在するケース', async () => {
    const selectorSearchable = await render(SelectorSearchable, {
      props: createProps({options: twoOptions, value: twoOptions[1].value}),
    });
    await selectorSearchable.updateProps({options: threeOptions});
    expect(selectorSearchable).hasSelectorOptions(threeOptions);
    expect(selectorSearchable).displayedText(threeOptions[0].text); // value1はthreeOptionsに存在するので値を維持.
  });
});

expect.extend({
  /**
   * セレクトボックスで表示されている文字列を確認する.
   * @param {Object} received - SelectorSearchableオブジェクト
   * @param {String} expected - 表示を期待する値.
   * @return {Object}
   */
  displayedText(received, expected) {
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
   * セレクトボックスで選択可能な選択肢を確認する.
   *   簡略化のため, 20210610現在は要素数の確認に留めている.
   * @param {Object} received - SelectorSearchableオブジェクト
   * @param {Array} expected - 選択肢オブジェクトのArray.
   * @return {Object}
   */
  hasSelectorOptions(received, expected) {
    const datalist = received.getByTestId('datalist');
    if (datalist.options.length === expected.length) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('selectorOptions') +
          '\n\n' +
          `ExpectedLength: not ${this.utils.printExpected(expected.length)}\n` +
          `SelectorValue:${this.utils.printReceived(
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
          `SelectorValue:${this.utils.printReceived(
            datalist.options.length
          )}\n`,
      };
    }
  },
  /**
   * disabledが設定されていることを確認する.
   * @param {Object} received - SelectorSearchableオブジェクト
   * @return {Object}
   */
  isDisabled(received) {
    const selectorSearchable = received.getByLabelText('ライン群');
    if (selectorSearchable.disabled) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('isDisabled') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(false)}\n` +
          `Received:${this.utils.printReceived(selectorSearchable.disabled)}\n`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('isDisabled') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received:${this.utils.printReceived(selectorSearchable.disabled)}\n`,
      };
    }
  },
  /**
   * SelectorSearchableオブジェクトから最後にemitされた値を確認する.
   * @param {Object} received - SelectorSearchableオブジェクト
   * @param {String} expected - 期待する値
   * @return {Object}
   */
  emittedUpdateValue(received, expected) {
    const lastIndex = received.emitted()['input'].length - 1;
    const emittedValue = received.emitted()['input'][lastIndex][0];

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
 * SelectorSearchableのrenderで利用するPropsオブジェクトを作成する.
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

/**
 * Inputの入力イベントを発火する.
 * @param {Object} selectorSearchable - SelectorSearchableオブジェクト.
 * @param {String} inputValue - 入力値.
 */
const updateInputValue = async (selectorSearchable, inputValue) => {
  const input = selectorSearchable.getByLabelText('ライン群');
  // focusでユーザ入力をシミュレート.
  await input.focus();
  // @changeを設定しているからか, fireEvent.updateでは想定動作しないのでchangeにしている.
  await fireEvent.change(input, {target: {value: inputValue}});
  await input.blur();
};
