<!--折れ線グラフのコンポーネント.-->

<template>
  <div>
    <p v-if="noData">No Data</p>
    <div v-show="!noData" ref="plot" data-testid="chart"></div>
  </div>
</template>

<script>
import ChartBase from './ChartBase.vue';
import {getMinElement, getMaxElement} from '@/common/utils/array.js';

export default {
  name: 'ChartLine',
  mixins: [ChartBase],
  /**
   * ChartLine Props.
   * @typedef {Object} ChartLine
   * @prop {string} xAxisTitle - x軸タイトル
   * @prop {string} xAxisTickFormat - x軸目盛りラベルのフォーマットルール
   * @prop {string} yAxisTitle - y軸タイトル
   * @prop {Date} xAxisMin - x軸範囲の最小値
   * @prop {Date} xAxisMax - x軸範囲の最大値
   */
  props: {
    xAxisTitle: {
      type: String,
      required: true,
    },
    xAxisTickFormat: {
      type: String,
      default: '%H:%M:%S',
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
    xAxisMin: {
      type: Date,
      default() {
        return new Date(getMinElement(this.xData));
      },
    },
    xAxisMax: {
      type: Date,
      default() {
        return new Date(getMaxElement(this.xData));
      },
    },
  },
  data() {
    return {
      xAxisResizeMin: '', // X軸範囲ズームイン・アウトの最小値
      xAxisResizeMax: '', // X軸範囲ズームイン・アウトの最大値
    };
  },
  computed: {
    /**
     * X軸範囲の最小値、最大値を返却.
     * @return {Array} - X軸範囲の最小値、最大値の配列
     */
    layoutXAxis() {
      if (this.xAxisResizeMin && this.xAxisResizeMax) {
        return [this.xAxisResizeMin, this.xAxisResizeMax];
      }
      return [this.xAxisMin, this.xAxisMax];
    },
    /**
     * LineChart描画用のtraceを返却.
     * See:
     *   https://plotly.com/javascript/reference/scatter/
     * @return {Object} -- LineChart描画用のtraceオブジェクト
     */
    trace() {
      return {
        type: 'scattergl',
        x: this.xData,
        y: this.yData,
        hoverinfo: 'text+x+y',
        mode: 'lines+markers',
        line: {
          color: 'rgb(41, 135, 187)',
          width: 0.3,
        },
      };
    },
    /**
     * LineChart描画用のlayoutを返却.
     * See:
     *   https://plotly.com/javascript/reference/layout/
     * @return {Object} -- LineChart描画用のlaoyoutオブジェクト
     */
    layout() {
      const layout = {
        xaxis: {
          title: this.xAxisTitle,
          tickformat: this.xAxisTickFormat,
          tickangle: 0,
          nticks: 6,
          type: 'Date',
          range: this.layoutXAxis,
        },
        yaxis: {
          title: this.yAxisTitle,
          range: [this.yAxisMin, this.yAxisMax],
        },
        margin: {l: 50, r: 30, b: 60, t: 40, pad: 10},
        height: this.chartHeight,
        showlegend: false,
        shapes: this.yAxisThresholds.map((threshold) => {
          return {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: threshold,
            x1: 1,
            y1: threshold,
            line: {
              color: 'rgb(255, 0, 0)',
              width: 1,
            },
          };
        }),
      };
      return layout;
    },
  },
  methods: {
    /**
     * plotly_relayoutイベントのハンドラ.
     * @param {plotlyEvent} plotlyEvent - plotly_relayoutイベント
     */
    handlePlotlyRelayout(plotlyEvent) {
      this.updateXAxisRange(plotlyEvent);
      this.updateYAxisRange(plotlyEvent);
    },
    /**
     * x軸の値を更新する.
     * plotly_relayoutイベント発生時のイベントハンドラとして利用.
     * @param {plotlyEvent} plotlyEvent - plotly_relayoutイベント
     */
    updateXAxisRange(plotlyEvent) {
      if (plotlyEvent['xaxis.range[0]']) {
        this.xAxisResizeMin = plotlyEvent['xaxis.range[0]'];
      }
      if (plotlyEvent['xaxis.range[1]']) {
        this.xAxisResizeMax = plotlyEvent['xaxis.range[1]'];
      }
    },
  },
};
</script>
