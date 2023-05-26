<!--グラフ描画時のデータをまとめグラフの基になるコンポーネント.
  x軸とy軸のデータやそれぞれの最大・最小値等をセットして使用する.
-->

<script>
// See:
//   https://github.com/plotly/plotly-webpack
import Plotly from 'plotly.js/dist/plotly';
import {isDefined} from '@/common/utils/util.js';

export default {
  name: 'ChartBase',
  /**
   * ChartBase Props.
   * @typedef {Object} ChartBase
   * @prop {Number} yAxisMin - y軸描画域の最小値
   * @prop {Number} yAxisMax - y軸描画域の最大値
   * @prop {Array} xData - x軸用データ
   * @prop {Array} yData - y軸用データ
   * @prop {Array} yAxisThresholds - y軸閾値の配列
   * @prop {Array} chartHeight - 描画領域のHeight
   */
  props: {
    yAxisMin: {
      type: Number,
      required: true,
    },
    yAxisMax: {
      type: Number,
      required: true,
    },
    xData: {
      type: Array,
      required: true,
    },
    yData: {
      type: Array,
      required: true,
    },
    yAxisThresholds: {
      type: Array,
      default() {
        return [];
      },
    },
    chartHeight: {
      type: Number,
      default: 240,
    },
  },
  emits: ['update:yAxisMin', 'update:yAxisMax'],
  computed: {
    noData() {
      return this.xData.length === 0 || this.yData.length === 0;
    },
  },
  watch: {
    trace() {
      this.redrawChart();
    },
    layout() {
      this.redrawChart();
    },
  },
  /**
   * mount時に描画する.
   */
  mounted() {
    // 20210617: おそらく不要なためコメントアウト.
    // 検証のためしばらく残し, 問題ないことが確認出来次第削除する.
    // this.createChart();

    // 親要素の大きさ変更を検知して, this.createChart()を実行する.
    const observer = new ResizeObserver(() => {
      this.createChart();
    });
    observer.observe(this.$el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  },
  methods: {
    /**
     * plotly_relayoutイベントのハンドラ.
     * @param {plotlyEvent} plotlyEvent - plotly_relayoutイベント
     */
    handlePlotlyRelayout(plotlyEvent) {
      this.updateYAxisRange(plotlyEvent);
    },
    /**
     * y軸の値を呼び出し元にemitする.
     * plotly_relayoutイベント発生時のイベントハンドラとして利用.
     * @param {plotlyEvent} plotlyEvent - plotly_relayoutイベント
     */
    updateYAxisRange(plotlyEvent) {
      // See:
      //    https://plotly.com/javascript/plotlyjs-events/#update-data

      if (isDefined(plotlyEvent['yaxis.range[0]'])) {
        this.$emit('update:yAxisMin', plotlyEvent['yaxis.range[0]']);
      }
      if (isDefined(plotlyEvent['yaxis.range[1]'])) {
        this.$emit('update:yAxisMax', plotlyEvent['yaxis.range[1]']);
      }
    },
    /**
     * chartを描画する.
     */
    createChart() {
      const chart = this.$refs.plot;
      if (chart) {
        Plotly.newPlot(
          chart,
          [this.trace],
          this.layout,
          {scrollZoom: true},
          {responsive: true}
        );
        // See:
        //    https://plotly.com/javascript/plotlyjs-events/#update-data
        chart.on('plotly_relayout', this.handlePlotlyRelayout);
      }
    },
    /**
     * chartを再描画する.
     * 要素の大きさ変更による再描画は, Plotly.react()の制約によりできない.
     * 代わりに, createChart()を用いること.
     */
    redrawChart() {
      const chart = this.$refs.plot;
      Plotly.react(
        chart,
        [this.trace],
        this.layout,
        {scrollZoom: true},
        {responsive: true}
      );
    },
  },
};
</script>
