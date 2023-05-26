import {render, fireEvent} from '@testing-library/vue';
import DatetimeRangePicker from '@/components/common/DatetimeRangePicker.vue';

const DATETIME_RANGE_MIN = '2000-01-01T00:00';
const DATETIME_RANGE_MAX = '2100-12-31T23:59';

/**
 * DatetimeRangePicker初期表示のテスト.
 */
describe('初期描画', () => {
  /**
   * ラベルのテキストが正しく描画されたか確認。
   */
  test('ラベルの確認', async () => {
    const initialFromTo = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFromTo,
        datetimeTo: initialFromTo,
      },
    });

    datetimeRangePicker.getByText('From');
    datetimeRangePicker.getByText('To');
  });

  /**
   * 正常系: datetimeFrom < datetimeTo
   * 確認事項:
   *    画面に描画されるFromとToの値
   *    emitされるFromとToの値
   */
  test('正常系: datetimeFrom < datetimeTo', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInitialFrom = '2021-06-09T05:01'; // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const displayedInitialTo = '2021-06-10T05:01';

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInitialFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInitialFrom)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInitialTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInitialTo)
    );
  });
  /**
   * 正常系: datetimeFrom = datetimeTo
   * 確認事項:
   *    画面に描画されるFromとToの値
   *    emitされるFromとToの値
   */
  test('正常系: datetimeFrom = datetimeTo', async () => {
    const initialFromTo = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInitialFromTo = '2021-06-09T05:01'; // 別のTimezoneでも動作するが, TestはJSTで実行される想定.

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFromTo,
        datetimeTo: initialFromTo,
      },
    });

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInitialFromTo);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInitialFromTo)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInitialFromTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInitialFromTo)
    );
  });
  /**
   * エラー: datetimeFrom > datetimeTo
   * 確認事項:
   *    エラーになること.
   *
   */
  test('エラー: datetimeFrom > datetimeTo', async () => {
    // render中の throw Error()を処理できないため, テスト不能.
  });
});
/**
 * DatetimeRangePickerのFromの入力に対する振る舞いテスト.
 */
describe('Fromの入力に対する振る舞いテスト', () => {
  /**
   * 通常入力
   *   入力値 = fromの初期値 + 10 minのケース.
   *      入力値はtoの初期値以前の値.
   *
   * 確認事項:
   *    fromの値が更新されていること.
   *    toの値が初期値のままであること.
   */
  test('通常入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInputFrom = '2021-06-09T05:11'; // 10 minutes after initialFrom
    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const displayedInitialTo = '2021-06-10T05:01';

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputFromValue(datetimeRangePicker, displayedInputFrom);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInputFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInputFrom)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInitialTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInitialTo)
    );
  });
  /**
   * Toより後の値を入力.
   *   入力値 = toの初期値 + 1dayのケース.
   *
   * 確認事項:
   *    fromの値が更新されていること.
   *    toの値がfromと一致すること.
   */
  test('Toより後の値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const displayedInputFromAndTo = '2021-06-11T05:11'; // 1 day after initialTo

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputFromValue(datetimeRangePicker, displayedInputFromAndTo);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInputFromAndTo);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInputFromAndTo)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInputFromAndTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInputFromAndTo)
    );
  });
  /**
   * 最小値以前の値を入力.
   *   入力値 = 最小値より1年前
   *
   * 確認事項:
   *    fromの値が最小値に更新されていること.
   *    toの値が初期値と一致すること.
   */
  test('最小値以前の値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const inputFrom = '1999-01-01T00:00'; // 1 year befor DATETIME_RANGE_MIN

    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const displayedInitialTo = '2021-06-10T05:01';

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputFromValue(datetimeRangePicker, inputFrom);

    expect(datetimeRangePicker).displayedDatetimeFrom(DATETIME_RANGE_MIN);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(DATETIME_RANGE_MIN)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInitialTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInitialTo)
    );
  });
  /**
   * 最大値以降の値を入力
   *   入力値 = 最大値より1年後の値
   *
   * 確認事項:
   *    fromの値が最大値に更新されているこが最大値に更新されていること
   *    toの値がfromと一致すること.
   */
  test('最大値以降の値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const inputFrom = '2101-12-31T23:59'; // 1 year after DATETIME_RANGE_MAX

    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputFromValue(datetimeRangePicker, inputFrom);

    expect(datetimeRangePicker).displayedDatetimeFrom(DATETIME_RANGE_MAX);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(DATETIME_RANGE_MAX)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(DATETIME_RANGE_MAX);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(DATETIME_RANGE_MAX)
    );
  });
  /**
   * 不正なフォーマットのFromを入力.
   *   入力値 = 不正な値.
   *
   * 確認事項:
   *    fromの値が初期値から変化しないこと.
   *    toの値が初期値から変化しないこと.
   */
  test('不正な値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInitialFrom = '2021-06-09T05:01'; // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const displayedInitialTo = '2021-06-10T05:01';

    const inputFrom = '-12-31T23:59'; // invalid format

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputFromValue(datetimeRangePicker, inputFrom);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInitialFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInitialFrom)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInitialTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInitialTo)
    );
  });
});
/**
 * DatetimeRangePickerのToの入力に対する振る舞いテスト.
 * ケース
 *   通常入力
 *   MAXより大きい値入力
 *   Fromより小さい値入力
 *   不正入力
 */
describe('Toの入力に対する振る舞いテスト', () => {
  /**
   * 通常入力
   *   入力値 = toの初期値 + 10 minのケース.
   *      入力値はの初期値以前の値.
   *
   * 確認事項:
   *    fromの値が更新されていないこと.
   *    toの値が入力値になっていること.
   */
  test('通常入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInitialFrom = '2021-06-09T05:01';
    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const displayedInputTo = '2021-06-10T05:11'; // 10 minutes after initialFrom

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputToValue(datetimeRangePicker, displayedInputTo);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInitialFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInitialFrom)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInputTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInputTo)
    );
  });
  /**
   * Fromより前の値を入力.
   *   入力値 = fromの初期値 - 1dayのケース.
   *
   * 確認事項:
   *    fromの値が初期値と変わらないこと.
   *    toの値がfromと一致すること.
   */
  test('Fromより前の値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInitialFrom = '2021-06-09T05:01';
    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const inputTo = '2021-06-08T05:11'; // 1 day before initialFrom

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputToValue(datetimeRangePicker, inputTo);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInitialFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInitialFrom)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInitialFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInitialFrom)
    );
  });
  /**
   * 最小値以前の値を入力.
   *   入力値 = 最小値より1年前
   *
   * 確認事項:
   *    fromの値が最小値に更新されていること.
   *    toの値が初期値と一致すること.
   */
  test('最小値以前の値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedFromTo = '2021-06-09T05:01'; // initialFromに一致

    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const inputTo = '1999-01-01T00:00'; // 1 year befor DATETIME_RANGE_MIN

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputToValue(datetimeRangePicker, inputTo);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedFromTo);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedFromTo)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedFromTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedFromTo)
    );
  });
  /**
   * 最大値以降の値を入力
   *   入力値 = 最大値より1年後の値
   *
   * 確認事項:
   *    fromの値が初期値から変化しないこと.
   *    toの値が最大値になっていること.
   */
  test('最大値以降の値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInitialFrom = '2021-06-09T05:01';

    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const inputTo = '2101-12-31T23:59'; // 1 year after DATETIME_RANGE_MAX

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputToValue(datetimeRangePicker, inputTo);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInitialFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInitialFrom)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(DATETIME_RANGE_MAX);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(DATETIME_RANGE_MAX)
    );
  });
  /**
   * 不正なフォーマットのToを入力.
   *   入力値 = 不正な値.
   *
   * 確認事項:
   *    fromの値が初期値から変化しないこと.
   *    toの値が初期値から変化しないこと.
   */
  test('不正な値を入力', async () => {
    const initialFrom = new Date('2021-06-09T05:01:32.041+09:00'); // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const displayedInitialFrom = '2021-06-09T05:01'; // 別のTimezoneでも動作するが, TestはJSTで実行される想定.
    const initialTo = new Date('2021-06-10T05:01:32.041+09:00'); // one day after InitialFrom
    const displayedInitialTo = '2021-06-10T05:01';

    const inputTo = '-12-31T23:59'; // invalid format

    const datetimeRangePicker = await render(DatetimeRangePicker, {
      props: {
        datetimeFrom: initialFrom,
        datetimeTo: initialTo,
      },
    });

    await inputToValue(datetimeRangePicker, inputTo);

    expect(datetimeRangePicker).displayedDatetimeFrom(displayedInitialFrom);
    expect(datetimeRangePicker).latestEmittedDatetimeFrom(
      new Date(displayedInitialFrom)
    );
    expect(datetimeRangePicker).displayedDatetimeTo(displayedInitialTo);
    expect(datetimeRangePicker).latestEmittedDatetimeTo(
      new Date(displayedInitialTo)
    );
  });
});

expect.extend({
  /**
   * 描画されているFromの値の確認.
   * @param {Object} received - DatetimeRangePickerオブジェクト.
   * @param {String} expected - 期待する表示値.
   * @return {Object}
   */
  displayedDatetimeFrom(received, expected) {
    const from = received.getByTestId('datetime-from');
    if (from.value === expected) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('displayedDatetimeFrom') +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `FromValue:${this.utils.printReceived(from.value)}\n`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayedDatetimeFrom') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `FromValue:${this.utils.printReceived(from.value)}\n`,
      };
    }
  },
  /**
   * 描画されているToの値の確認.
   * @param {Object} received - DatetimeRangePickerオブジェクト.
   * @param {String} expected - 期待する表示値.
   * @return {Object}
   */
  displayedDatetimeTo(received, expected) {
    const to = received.getByTestId('datetime-to');
    if (to.value === expected) {
      return {
        pass: true,
        message: () =>
          this.utils.matcherHint('displayedDatetimeTo') +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `ToValue:${this.utils.printReceived(to.value)}\n`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayedDatetimeTo') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `ToValue:${this.utils.printReceived(to.value)}\n`,
      };
    }
  },
  /**
   * update:datetimeFromイベントとして最後にemitされた値.
   * @param {Object} received - DatetimeRangePickerオブジェクト.
   * @param {Date} expected - 期待する最後のemitされた値.
   * @return {Object}
   */
  latestEmittedDatetimeFrom(received, expected) {
    const lastIndex = received.emitted()['update:datetimeFrom'].length - 1;
    const latestEmittedFrom = received.emitted()['update:datetimeFrom'][
      lastIndex
    ][0];

    if (latestEmittedFrom.getTime() === expected.getTime()) {
      return {
        pass: true,
        message: () => '',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('latestEmittedDatetimeFrom') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `EmittedFrom: ${this.utils.printReceived(latestEmittedFrom)}\n`,
      };
    }
  },
  /**
   * update:datetimeToイベントとして最後にemitされた値.
   * @param {Object} received - DatetimeRangePickerオブジェクト.
   * @param {Date} expected - 期待する最後のemitされた値.
   * @return {Object}
   */
  latestEmittedDatetimeTo(received, expected) {
    const lastIndex = received.emitted()['update:datetimeTo'].length - 1;
    const latestEmittedTo = received.emitted()['update:datetimeTo'][
      lastIndex
    ][0];

    if (latestEmittedTo.getTime() === expected.getTime()) {
      return {
        pass: true,
        message: () => '',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('latestEmittedDatetimeTo') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `EmittedTo: ${this.utils.printReceived(latestEmittedTo)}\n`,
      };
    }
  },
});

/**
 * Fromの入力イベントを発火する.
 * @param {Object} datetimeRangePicker - DatetimeRangePickerオブジェクト.
 * @param {String} inputValue - 入力値.
 */
const inputFromValue = async (datetimeRangePicker, inputValue) => {
  const from = datetimeRangePicker.getByTestId('datetime-from');
  const to = datetimeRangePicker.getByTestId('datetime-to');
  // focusでユーザ入力をシミュレート.
  from.focus();
  await fireEvent.update(from, inputValue);
  // toをfocusすることでfromのblurをemitする.
  //   こちらの方がblurの直接emitよりユーザ入力の状況に近い.
  to.focus();
};

/**
 * Toの入力イベントを発火する.
 * @param {Object} datetimeRangePicker - DatetimeRangePickerオブジェクト.
 * @param {String} inputValue - 入力値.
 */
const inputToValue = async (datetimeRangePicker, inputValue) => {
  const from = datetimeRangePicker.getByTestId('datetime-from');
  const to = datetimeRangePicker.getByTestId('datetime-to');
  // focusでユーザ入力をシミュレート.
  to.focus();
  await fireEvent.update(to, inputValue);
  // fromをfocusすることでfromのblurをemitする.
  from.focus();
};
