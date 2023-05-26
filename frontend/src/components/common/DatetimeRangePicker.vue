<!--日時範囲指定のコンポーネント.-->

<template>
  <!--
      see https://bootstrap-vue.org/docs/components/form-input#native-and-custom-events
    -->
  <b-row>
    <b-col cols="12" sm="12" md="6" class="mb-1">
      <b-input-group prepend="From" size="sm">
        <b-form-input
          v-model="innerFrom"
          size="sm"
          type="datetime-local"
          :min="datetimeRangeMin"
          :max="datetimeRangeMax"
          data-testid="datetime-from"
          @blur="handleBlur"
        />
      </b-input-group>
    </b-col>
    <b-col cols="12" sm="12" md="6" class="mb-1">
      <b-input-group prepend="To" size="sm">
        <b-form-input
          v-model="innerTo"
          size="sm"
          type="datetime-local"
          :min="innerFrom"
          :max="datetimeRangeMax"
          data-testid="datetime-to"
          @blur="handleBlur"
        />
      </b-input-group>
    </b-col>
  </b-row>
</template>

<script>
const DATETIME_RANGE_MIN = '2000-01-01T00:00';
const DATETIME_RANGE_MAX = '2100-12-31T23:59';

export default {
  name: 'DatetimeRangePicker',
  /**
   * 日時範囲指定ピッカー Props.
   * @typedef {Object} DatetimeRangePicker
   * @prop {String} datetimeFrom - 日時From
   * @prop {String} datetimeTo - 日時To
   */
  props: {
    datetimeFrom: {
      type: Date,
      required: true,
    },
    datetimeTo: {
      type: Date,
      required: true,
    },
  },
  emits: ['update:datetimeFrom', 'update:datetimeTo'],
  data() {
    return {
      innerFrom: '',
      innerTo: '',
      preInnerFrom: '',
      preInnerTo: '',
      datetimeRangeMin: DATETIME_RANGE_MIN,
      datetimeRangeMax: DATETIME_RANGE_MAX,
    };
  },
  mounted() {
    this.innerFrom = toInnerDatetime(this.datetimeFrom);
    this.innerTo = toInnerDatetime(this.datetimeTo);
    if (!validateDatetimeRange(this.innerFrom, this.innerTo)) {
      throw new Error('datetimeTo must be later than datetimeTo');
    }
    this.emitUpdate();
    this.updatePreInnerDatetime();
  },
  methods: {
    handleBlur() {
      if (!validateDatetimeFormat(this.innerFrom)) {
        this.innerFrom = this.preInnerFrom;
      }

      if (!validateDatetimeFormat(this.innerTo)) {
        this.innerTo = this.preInnerTo;
      }

      if (!validateLaterThanRangeMin(this.innerFrom)) {
        this.innerFrom = this.datetimeRangeMin;
      }
      if (!validateLaterThanRangeMin(this.innerTo)) {
        this.innerTo = this.datetimeRangeMin;
      }

      if (!validateFormerThanRangeMax(this.innerFrom)) {
        this.innerFrom = this.datetimeRangeMax;
      }
      if (!validateFormerThanRangeMax(this.innerTo)) {
        this.innerTo = this.datetimeRangeMax;
      }

      if (!validateDatetimeRange(this.innerFrom, this.innerTo)) {
        this.innerTo = this.innerFrom;
      }
      this.emitUpdate();
      this.updatePreInnerDatetime();
    },
    emitUpdate() {
      this.$emit('update:datetimeFrom', new Date(this.innerFrom));
      this.$emit('update:datetimeTo', new Date(this.innerTo));
    },
    updatePreInnerDatetime() {
      this.preInnerFrom = this.innerFrom;
      this.preInnerTo = this.innerTo;
    },
  },
};

/**
 * innerDatetimeのフォーマットをバリデーションする.
 * @param {String} innerDatetime
 * @return {Bool}
 */
const validateDatetimeFormat = (innerDatetime) => {
  try {
    new Date(innerDatetime).toISOString();
  } catch (error) {
    return false;
  }
  return true;
};

/**
 * DATETIME_RANGE_MINより後であることを検証する.
 * @param {String} innerDatetime
 * @return {Bool}
 */
const validateLaterThanRangeMin = (innerDatetime) => {
  return new Date(innerDatetime) > new Date(DATETIME_RANGE_MIN);
};

/**
 * DATETIME_RANGE_MAXより前であることを検証する.
 * @param {String} innerDatetime
 * @return {Bool}
 */
const validateFormerThanRangeMax = (innerDatetime) => {
  return new Date(innerDatetime) < new Date(DATETIME_RANGE_MAX);
};

/**
 * DatetimeRangeをバリデーションする.
 * @param {String} innerFrom
 * @param {String} innerTo
 * @return {Bool}
 */
const validateDatetimeRange = (innerFrom, innerTo) => {
  return new Date(innerFrom) <= new Date(innerTo);
};

/**
 * Date型からString(YYYY-MM-ddTHH:mm)に変換する.
 * @param {Date} datetime
 * @return {String} datetimelocal - datetime-local format(YYYY-MM-ddTHH:mm)
 */
const toInnerDatetime = (datetime) => {
  const year = datetime.getFullYear().toString();
  const month = padZero(datetime.getMonth() + 1, 2);
  const date = padZero(datetime.getDate(), 2);
  const hours = padZero(datetime.getHours(), 2);
  const minutes = padZero(datetime.getMinutes(), 2);

  return `${year}-${month}-${date}T${hours}:${minutes}`;
};

/**
 * 数値をゼロパディングした文字列を返却する．
 * @param {Number} num - target number.
 * @param {Number} length - length of the resulting string.
 * @return {String} '0' padding sring.
 */
const padZero = (num, length) => {
  return num.toString().padStart(length, '0');
};
</script>

<style scoped>
.label {
  display: block;
}
</style>
