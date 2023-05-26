import {render} from '@testing-library/vue';
import ChartLine from '@/components/common/ChartLine.vue';
import Plotly from 'plotly.js/dist/plotly';
import {ResizeObserverMock} from '../../util/ResizeObserverMock.js';

Plotly.react = jest.fn();
beforeEach(() => {
  Plotly.react.mockClear();
});

/**
 * ResizeObserverにモックをセット.
 */
window.ResizeObserver = ResizeObserverMock;

/**
 * ChartLineの初期描画のテスト.
 */
describe('初期描画', () => {
  /**
   * Data数が0でNo Dataを表示する.
   */
  test('No Dataの表示', async () => {
    const chartLine = await render(ChartLine, {
      props: createProps({xData: [], yData: []}),
    });

    expect(chartLine).displayNoData();
  });
  /**
   * Data数が1以上でグラフを表示する.
   */
  test('グラフ表示', async () => {
    const chartLine = await render(ChartLine, {
      props: createProps({xData: [1, 2, 3], yData: [1, 2, 3]}),
    });

    expect(chartLine).displayChart();
  });
});

/**
 * ChartLineのProps変化に対する振る舞いのテスト.
 */
describe('Propsの変化に対する振る舞いテスト.', () => {
  /**
   * 描画用データを変更で再描画.
   */
  test('Dataあり->なしの変更で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});

    expect(chartLine).displayChart();

    await chartLine.updateProps({xData: [], yData: []});

    expect(chartLine).displayNoData(); // No Dataが表示される.
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * 描画用データの追加で再描画.
   *   データの追加はArrayのconcatメソッドで行う.
   *   Plotlyの仕様上, Arrayのインスタンスが変わったときのみ再描画するため.
   */
  test('Dataの追加で再描画', async () => {
    const props = createProps({});
    const chartLine = await render(ChartLine, {props});

    expect(chartLine).displayChart();

    props.xData = props.xData.concat([4]);
    props.yData = props.yData.concat([4]);
    await chartLine.updateProps({
      xData: props.xData,
      yData: props.yData,
    });

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * xAxisTitleを変化させて再描画.
   */
  test('xAxisTitleの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({xAxisTitle: 'updated xAxisTitle'});

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * yAxisTitleを変化させて再描画.
   */
  test('yAxisTitleの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({yAxisTitle: 'updated yAxisTitle'});

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * xAxisMinを変化させて再描画.
   */
  test('xAxisMinの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({
      xAxisMin: new Date('2021-06-09T09:01:32.041+09:00'),
    });

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * xAxisMaxを変化させて再描画.
   */
  test('xAxisMaxの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({
      xAxisMax: new Date('2021-06-10T09:01:32.041+09:00'),
    });

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * xAxisMin,xAxisMaxを変化させて再描画.
   */
  test('xAxisMin,xAxisMaxの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({
      xAxisMin: new Date('2021-06-09T10:01:32.041+09:00'),
      xAxisMax: new Date('2021-06-10T10:01:32.041+09:00'),
    });

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * yAxisMinを変化させて再描画.
   */
  test('yAxisMinの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({yAxisMin: 1});

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * yAxisMaxを変化させて再描画.
   */
  test('yAxisMaxの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({yAxisMax: 1});

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * yAxisMin,yAxisMaxを変化させて再描画.
   */
  test('yAxisMin,yAxisMaxの変化で再描画', async () => {
    const chartLine = await render(ChartLine, {props: createProps({})});
    expect(chartLine).displayChart();

    await chartLine.updateProps({yAxisMin: 1, yAxisMax: 1});

    expect(chartLine).displayChart();
    expect(chartLine).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
});

expect.extend({
  /**
   * No Dataが表示され, Chartは表示されていないことを確認する.
   * @param {Object} received - ChartLineオブジェクト
   * @return {Object}
   */
  displayNoData(received) {
    const noData = received.queryByText('No Data');
    const chart = received.getByTestId('chart');
    if (noData && chart.style.display === 'none') {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayNoData') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(
            "Only 'No Data' should be displayed"
          )}\n` +
          `noData: ${this.utils.printReceived(noData)}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
  /**
   * Chartが表示され, No Dataが表示されていないことを確認する.
   * @param {Object} received - ChartLineオブジェクト
   * @return {Object}
   */
  displayChart(received) {
    const noData = received.queryByText('No Data');
    const chart = received.getByTestId('chart');
    if (!noData && chart.style.display !== 'none') {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayChart') +
          '\n\n' +
          `Expected: ${this.utils.printExpected('Chart is displayed')}\n` +
          `noData: ${this.utils.printReceived(noData)}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
  /**
   * 再描画処理が呼ばれたことの確認.
   * Plotly.reactがcallされたことの確認.
   * @param {Object} received - ChartLineオブジェクト
   * @param {Number} expected - 期待するPlotly.reactが呼び出された回数
   * @return {Object}
   */
  numOfTimesToRedraw(received, expected) {
    if (Plotly.react.mock.calls.length === expected) {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('numOfTimesToRedraw') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `received: ${this.utils.printReceived(
            Plotly.react.mock.calls.length
          )}\n`,
      };
    }
  },
});

const createProps = ({
  xAxisTitle = 'test x axis title',
  yAxisTitle = 'test y axis title',
  xAxisMin = new Date('2021-06-09T05:01:32.041+09:00'),
  xAxisMax = new Date('2021-06-10T05:01:32.041+09:00'),
  yAxisMin = 0,
  yAxisMax = 10,
  xData = [1, 2, 3],
  yData = [1, 2, 3],
}) => {
  return {
    xAxisTitle,
    yAxisTitle,
    xAxisMin,
    xAxisMax,
    yAxisMin,
    yAxisMax,
    xData,
    yData,
  };
};
