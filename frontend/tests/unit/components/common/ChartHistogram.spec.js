import {render} from '@testing-library/vue';
import ChartHistogram from '@/components/common/ChartHistogram.vue';
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
 * ChartHistogramの初期描画のテスト.
 */
describe('初期描画', () => {
  /**
   * Data数が0でNo Dataを表示する.
   */
  test('No Dataの表示', async () => {
    const chartHistogram = await render(ChartHistogram, {
      props: createProps({xData: [], yData: []}),
    });

    expect(chartHistogram).displayNoData();
  });
  /**
   * Data数が1以上でグラフを表示する.
   */
  test('グラフ表示', async () => {
    const chartHistogram = await render(ChartHistogram, {
      props: createProps({xData: [1, 2, 3], yData: [1, 2, 3]}),
    });

    expect(chartHistogram).displayChart();
  });
});

/**
 * ChartHistogramのProps変化に対する振る舞いのテスト.
 */
describe('Propsの変化に対する振る舞いテスト.', () => {
  /**
   * 描画用データを変更で再描画.
   */
  test('Dataあり->なしの変更で再描画', async () => {
    const chartHistogram = await render(ChartHistogram, {
      props: createProps({}),
    });

    expect(chartHistogram).displayChart();

    await chartHistogram.updateProps({xData: [], yData: []});

    expect(chartHistogram).displayNoData(); // No Dataが表示される.
    expect(chartHistogram).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * 描画用データの追加で再描画.
   *   データの追加はArrayのconcatメソッドで行う.
   *   Plotlyの仕様上, Arrayのインスタンスが変わったときのみ再描画するため.
   */
  test('Dataの追加で再描画', async () => {
    const props = createProps({});
    const chartHistogram = await render(ChartHistogram, {props});

    expect(chartHistogram).displayChart();

    props.xData = props.xData.concat([4]);
    props.yData = props.yData.concat([4]);
    await chartHistogram.updateProps({
      xData: props.xData,
      yData: props.yData,
    });

    expect(chartHistogram).displayChart();
    expect(chartHistogram).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
  /**
   * yAxisMinを変化させて再描画.
   */
  test('yAxisMinの変化で再描画', async () => {
    const chartHistogram = await render(ChartHistogram, {
      props: createProps({}),
    });
    expect(chartHistogram).displayChart();

    await chartHistogram.updateProps({yAxisMin: 2});

    expect(chartHistogram).displayChart();
    expect(chartHistogram).numOfTimesToRedraw(2); // layoutとtraceで2回再描画する.
  });
  /**
   * yAxisMaxを変化させて再描画.
   */
  test('yAxisMaxの変化で再描画', async () => {
    const chartHistogram = await render(ChartHistogram, {
      props: createProps({}),
    });
    expect(chartHistogram).displayChart();

    await chartHistogram.updateProps({yAxisMax: 1});

    expect(chartHistogram).displayChart();
    expect(chartHistogram).numOfTimesToRedraw(2); // layoutとtraceで2回再描画する.
  });
  /**
   * yBinsを変化させて再描画.
   */
  test('yBinsの変化で再描画', async () => {
    const chartHistogram = await render(ChartHistogram, {
      props: createProps({}),
    });
    expect(chartHistogram).displayChart();

    await chartHistogram.updateProps({yBins: 10}); // デフォルト値20から変化させる.

    expect(chartHistogram).displayChart();
    expect(chartHistogram).numOfTimesToRedraw(1); // 1度だけ再描画されている.
  });
});

expect.extend({
  /**
   * No Dataが表示され, Chartは表示されていないことを確認する.
   * @param {Object} received - ChartHistogramオブジェクト
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
   * @param {Object} received - ChartHistogramオブジェクト
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
   * @param {Object} received - ChartHistogramオブジェクト
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
  yAxisMin = 0,
  yAxisMax = 10,
  xData = [1, 2, 3],
  yData = [1, 2, 3],
}) => {
  return {
    xAxisTitle,
    yAxisTitle,
    yAxisMin,
    yAxisMax,
    xData,
    yData,
  };
};
