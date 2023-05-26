<!--子設備選択フォームのコンポーネント.-->

<template>
  <b-row>
    <b-col cols="12" md="4" class="mb-1">
      <SelectorSearchable
        v-model="selectedLineGroupId"
        label="ライン群"
        :options="lineGroupOptions"
      ></SelectorSearchable>
    </b-col>
    <b-col cols="12" md="4" class="mb-1">
      <SelectorSearchable
        v-model="selectedLineId"
        label="ライン"
        :options="lineOptions"
      ></SelectorSearchable>
    </b-col>
    <b-col cols="12" md="4" class="mb-1">
      <SelectorSearchable
        v-model="selectedChildEquipId"
        label="子設備"
        :options="childEquipOptions"
      ></SelectorSearchable>
    </b-col>
  </b-row>
</template>

<script>
import SelectorSearchable from '@/components/common/SelectorSearchable.vue';

import axios from 'axios';
import {notifyApiErrorMessage} from '@/common/utils/error.js';

const LINE_GROUPS_V0_URL = '/common-backend/api/v0/line-groups';
const LINE_GROUPS_V1_URL = '/common-backend/api/v1/line-groups';

export default {
  name: 'SelectorChildEquipment',
  components: {
    SelectorSearchable,
  },
  emits: ['update:childEquipmentId'],
  data() {
    return {
      lineGroupOptions: [], // lineGroupのOption.
      lineOptionsObj: {}, // lineOptionsの値をidをキーにして保持するObject.
      childEquipOptionsObj: {}, // childEquipOptionsの値をlineGroupIdとlineIdをキーにして保持するObject.
      selectedLineGroupId: '', // 選択中のlineGroupId.
      selectedLineId: '', // 選択中のlineId.
      selectedChildEquipId: '', // 選択中のChildEquipId.
    };
  },
  computed: {
    lineOptions() {
      if (this.hasLineOptions) {
        return this.lineOptionsObj[this.selectedLineGroupId];
      }
      return [];
    },
    childEquipOptions() {
      if (this.hasChildEquipOptions) {
        return this.childEquipOptionsObj[this.selectedLineGroupId][
          this.selectedLineId
        ];
      }
      return [];
    },
    hasLineOptions() {
      return (
        typeof this.lineOptionsObj[this.selectedLineGroupId] !== 'undefined'
      );
    },
    hasChildEquipOptions() {
      if (this.childEquipOptionsObj[this.selectedLineGroupId]) {
        return (
          typeof this.childEquipOptionsObj[this.selectedLineGroupId][
            this.selectedLineId
          ] !== 'undefined'
        );
      }
      return false;
    },
  },
  watch: {
    /**
     * selectedLineGroupIdが更新された時の処理.
     *   そのIDのlineGroupのデータが未取得なら取得し記録する.
     * @param {String} newId - 新たに選択されたlineGroupId
     */
    async selectedLineGroupId(newId) {
      if (!this.lineOptionsObj[newId]) {
        const lineGroup = await fetchLineGroup(newId);
        // https://jp.vuejs.org/v2/guide/reactivity.html#%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AB%E9%96%A2%E3%81%97%E3%81%A6
        this.$set(
          this.lineOptionsObj,
          lineGroup.id,
          lineGroupToLineOptions(lineGroup)
        );
      }
    },
    /**
     * selectedLineIdが更新された時の処理.
     *   selectedLineGroupIdとselectedLineIdの組み合わせに対するChildEquipのデータが未取得なら取得し記録する.
     * @param {String} newId - 新たに選択されたlineId
     */
    async selectedLineId(newId) {
      if (newId && !this.childEquipOptionsObj[newId]) {
        const lineGroup = await fetchLine(this.selectedLineGroupId, newId);
        this.$set(
          this.childEquipOptionsObj,
          this.selectedLineGroupId,
          lineToChildEquipOptionsObjItem(lineGroup)
        );
      }
    },
    /**
     * 選択された子設備に更新された時, 親コンポネントにイベントをemit.
     * @param {String} newChildEquipId - 新らたに選択された子設備
     */
    selectedChildEquipId(newChildEquipId) {
      this.$emit('update:childEquipmentId', newChildEquipId);
    },
  },
  async mounted() {
    const lineGroups = await fetchLineGroups();
    this.lineGroupOptions = lineGroupsToLineGroupOptions(lineGroups);
  },
};

/**
 * lineGroupsからlineGroupOptionsを作成.
 * @param {Array} lineGroups - fetchLineGroups()で取得したlineGroups
 * @return {Object} lineGroupsOptions
 */
const lineGroupsToLineGroupOptions = (lineGroups) => {
  return lineGroups.map((lineGroup) => {
    return {value: lineGroup.id, text: lineGroup.name};
  });
};

/**
 * lineGroupからlineOptionsを作成.
 * @param {Object} lineGroup - fetchLineGroup()で取得したlineGroup
 * @return {Object} lineOptions
 */
const lineGroupToLineOptions = (lineGroup) => {
  return lineGroup.lines.map((line) => {
    return {value: line.lineId, text: line.lineName};
  });
};

/**
 * childEquipsを持つlineGroupからchildEquipOptionsObjにセットするItemを作成.
 *   この関数で生成したItemは, childEquipOptionsObjにlineGroup.idをキーにしてセットする.
 *
 * @param {Object} lineGroup - fetchLine()で取得したline
 * @return {Object} childEquipOptions
 */
const lineToChildEquipOptionsObjItem = (lineGroup) => {
  const item = {};
  const childEquipOptions = [];
  for (const childEquip of lineGroup.childEquips) {
    childEquipOptions.push({
      value: childEquip.childEquipId,
      text: childEquip.childEquipName,
    });
  }
  item[lineGroup.lineId] = childEquipOptions;
  return item;
};

/**
 * lineGroupのリストをAPIアクセスにより取得.
 * @return {Array} lineGroups
 */
const fetchLineGroups = async () => {
  try {
    const res = await axios.get(LINE_GROUPS_V0_URL);
    return res.data.lineGroups;
  } catch (error) {
    notifyApiErrorMessage(error);
    return [];
  }
};

/**
 * ライン情報をAPIアクセスにより取得.
 * @param {String} id - ライン群ID
 * @return {Object} lines - ライン情報
 */
const fetchLineGroup = async (id) => {
  try {
    const res = await axios.get(`${LINE_GROUPS_V1_URL}/${id}/lines`);
    return res.data;
  } catch (error) {
    notifyApiErrorMessage(error);
    return {lines: []};
  }
};
/**
 * 子設備情報をAPIアクセスにより取得.
 * @param {String} lineGroupId - ライン群ID
 * @param {String} lineId - ラインID
 * @return {Object} childEquips - 子設備情報
 */
const fetchLine = async (lineGroupId, lineId) => {
  try {
    const res = await axios.get(
      `${LINE_GROUPS_V1_URL}/${lineGroupId}/lines/${lineId}/equips/-/child-equips`
    );
    return res.data;
  } catch (error) {
    notifyApiErrorMessage(error);
    return {childEquips: []};
  }
};
</script>
