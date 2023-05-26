<!--グラフセット+選択フォームのコンポーネント.-->

<template>
  <b-card border-variant="dark" class="mt-1" no-body>
    <b-row>
      <b-col cols="12" md="4">
        <Selector
          v-model="selectedDataType"
          label="表示データ"
          :options="dataTypeOptions"
          select-first-option
          test-id="data-type"
        >
        </Selector>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="mt-1">
          <CycleTimeChartSet
            v-if="selectedDataType === 'cycleTime'"
            key="cycleTime"
            line-chart-y-axis-title="サイクルタイム[秒]"
            data-testid="chart-set-cycle-time"
            :x-data="localXData(dataset.cycleTime.xData)"
            :y-data="dataset.cycleTime.yData"
            :y-axis-thresholds="dataset.cycleTime.yAxisThresholds"
            :x-axis-min="xAxisMin"
            :x-axis-max="xAxisMax"
          >
          </CycleTimeChartSet>
          <CycleTimeChartSet
            v-else-if="selectedDataType === 'machineTime'"
            key="machineTime"
            line-chart-y-axis-title="マシンタイム[秒]"
            data-testid="chart-set-machine-time"
            :x-data="localXData(dataset.machineTime.xData)"
            :y-data="dataset.machineTime.yData"
            :y-axis-thresholds="dataset.machineTime.yAxisThresholds"
            :x-axis-min="xAxisMin"
            :x-axis-max="xAxisMax"
          >
          </CycleTimeChartSet>
          <CycleTimeChartSet
            v-else-if="selectedDataType === 'stopTimebyPrevProcess'"
            key="stopTimebyPrevProcess"
            line-chart-y-axis-title="前干渉停止[秒]"
            data-testid="chart-set-stop-timeby-prev-process"
            :x-data="localXData(dataset.stopTimebyPrevProcess.xData)"
            :y-data="dataset.stopTimebyPrevProcess.yData"
            :y-axis-thresholds="dataset.stopTimebyPrevProcess.yAxisThresholds"
            :x-axis-min="xAxisMin"
            :x-axis-max="xAxisMax"
          >
          </CycleTimeChartSet>
          <CycleTimeChartSet
            v-else-if="selectedDataType === 'stopTimebyPostProcess'"
            key="stopTimebyPostProcess"
            line-chart-y-axis-title="後干渉停止[秒]"
            data-testid="chart-set-stop-timeby-post-process"
            :x-data="localXData(dataset.stopTimebyPostProcess.xData)"
            :y-data="dataset.stopTimebyPostProcess.yData"
            :y-axis-thresholds="dataset.stopTimebyPostProcess.yAxisThresholds"
            :x-axis-min="xAxisMin"
            :x-axis-max="xAxisMax"
          >
          </CycleTimeChartSet>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import Selector from '@/components/common/Selector.vue';
import CycleTimeChartSet from '@/components/pages/CycleTimePage/CycleTimeChartSet.vue';
import {getMinElement, getMaxElement} from '@/common/utils/array.js';

const dataTypeOptions = [
  {value: 'cycleTime', text: 'サイクルタイム'},
  {value: 'machineTime', text: 'マシンタイム'},
  {value: 'stopTimebyPrevProcess', text: '前干渉停止'},
  {value: 'stopTimebyPostProcess', text: '後干渉停止'},
]; // データ種選択用オプション

export default {
  name: 'CycleTimeViewer',
  components: {
    Selector,
    CycleTimeChartSet,
  },
  /**
   * CycleTimeViewer Props.
   * @typedef {Object} CycleTimeViewer
   * @prop {Object} dataset - データ
   * @prop {String} initialDataType - 最初に選択しているデータタイプ
   * @prop {Date} xAxisMin - x軸範囲の最小値
   * @prop {Date} xAxisMax - x軸範囲の最大値
   */
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    initialDataType: {
      type: String,
      default: 'cycleTime',
      /**
       * dataTypeOptionsに含まれる値のみ許可する.
       * @param {String} value - 入力値
       * @return {Boolean}
       */
      validator(value) {
        for (const option of dataTypeOptions) {
          if (option.value === value) {
            return true;
          }
        }
        return false;
      },
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
      dataTypeOptions, // データ種選択用オプション
      selectedDataType: this.initialDataType, // 選択中のデータ種
    };
  },
  computed: {
    /**
     * グラフデータのX軸（時刻）をISO8601形式文字列のArrayからDate型のArrayに変換する.
     * @param {Array}  xData - ISO8601形式文字列のArray
     * @return {Array} Date型のArray
     */
    localXData() {
      return (xData) => {
        return xData.map((isoString) => {
          return new Date(isoString);
        });
      };
    },
  },
};
</script>
