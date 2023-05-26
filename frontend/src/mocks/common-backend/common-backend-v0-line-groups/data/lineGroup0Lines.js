/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNRA__1695/equips/-/child-equips 用のデフォルトデータ.
 * ・正常な子設備情報のデータ
 */
const getLineGroup0ToChildEquips0DefaultData = {
  id: '0',
  lineId: 'LNRA__1695',
  equipId: null,
  childEquips: [
    {
      childEquipId: 'RA__1695_1',
      childEquipName: '14INVフィン成形機1号-1',
      dummyFlag: true,
      processId: 'PROCESS_1695_1',
      dispOrder: 1,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      childEquipId: 'RA__1695_2',
      childEquipName: '14INVフィン成形機1号-2',
      dummyFlag: true,
      processId: 'PROCESS_1695_2',
      dispOrder: 2,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
  ],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNASXX9875/equips/-/child-equips 用のデフォルトデータ.
 * ・子設備情報が空配列のデータ
 */
const getLineGroup0ToChildEquips1DefaultData = {
  id: '0',
  lineId: 'LNASXX9875',
  equipId: null,
  childEquips: [],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNIN000600/equips/-/child-equips 用のデフォルトデータ.
 * ・子設備情報が空配列のデータ
 */
const getLineGroup0ToChildEquips2DefaultData = {
  id: '0',
  lineId: 'LNIN000600',
  equipId: null,
  childEquips: [],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNAS__9386/equips/-/child-equips 用のデフォルトデータ.
 * ・子設備情報が空配列のデータ
 */
const getLineGroup0ToChildEquips3DefaultData = {
  id: '0',
  lineId: 'LNAS__9386',
  equipId: null,
  childEquips: [],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNRAXX1778/equips/-/child-equips 用のデフォルトデータ.
 * ・正常な子設備情報のデータ
 */
const getLineGroup0ToChildEquips4DefaultData = {
  id: '0',
  lineId: 'LNRAXX1778',
  equipId: null,
  childEquips: [
    {
      childEquipId: 'RA__1778_1',
      childEquipName: '14INVフィン成形機2号-1',
      dummyFlag: true,
      processId: 'PROCESS_1778_1',
      dispOrder: 1,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      childEquipId: 'RA__1778_2',
      childEquipName: '14INVフィン成形機2号-2',
      dummyFlag: true,
      processId: 'PROCESS_1778_2',
      dispOrder: 2,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
  ],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNZE__0682/equips/-/child-equips 用のデフォルトデータ.
 * ・子設備情報が空配列のデータ
 */
const getLineGroup0ToChildEquips5DefaultData = {
  id: '0',
  lineId: 'LNZE__0682',
  equipId: null,
  childEquips: [],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines/lineId0/equips/-/child-equips 用のユニットテストで使用するデータ.
 * ・正常な子設備情報のデータ
 */
const getLineGroup0ToChildEquips0TestData = {
  id: '0',
  lineId: 'lineId0',
  equipId: null,
  childEquips: [
    {
      childEquipId: 'LineGroup0ToChildEquipsId0',
      childEquipName: 'LineGroup0ToChildEquipsName0',
      dummyFlag: true,
      processId: 'LineGroup0ToChildEquipsProcessId0',
      dispOrder: 1,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
    {
      childEquipId: 'LineGroup0ToChildEquipsId1',
      childEquipName: 'LineGroup0ToChildEquipsName1',
      dummyFlag: true,
      processId: 'LineGroup0ToChildEquipsProcessId1',
      dispOrder: 2,
      validStart: '2022-02-09T12:00:00.000Z',
      validEnd: '2022-02-09T13:00:00.000Z',
    },
  ],
};

/**
 * GET /common-backend/api/v1/line-groups/0/lines/lineId1/equips/-/child-equips 用のユニットテストで使用するデータ.
 * ・正常な子設備情報のデータ
 */
const getLineGroup0ToChildEquips1TestData = {
  id: '0',
  lineId: 'lineId1',
  equipId: null,
  childEquips: [
    {
      childEquipId: 'LineGroup1ToChildEquipsId0',
      childEquipName: 'LineGroup1ToChildEquipsName0',
      dummyFlag: true,
      processId: 'LineGroup1ToChildEquipsProcessId0',
      dispOrder: 1,
      validStart: '2022-02-10T12:00:00.000Z',
      validEnd: '2022-02-10T13:00:00.000Z',
    },
    {
      childEquipId: 'LineGroup1ToChildEquipsId1',
      childEquipName: 'LineGroup1ToChildEquipsName1',
      dummyFlag: true,
      processId: 'LineGroup1ToChildEquipsProcessId1',
      dispOrder: 2,
      validStart: '2022-02-10T12:00:00.000Z',
      validEnd: '2022-02-10T13:00:00.000Z',
    },
  ],
};

module.exports = {
  getLineGroup0ToChildEquips0DefaultData,
  getLineGroup0ToChildEquips1DefaultData,
  getLineGroup0ToChildEquips2DefaultData,
  getLineGroup0ToChildEquips3DefaultData,
  getLineGroup0ToChildEquips4DefaultData,
  getLineGroup0ToChildEquips5DefaultData,
  getLineGroup0ToChildEquips0TestData,
  getLineGroup0ToChildEquips1TestData,
};
