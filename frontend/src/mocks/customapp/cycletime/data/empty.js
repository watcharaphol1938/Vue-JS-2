/**
 * x軸、y軸、y軸閾値がそれぞれ空配列のサイクルタイムのユニットテストで使用するデータ.
 */
const getCycleTimeEmptyTestData = {
  childEquipId: 'childEquip1',
  jobId: 'ABCD',
  pageToken: '',
  cycleTime: {xData: [], yAxisThresholds: [], yData: []},
  machineTime: {xData: [], yAxisThresholds: [], yData: []},
  stopTimebyPostProcess: {xData: [], yAxisThresholds: [], yData: []},
  stopTimebyPrevProcess: {xData: [], yAxisThresholds: [], yData: []},
};

module.exports = {
  getCycleTimeEmptyTestData,
};
