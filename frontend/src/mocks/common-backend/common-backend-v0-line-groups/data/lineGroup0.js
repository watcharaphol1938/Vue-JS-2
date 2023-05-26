/**
 * GET /common-backend/api/v1/line-groups/0/lines 用のデフォルトデータ.
 * ・正常なライン情報のデータ.
 */
const getLineGroup0DefaultData = {
  id: '0',
  lines: [
    {
      lineId: 'LNRA__1695',
      lineName: '14INVフィン成形機1号',
      downtimeThreshold: 0,
      dispOrder: 1,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      lineId: 'LNASXX9875',
      lineName: '14INVコア組立3号機',
      downtimeThreshold: 0,
      dispOrder: 2,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      lineId: 'LNIN000600',
      lineName: '14INV仕上げ3号機',
      downtimeThreshold: 0,
      dispOrder: 3,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      lineId: 'LNAS__9386',
      lineName: '14INVコア組立2号機',
      downtimeThreshold: 0,
      dispOrder: 4,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      lineId: 'LNRAXX1778',
      lineName: '14INVフィン成形機2号',
      downtimeThreshold: 0,
      dispOrder: 5,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      lineId: 'LNZE__0682',
      lineName: '14INV仕上げ2号機',
      downtimeThreshold: 0,
      dispOrder: 6,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
  ],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines 用のユニットテストで使用するデータ.
 * ・正常なライン情報のデータ.
 */
const getLineGroup0TestData = {
  id: '0',
  lines: [
    {
      lineId: 'lineId0',
      lineName: 'line0',
      downtimeThreshold: 0,
      dispOrder: 1,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      lineId: 'lineId1',
      lineName: 'line1',
      downtimeThreshold: 0,
      dispOrder: 2,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
  ],
};

module.exports = {
  getLineGroup0DefaultData,
  getLineGroup0TestData,
};
