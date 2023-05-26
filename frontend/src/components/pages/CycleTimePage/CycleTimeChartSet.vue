<!--ヒストグラムと折れ線グラフのセットのコンポーネント.-->

<template>
  <div>
    <b-row>
      <b-col md="12">
        <DataSummary :x-data="xData" :y-data="yData" />
      </b-col>
    </b-row>

    <b-row>
      <b-col md="9">
        <ChartLine
          data-testid="chart-line"
          :x-axis-min="xAxisMin"
          :x-axis-max="xAxisMax"
          :y-axis-min="yAxisMin"
          :y-axis-max="yAxisMax"
          :x-axis-title="lineChartXAxisTitle"
          :x-axis-tick-format="lineChartXAxisTickFormat"
          :y-axis-title="lineChartYAxisTitle"
          :x-data="xData"
          :y-data="yData"
          :y-axis-thresholds="yAxisThresholds"
          @update:yAxisMin="yAxisMin = $event"
          @update:yAxisMax="yAxisMax = $event"
        >
        </ChartLine>
      </b-col>
      <b-col md="3">
        <ChartHistogram
          data-testid="chart-histogram"
          :y-axis-min="yAxisMin"
          :y-axis-max="yAxisMax"
          :x-data="xData"
          :y-data="yData"
          :y-axis-thresholds="yAxisThresholds"
          @update:yAxisMin="yAxisMin = $event"
          @update:yAxisMax="yAxisMax = $event"
        >
        </ChartHistogram>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ChartLine from '@/components/common/ChartLine.vue';
import ChartHistogram from '@/components/common/ChartHistogram.vue';
import {getMinElement, getMaxElement} from '@/common/utils/array.js';

import DataSummary from '@/components/common/DataSummary.vue'; // TEST この行を追加（DataSummaryという名前で使えるようにDataSummary.vueをインポート）

export default {
  name: 'CycleTimeChartSet',
  components: {
    ChartLine,
    ChartHistogram,
    DataSummary, // この行を追加
  },
  /**
   * CycleTimeChartSet Props.
   * @typedef {Object} CycleTimeChartSet
   * @prop {Array} xData - x軸用データ
   * @prop {Array} yData - y軸用データ
   * @prop {Array} yAxisThresholds - y軸閾値の配列
   * @prop {Array} lineChartYAxisTitle - グラフチャートのy軸タイトル
   * @prop {Date} xAxisMin - x軸範囲の最小値
   * @prop {Date} xAxisMax - x軸範囲の最大値
   */
  props: {
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
      required: true,
    },
    lineChartYAxisTitle: {
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
      yAxisMin: calculateYAxisMin(this.yData, this.yAxisThresholds), // y軸描画域の最小値
      yAxisMax: calculateYAxisMax(this.yData, this.yAxisThresholds), // y軸描画域の最大値
      lineChartXAxisTitle: '時刻', // LineChartのX軸タイトル
      lineChartXAxisTickFormat: '%m/%d<BR>%H:%M:%S', // LineChartのX軸のフォーマット
    };
  },
  watch: {
    yData(newData) {
      this.yAxisMin = calculateYAxisMin(newData, this.yAxisThresholds);
      this.yAxisMax = calculateYAxisMax(newData, this.yAxisThresholds);
    },
    yAxisThresholds(newData) {
      this.yAxisMin = calculateYAxisMin(this.yData, newData);
      this.yAxisMax = calculateYAxisMax(this.yData, newData);
    },
  },
};

/**
 * y軸描画域の最小値を計算する.
 *
 * @param {Array} yData - y軸データ
 * @param {Array} yAxisThresholds - y軸閾値の配列
 * @return {Number} y軸描画域の最小値
 */
const calculateYAxisMin = (yData, yAxisThresholds) => {
  const MARGIN = 0.8; // 描画領域にマージンを作るために乗算する値.

  if (yData.length < 1) {
    return 0; // defalut value
  }
  const yMin = getMinElement(yData);

  if (yAxisThresholds.length < 1) {
    return yMin * MARGIN;
  }
  const yAxisThresholdsMin = getMinElement(yAxisThresholds);

  return Math.min(yMin, yAxisThresholdsMin) * MARGIN;
};

/**
 * y軸描画域の最大値を計算する.
 *
 * @param {Array} yData - y軸データ
 * @param {Array} yAxisThresholds - y軸閾値の配列
 * @return {Number} y軸描画域の最大値
 */
const calculateYAxisMax = (yData, yAxisThresholds) => {
  const MARGIN = 1.2; // 描画領域にマージンを作るために乗算する値.

  if (yData.length < 1) {
    return 0; // defalut value
  }
  const yMax = getMaxElement(yData);

  if (yAxisThresholds.length < 1) {
    return yMax * MARGIN;
  }
  const yAxisThresholdsMax = getMaxElement(yAxisThresholds);

  return Math.max(yMax, yAxisThresholdsMax) * MARGIN;
};
</script>
