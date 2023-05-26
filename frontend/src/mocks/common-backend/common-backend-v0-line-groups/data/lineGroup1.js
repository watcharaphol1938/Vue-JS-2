/**
 * GET /common-backend/api/v1/line-groups/1/lines 用のデフォルトデータ.
 * ・正常なライン情報のデータ
 */
const getLineGroup1DefaultData = {
  id: '1',
  lines: [
    {
      lineId: 'LNZE__0682',
      lineName: '14INV仕上げ2号機',
      downtimeThreshold: 0,
      dispOrder: 1,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
  ],
};

/**
 * GET /common-backend/api/v1/line-groups/1/lines 用のユニットテストで使用するデータ.
 * ・正常なライン情報のデータ
 * ・ライン群変更テストで使用
 */
const getLineGroup1TestData = {
  id: '1',
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
  getLineGroup1DefaultData,
  getLineGroup1TestData,
};
