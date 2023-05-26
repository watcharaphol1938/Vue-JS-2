<!--ヒストグラムのコンポーネント.-->

<template>
  <div>
    <p v-if="noData">No Data</p>
    <div v-show="!noData" ref="plot" data-testid="chart"></div>
  </div>
</template>

<script>
import ChartBase from './ChartBase.vue';

export default {
  name: 'ChartHistogram',
  mixins: [ChartBase],
  /**
   * ChartHistogram Props.
   * @typedef {Object} ChartHistogram
   * @prop {Number} yBins - y軸の分割数
   */
  props: {
    yBins: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    /**
     * Histogram描画用のtraceを返却.
     * See:
     *   https://plotly.com/javascript/reference/histogram/
     * @return {Object} -- Histogram描画用のtraceオブジェクト
     */
    trace() {
      return {
        type: 'histogram',
        x: this.xData,
        y: this.yData,
        hoverinfo: 'x+y',
        orientation: 'h',
        ybins: {
          start: this.yAxisMin,
          size: (this.yAxisMax - this.yAxisMin) / this.yBins,
          end: this.yAxisMax,
        },
        marker: {
          color: 'rgb(41, 135, 187)',
          opacity: 0.6,
        },
      };
    },
    /**
     * Histogram描画用のlayoutを返却.
     * See:
     *   https://plotly.com/javascript/reference/layout/
     * @return {Object} -- Histogram描画用のlaoyoutオブジェクト
     */
    layout() {
      return {
        xaxis: {title: '度数', tickangle: 0},
        yaxis: {range: [this.yAxisMin, this.yAxisMax]},
        bargap: 0.15,
        height: this.chartHeight,
        margin: {l: 50, r: 30, b: 60, t: 40, pad: 10},
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
    },
  },
};
</script>
