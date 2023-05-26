import {render} from '@testing-library/vue';
import CycleTimeChartSet from '@/components/pages/CycleTimePage/CycleTimeChartSet.vue';
import {ResizeObserverMock} from '../../../util/ResizeObserverMock.js';

/**
 * ResizeObserverにモックをセット.
 */
window.ResizeObserver = ResizeObserverMock;

/**
 * 初期描画のテスト.
 * 確認項目
 *   ChartLineが表示されること.
 *   ChartHistogramが表示されること.
 */
describe('初期描画', () => {
  test('ChartLine,ChartHistogramの表示', async () => {
    const cycleTimeChartSet = await render(CycleTimeChartSet, {
      props: {
        xData: [],
        yData: [],
        yAxisThresholds: [],
        lineChartYAxisTitle: 'Y軸タイトル',
        xAxisMin: new Date('2021-06-09T05:01:32.041+09:00'),
        xAxisMax: new Date('2021-06-10T05:01:32.041+09:00'),
      },
    });
    expect(cycleTimeChartSet).displayChartLine();
    expect(cycleTimeChartSet).displayCharHistgram();
  });
});

expect.extend({
  /**
   * ChartLineが表示されることを確認する.
   * @param {Object} received - CycleTimeChartSetオブジェクト
   * @return {Object}
   */
  displayChartLine(received) {
    const chart = received.getByTestId('chart-line');
    if (chart) {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayChartLine') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(
            "'ChartLine' should be displayed"
          )}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
  /**
   * ChartHistgramが表示されることを確認する.
   * @param {Object} received - CycleTimeChartSetオブジェクト
   * @return {Object}
   */
  displayCharHistgram(received) {
    const chart = received.getByTestId('chart-histogram');
    if (chart) {
      return {
        pass: true,
        message: () => 'You should not use this expect statement with "not"',
      };
    } else {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('displayCharHistgram') +
          '\n\n' +
          `Expected: ${this.utils.printExpected(
            "'CharHistgram' should be displayed"
          )}\n` +
          `chart: ${this.utils.printReceived(chart)}\n`,
      };
    }
  },
});
