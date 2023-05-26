import {render, fireEvent} from '@testing-library/vue';
import CycleTimeViewer from '@/components/pages/CycleTimePage/CycleTimeViewer.vue';
import {ResizeObserverMock} from '../../../util/ResizeObserverMock.js';

/**
 * ResizeObserverにモックをセット.
 */
window.ResizeObserver = ResizeObserverMock;

/**
 * 初期描画のテスト.
 */
describe('初期描画', () => {
  /**
   * initialDataTypeが親から渡されていない(デフォルト値cycleTime)の場合の表示.
   * 確認項目
   *   セレクターとCycletimeChartSetが表示される.
   *   セレクターには「サイクルタイム」が選択される.
   *   CycletimeChartSetのグラフにはサイクルタイムのデータが表示される.
   */
  test('initialDataType=cycleTime(デフォルト値)', async () => {
    const component = await render(CycleTimeViewer, {
      props: createProps({}),
    });

    expect(component).hasSelectorValue('cycleTime');
    expect(component).displayChartSetCycleTimeOnly();
  });
  /**
   * initialDataTypeが親から渡された場合(machineTime)の表示.
   * 確認項目
   *   セレクターとCycletimeChartSetが表示される.
   *   セレクターには「マシンタイム」が選択される.
   *   CycletimeChartSetのグラフにはマシンタイムのデータが表示される.
   */
  test('initialDataType＝machineTime', async () => {
    const component = await render(CycleTimeViewer, {
      props: createProps({initialDataType: 'machineTime'}),
    });

    expect(component).hasSelectorValue('machineTime');
    expect(component).displayChartSetMachineTimeOnly();
  });
});

/**
 * セレクター更新時の挙動テスト.
 */
describe('セレクター更新時の挙動テスト', () => {
  test('セレクター更新時の挙動テスト', async () => {
    const component = await render(CycleTimeViewer, {
      props: createProps({}),
    });

    /**
     * セレクターでマシンタイムに更新する.
     * 確認項目
     *   セレクターには「マシンタイム」が選択される.
     *   CycletimeChartSetのグラフにはマシンタイムのデータが表示される.
     */
    await selectOption({component: component, value: 'machineTime'});
    expect(component).hasSelectorValue('machineTime');
    expect(component).displayChartSetMachineTimeOnly();

    /**
     * セレクターで前干渉停止に更新する.
     * 確認項目
     *   セレクターには「前干渉停止」が選択される.
     *   CycletimeChartSetのグラフには前干渉停止のデータが表示される.
     */
    await selectOption({component: component, value: 'stopTimebyPrevProcess'});
    expect(component).hasSelectorValue('stopTimebyPrevProcess');
    expect(component).displayChartSetStopTimebyPrevProcessOnly();

    /**
     * セレクターで後干渉停止に更新する.
     * 確認項目
     *   セレクターには「後干渉停止」が選択される.
     *   CycletimeChartSetのグラフには後干渉停止のデータが表示される.
     */
    await selectOption({component: component, value: 'stopTimebyPostProcess'});
    expect(component).hasSelectorValue('stopTimebyPostProcess');
    expect(component).displayChartSetStopTimebyPostProcessOnly();

    /**
     * セレクターでサイクルタイムに更新する.
     * 確認項目
     *   セレクターには「サイクルタイム」が選択される.
     *   CycletimeChartSetのグラフにはサイクルタイムのデータが表示される.
     */
    await selectOption({component: component, value: 'cycleTime'});
    expect(component).hasSelectorValue('cycleTime');
    expect(component).displayChartSetCycleTimeOnly();
  });
});

expect.extend({
  /**
   * セレクトボックスで選択されている値を確認する..
   * @param {Object} received - CycleTimeViewerオブジェクト
   * @param {String} expected - 表示を期待する値.
   * @return {Object}
   */
  hasSelectorValue(received, expected) {
    const select = received.getByLabelText('表示データ');
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
   * サイクルタイムのデータが入ったCycleTimeChartSetのみが表示されることを確認する.
   * @param {Object} received - CycleTimeViewerオブジェクト
   * @return {Object}
   */
  displayChartSetCycleTimeOnly(received) {
    const chartSetCycleTime = received.getByTestId('chart-set-cycle-time');
    const chartSetMachineTime = received.queryByTestId(
      'chart-set-machine-time'
    );
    const chartSetStopTimebyPrevProcess = received.queryByTestId(
      'chart-set-stop-timeby-prev-process'
    );
    const chartSetStopTimebyPostProcess = received.queryByTestId(
      'chart-set-stop-timeby-post-process'
    );
    if (
      chartSetCycleTime &&
      chartSetMachineTime === null &&
      chartSetStopTimebyPrevProcess === null &&
      chartSetStopTimebyPostProcess === null
    ) {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayChartSetCycleTimeOnly') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(
            "Only 'ChartSetCycleTime' should be displayed"
          )}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
  /**
   * マシンタイムのデータが入ったCycleTimeChartSetのみが表示されることを確認する.
   * @param {Object} received - CycleTimeViewerオブジェクト
   * @return {Object}
   */
  displayChartSetMachineTimeOnly(received) {
    const chartSetCycleTime = received.queryByTestId('chart-set-cycle-time');
    const chartSetMachineTime = received.getByTestId('chart-set-machine-time');
    const chartSetStopTimebyPrevProcess = received.queryByTestId(
      'chart-set-stop-timeby-prev-process'
    );
    const chartSetStopTimebyPostProcess = received.queryByTestId(
      'chart-set-stop-timeby-post-process'
    );
    if (
      chartSetCycleTime === null &&
      chartSetMachineTime &&
      chartSetStopTimebyPrevProcess === null &&
      chartSetStopTimebyPostProcess === null
    ) {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayChartSetMachineTimeOnly') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(
            "Only 'ChartSetMachineTime' should be displayed"
          )}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
  /**
   * 前干渉停止のデータが入ったCycleTimeChartSetのみが表示されることを確認する.
   * @param {Object} received - CycleTimeViewerオブジェクト
   * @return {Object}
   */
  displayChartSetStopTimebyPrevProcessOnly(received) {
    const chartSetCycleTime = received.queryByTestId('chart-set-cycle-time');
    const chartSetMachineTime = received.queryByTestId(
      'chart-set-machine-time'
    );
    const chartSetStopTimebyPrevProcess = received.getByTestId(
      'chart-set-stop-timeby-prev-process'
    );
    const chartSetStopTimebyPostProcess = received.queryByTestId(
      'chart-set-stop-timeby-post-process'
    );
    if (
      chartSetCycleTime === null &&
      chartSetMachineTime === null &&
      chartSetStopTimebyPrevProcess &&
      chartSetStopTimebyPostProcess === null
    ) {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayChartSetStopTimebyPrevProcessOnly') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(
            "Only 'ChartSetStopTimebyPrevProcess' should be displayed"
          )}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
  /**
   * 後干渉停止のデータが入ったCycleTimeChartSetのみが表示されることを確認する.
   * @param {Object} received - CycleTimeViewerオブジェクト
   * @return {Object}
   */
  displayChartSetStopTimebyPostProcessOnly(received) {
    const chartSetCycleTime = received.queryByTestId('chart-set-cycle-time');
    const chartSetMachineTime = received.queryByTestId(
      'chart-set-machine-time'
    );
    const chartSetStopTimebyPrevProcess = received.queryByTestId(
      'chart-set-stop-timeby-prev-process'
    );
    const chartSetStopTimebyPostProcess = received.getByTestId(
      'chart-set-stop-timeby-post-process'
    );
    if (
      chartSetCycleTime === null &&
      chartSetMachineTime === null &&
      chartSetStopTimebyPrevProcess === null &&
      chartSetStopTimebyPostProcess
    ) {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayChartSetStopTimebyPrevProcessOnly') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(
            "Only 'ChartSetStopTimebyPrevProcess' should be displayed"
          )}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
});

/**
 * CycleTimeViewerのrenderで利用するPropsオブジェクトを作成する.
 * @param  {Object} initialDataType - 最初に選択しているデータタイプ（デフォルト値:'cycleTime'）
 * @return {Object}
 */
const createProps = ({initialDataType = 'cycleTime'}) => {
  return {
    dataset: {
      childEquipId: 'id0',
      cycleTime: {
        xData: ['0', '1', '2'],
        yData: [425, 91, 113],
        yAxisThresholds: [0.0, 0.5],
      },
      machineTime: {
        xData: ['0', '1', '2'],
        yData: [0, 0, 0],
        yAxisThresholds: [0.0, 0.6],
      },
      stopTimebyPrevProcess: {
        xData: ['0', '1', '2'],
        yData: [26.6, 26.6, 26.6],
        yAxisThresholds: [0.0, 0.7],
      },
      stopTimebyPostProcess: {
        xData: ['0', '1', '2'],
        yData: [285.1, 285.1, 285.1],
        yAxisThresholds: [0.0, 0.8],
      },
    },
    initialDataType: initialDataType,
    xAxisMin: new Date('2021-06-09T05:01:32.041+09:00'),
    xAxisMax: new Date('2021-06-10T05:01:32.041+09:00'),
  };
};

/**
 * セレクターの選択イベントを発生させ, 選択されていることを確認する.
 * @param {Onject} param - コンポーネントとセレクターの設定用オブジェクト
 * @param {Object} param.component - コンポーネント
 * @param {String} param.value - 選択するセレクターの値
 */
const selectOption = async ({component, value}) => {
  // 操作するセレクターを取得し, 選択イベントを発生させる
  const selector = component.getByLabelText('表示データ');
  await fireEvent.update(selector, value);
};
