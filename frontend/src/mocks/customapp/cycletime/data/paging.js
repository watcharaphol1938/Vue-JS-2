/**
 * ページング用のサイクルタイムのユニットテストで使用するデータ（pageTokenあり⇒次ページのデータあり）.
 */
const getCycleTimePagingTestData = {
  childEquipId: 'childEquip0',
  jobId: 'ABCD',
  pageToken: 'AA',
  cycleTime: {
    xData: [
      '2021-06-23T15:00:00.123456789Z',
      '2021-06-24T02:59:30.456001Z',
      '2021-06-24T14:59:00.789Z',
    ],
    yAxisThresholds: [0.0, 200.0],
    yData: [263.0, 320.0, 416.0],
  },
  machineTime: {
    xData: [
      '2021-06-23T15:00:00.123456789Z',
      '2021-06-24T02:59:30.456001Z',
      '2021-06-24T14:59:00.789Z',
    ],
    yAxisThresholds: [0.0, 0.6],
    yData: [0.0, 0.0, 0.0],
  },
  stopTimebyPostProcess: {
    xData: [
      '2021-06-23T15:00:00.123456789Z',
      '2021-06-24T02:59:30.456001Z',
      '2021-06-24T14:59:00.789Z',
    ],
    yAxisThresholds: [0.0, 100.0],
    yData: [285.1, 285.1, 285.1],
  },
  stopTimebyPrevProcess: {
    xData: [
      '2021-06-23T15:00:00.123456789Z',
      '2021-06-24T02:59:30.456001Z',
      '2021-06-24T14:59:00.789Z',
    ],
    yAxisThresholds: [0.0, 10.0],
    yData: [26.6, 26.6, 26.6],
  },
};

/**
 * ページング用のサイクルタイムのユニットテストで使用するデータ（pageTokenなし⇒ページングの最終データ）.
 */
const getCycleTimePagingLastTestData = {
  childEquipId: 'childEquip0',
  jobId: 'ABCD',
  pageToken: '',
  cycleTime: {
    xData: [
      '2021-06-23T15:00:01.123456789Z',
      '2021-06-24T02:59:31.456001Z',
      '2021-06-24T14:59:01.789Z',
    ],
    yAxisThresholds: [0.0, 200.0],
    yData: [263.0, 320.0, 416.0],
  },
  machineTime: {
    xData: [
      '2021-06-23T15:00:01.123456789Z',
      '2021-06-24T02:59:31.456001Z',
      '2021-06-24T14:59:01.789Z',
    ],
    yAxisThresholds: [0.0, 0.6],
    yData: [0.0, 0.0, 0.0],
  },
  stopTimebyPostProcess: {
    xData: [
      '2021-06-23T15:00:01.123456789Z',
      '2021-06-24T02:59:31.456001Z',
      '2021-06-24T14:59:01.789Z',
    ],
    yAxisThresholds: [0.0, 100.0],
    yData: [285.1, 285.1, 285.1],
  },
  stopTimebyPrevProcess: {
    xData: [
      '2021-06-23T15:00:01.123456789Z',
      '2021-06-24T02:59:31.456001Z',
      '2021-06-24T14:59:01.789Z',
    ],
    yAxisThresholds: [0.0, 10.0],
    yData: [26.6, 26.6, 26.6],
  },
};

module.exports = {
  getCycleTimePagingTestData,
  getCycleTimePagingLastTestData,
};
