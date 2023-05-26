<template>
  <h3>
    <b-badge class="summary" variant="primary">
      合計: {{ ySum }}
    </b-badge>
    <b-badge class="summary" variant="warning">
      平均: {{ yAverage }}
    </b-badge>
     <h4> PIK </h4>
  </h3>
</template>
<script>
export default {
  name: 'DataSummary',
  props: {
    xData: {
      type: Array,  // 配列型に限定
      required: true,  // 必須項目
    },
    yData: {
      type: Array,  // 配列型に限定
      required: true,  // 必須項目
    },
  },
  computed: {
    ySum() {
      return this.yData.reduce((total, data) => total + parseFloat(data), 0);
    },
    yAverage() {
      return this.ySum / this.yData.length;
    }
  },
}
</script>

<style scoped>
.summary {
  margin-right: 10px;
}
h4{
  color:blueviolet
}
</style>
