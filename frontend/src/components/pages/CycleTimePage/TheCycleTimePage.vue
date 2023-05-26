<!--ページ全体を構成するコンポーネント.
  内部で以下のコンポーネントを使用している.
    - DatetimeRangePicker
    - SelectorChildEquipment
    - CycleTimeViewer
-->

<template>
  <b-container fluid>
    <b-card border-variant="dark" class="p-2 mt-1" no-body>
      <b-row class="mb-0 mb-md-1">
        <b-col cols="12" xl="5">
          <h4>{{ title }}</h4>
        </b-col>
        <b-col cols="12" lg="11" xl="6" order-lg="1" order-xl="1">
          <DatetimeRangePicker
            :datetime-from="eventTimeFrom"
            :datetime-to="eventTimeTo"
            data-testid="datetime-range-picker"
            @update:datetimeFrom="eventTimeFrom = $event"
            @update:datetimeTo="eventTimeTo = $event"
          ></DatetimeRangePicker>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="11">
          <SelectorChildEquipment
            data-testid="selector-child-equipment"
            @update:childEquipmentId="childEquipmentId = $event"
          >
          </SelectorChildEquipment>
        </b-col>
        <b-col cols="6" lg="1" offset="3" offset-lg="0">
          <b-form-row class="pl-1 pr-1">
            <b-button
              block
              variant="primary"
              size="sm"
              style="min-width: 50px"
              :disabled="!isParamInput || isLoading"
              data-testid="search-button"
              @click="handleClick"
            >
              <span v-if="!isLoading" data-testid="search-button-text"
                >検索</span
              >
              <b-spinner
                v-if="isLoading"
                data-testid="spinner"
                small
              ></b-spinner>
            </b-button>
          </b-form-row>
        </b-col>
      </b-row>
    </b-card>
    <!-- NOTE: レコード多数時の挙動確認用フォーム部品

    <div>
      <p>現在のレコード数: {{ numRecords }}</p>
      <label
        >レコード上限:
        <input v-model="limit" />
      </label>
    </div>
    <div>
      <button @click="addData">データ追加</button>
      <span
        >既存レコードに乱数を乗算したものを追加.レコード数は上限まで倍々で増加する</span
      >
    </div>
    -->
    
    <div v-if="showViewer" data-testid="viewer">
      <CycleTimeViewer
        class="card p-2 m-0"
        :dataset="dataset"
        :x-axis-min="xAxisMin"
        :x-axis-max="xAxisMax"
      >
      </CycleTimeViewer>

      <CycleTimeViewer
        class="card p-2 m-0"
        initial-data-type="machineTime"
        :dataset="dataset"
        :x-axis-min="xAxisMin"
        :x-axis-max="xAxisMax"
      >
      </CycleTimeViewer>
    </div>
  </b-container>
</template>

<script>
import DatetimeRangePicker from '@/components/common/DatetimeRangePicker.vue';
import SelectorChildEquipment from '@/components/common/SelectorChildEquipment.vue';
import CycleTimeViewer from '@/components/pages/CycleTimePage/CycleTimeViewer.vue';

import axios from 'axios';
import {notifyApiErrorMessage} from '@/common/utils/error.js';

const DURATION_URL = '/asia-oee/api/durations';

export default {
  name: 'TheCycleTimePage',
  components: {
    DatetimeRangePicker,
    SelectorChildEquipment,
    CycleTimeViewer,
  },
  data() {
    return {
      title: '設備計測時間（サイクルタイム）時系列プロット', // ページタイトル
      eventTimeFrom: _getDatetimeFromDefault(), // 日時From
      eventTimeTo: _getDatetimeToDefault(), // 日時To
      /**
       * 「xAxisMin, xAxisMax」を「eventTimeFrom, eventTimeTo」と別に管理している理由.
       * 直接「eventTimeFrom, eventTimeTo」を渡してしまうと、
       * 時刻を変更するたびにグラフの最小値・最大値が変わるため
       * 検索ボタンクリック時のみ「xAxisMin, xAxisMax」が変わるようにしている.
       */
      xAxisMin: _getDatetimeFromDefault(), // ChartLineのx軸最小値
      xAxisMax: _getDatetimeToDefault(), // ChartLineのx軸最大値
      childEquipmentId: '', // 子設備ID
      dataset: {}, // サイクルタイムデータ
      isLoading: false, // グラフ読み込みフラグ
      // NOTE: レコード多数時の挙動確認用フォーム部品
      // count: 0,
      // limit: 100000,
    };
  },
  computed: {
    numRecords() {
      if (this.dataset.cycleTime) {
        return this.dataset.cycleTime.xData.length;
      }
      return 0;
    },
    /**
     * Parameterが入力済みか判定するための真偽値
     * 検索ボタンのdisabled属性の値を切り替え用.
     * @return {Boolean} - 未入力: true / 入力済み: false
     */
    isParamInput() {
      return (
        this.eventTimeFrom !== '' &&
        this.eventTimeTo !== '' &&
        this.childEquipmentId !== ''
      );
    },
    /**
     * グラフデータの有無を判定し,
     * CycleTiemViewerの表示・非表示を切り替える真偽値
     * @return {Boolean} -- 表示する: データあり(true) / 表示しない: データなし(false)
     */
    showViewer() {
      return this.dataset.childEquipId ? true : false;
    },
  },
  methods: {
    /**
     * clickイベントのハンドラ.
     *   - グラフ読み込みフラグを設定する
     *   - ChartLineグラフのX軸の最小値と最大値を設定する.
     *   - グラフ描画用のデータを設定する
     */
    async handleClick() {
      this.isLoading = true;
      this.xAxisMin = this.eventTimeFrom;
      this.xAxisMax = this.eventTimeTo;
      this.fetchData();
    },
    /**
     * グラフ描画用のデータを設定する.
     *   - datasetの値を取得し, 設定する.
     */
    async fetchData() {
      // 既存のデータは初期化
      this.dataset = {
        childEquipId: '',
        cycleTime: {xData: [], yData: [], yAxisThresholds: []},
        machineTime: {xData: [], yData: [], yAxisThresholds: []},
        stopTimebyPostProcess: {xData: [], yData: [], yAxisThresholds: []},
        stopTimebyPrevProcess: {xData: [], yData: [], yAxisThresholds: []},
      };
      await this.fetchDataset(
        this.childEquipmentId,
        this.eventTimeFrom.toISOString(),
        this.eventTimeTo.toISOString()
      );
    },
    /**
     * datasetをAPIアクセスにより取得.
     * @param {String} childEquipId - 子設備ID
     * @param {String} eventTimeFromISOString - イベント発生日(始点)
     * @param {String} eventTimeToISOString - イベント発生日(終点)
     * @param {String} jobId - F-IoT APIのリクエストのpagination用Job ID
     * @param {String} pageToken - F-IoT APIのリクエストpagination用トークン
     */
    async fetchDataset(
      childEquipId,
      eventTimeFromISOString,
      eventTimeToISOString,
      jobId = '',
      pageToken = ''
    ) {
      try {
        const res = await axios.get(DURATION_URL, {
          params: new URLSearchParams({
            child_equip_id: childEquipId,
            event_time_from: eventTimeFromISOString,
            event_time_to: eventTimeToISOString,
            job_id: jobId,
            page_token: pageToken,
          }),
        });
        this.dataset.childEquipId = res.data.childEquipId;
        this.dataset.cycleTime = _concatInnerList(
          this.dataset.cycleTime,
          res.data.cycleTime
        );
        this.dataset.machineTime = _concatInnerList(
          this.dataset.machineTime,
          res.data.machineTime
        );
        this.dataset.stopTimebyPostProcess = _concatInnerList(
          this.dataset.stopTimebyPostProcess,
          res.data.stopTimebyPostProcess
        );
        this.dataset.stopTimebyPrevProcess = _concatInnerList(
          this.dataset.stopTimebyPrevProcess,
          res.data.stopTimebyPrevProcess
        );

        // resのpage_tokenを判定（空文字なのかどうか）し、fetchDataset()を再帰的に呼び出す
        if (res.data.jobId && res.data.pageToken) {
          this.fetchDataset(
            childEquipId,
            eventTimeFromISOString,
            eventTimeToISOString,
            res.data.jobId,
            res.data.pageToken
          );
        } else {
          // page_tokenが空文字であれば、ロード中フラグをfalseにする
          this.isLoading = false;
        }
      } catch (error) {
        this.isLoading = false;
        notifyApiErrorMessage(error);
        return;
      }
    },
    // NOTE: レコード多数時の挙動確認用フォーム部品
    // addData() {
    //   let tmp = [];
    //   tmp = tmp.concat(this.dataset.cycleTime.xData);

    //   this.dataset.cycleTime.xData = this.dataset.cycleTime.xData.concat(tmp);

    //   tmp = [];
    //   const rand = Math.random() * 10;
    //   console.log(`random: ${rand}`);
    //   tmp = this.dataset.cycleTime.yData.map((x) => x + 300 * rand);

    //   this.dataset.cycleTime.yData = this.dataset.cycleTime.yData.concat(tmp);

    //   if (this.dataset.cycleTime.xData.length > this.limit) {
    //     this.dataset.cycleTime.xData = this.dataset.cycleTime.xData.slice(
    //       0,
    //       this.limit
    //     );
    //     this.dataset.cycleTime.yData = this.dataset.cycleTime.yData.slice(
    //       0,
    //       this.limit
    //     );
    //   }
    // },
  },
};

const _now = new Date();

/**
 * 日時Fromのデフォルト値を取得する．
 *  現在日の"00:00.00.000"をデフォルト値とする.
 *
 * @return {Date} datetimeFromDefault
 */
const _getDatetimeFromDefault = () => {
  return new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), 0, 0);
};

/**
 * 日時Toのデフォルト値を取得する．
 *  現在日の"23:59.00.000"をデフォルト値とする.
 *
 * @return {Date} datetimeToDefault
 */
const _getDatetimeToDefault = () => {
  return new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), 23, 59);
};

/**
 * datasetの各Objectの内部配列を既存のデータと結合して返す.
 *
 * @param {Object} origin - 既存のデータ
 * @param {Object} target - 結合するデータ
 * @return {Object} 結合したデータ
 */
const _concatInnerList = (origin, target) => {
  return {
    xData: origin.xData.concat(target.xData),
    yData: origin.yData.concat(target.yData),
    yAxisThresholds: target.yAxisThresholds,
  };
};
</script>
