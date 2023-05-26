const {rest} = require('msw');
const {errorDefaultData} = require('../data/error.js');
const {getLineGroupsTestData} = require('../data/lineGroups.js');
const {getLineGroup0TestData} = require('../data/lineGroup0.js');
const {getLineGroup1TestData} = require('../data/lineGroup1.js');
const {
  getEmptyChildEquipsTestData,
  getEmptyLineGroupsTestData,
  getEmptyLinesTestData,
} = require('../data/empty.js');
const {
  getLineGroup0ToChildEquips0TestData,
  getLineGroup0ToChildEquips1TestData,
} = require('../data/lineGroup0Lines.js');

/**
 * GET /common-backend/api/v0/line-groups のアクセスで
 * 正常なライン群情報を返却するユニットテスト用ハンドラ.
 */
const getLineGroupsTestHandler = rest.get(
  '/common-backend/api/v0/line-groups',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroupsTestData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines のアクセスで
 * 正常なライン情報のデータを返却するユニットテスト用ハンドラ.
 */
const getLineGroup0TestHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0TestData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/1/lines のアクセスで
 * 正常なライン群情報を返却するユニットテスト用ハンドラ.
 *  - ライン群変更テストで使用
 */
const getLineGroup1TestHandler = rest.get(
  '/common-backend/api/v1/line-groups/1/lines',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup1TestData));
  }
);

/**
 * GET /common-backend/api/v0/line-groups のアクセスで
 * 404 Not Foundを返却するユニットテスト用ハンドラ.
 */
const getLineGroupsErrorNotFoundTestHandler = rest.get(
  '/common-backend/api/v0/line-groups',
  (req, res, ctx) => {
    return res(ctx.status(404), ctx.json(errorDefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines のアクセスで
 * 404 Not Foundを返却するユニットテスト用ハンドラ.
 */
const getLineGroup0ErrorNotFoundTestHandler = [
  getLineGroupsTestHandler,
  rest.get('/common-backend/api/v1/line-groups/0/lines', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json(errorDefaultData));
  }),
];

/**
 * GET /common-backend/api/v1/line-groups/0/lines/lineId0/equips/-/child-equips のアクセスで
 * 404 Not Foundを返却するユニットテスト用ハンドラ.
 */
const getLineGroup0LinesErrorNotFoundTestHandler = [
  getLineGroupsTestHandler,
  getLineGroup0TestHandler,
  rest.get(
    '/common-backend/api/v1/line-groups/0/lines/lineId0/equips/-/child-equips',
    (req, res, ctx) => {
      return res(ctx.status(404), ctx.json(errorDefaultData));
    }
  ),
];

/**
 * GET /common-backend/api/v1/line-groups/0/lines/lineId0/equips/-/child-equips のアクセスで
 * 正常な子設備情報のデータを返却するユニットテスト用ハンドラ
 */
const getLineGroup0ToChildEquips0TestHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/lineId0/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips0TestData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines/lineId1/equips/-/child-equips のアクセスで
 * 正常な子設備情報のデータを返却するユニットテスト用ハンドラ
 */
const getLineGroup0ToChildEquips1TestHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/lineId1/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips1TestData));
  }
);

testHandlers = [
  getLineGroupsTestHandler,
  getLineGroup0TestHandler,
  getLineGroup1TestHandler,
  getLineGroup0ToChildEquips0TestHandler,
  getLineGroup0ToChildEquips1TestHandler,
];

module.exports = {
  testHandlers,
  getLineGroupsErrorNotFoundTestHandler,
  getLineGroup0ErrorNotFoundTestHandler,
  getLineGroup0LinesErrorNotFoundTestHandler,
  getLineGroupsTestData,
  getLineGroup0TestData,
  getLineGroup1TestData,
  getEmptyLineGroupsTestData,
  getEmptyLinesTestData,
  getEmptyChildEquipsTestData,
  getLineGroup0ToChildEquips0TestData,
  getLineGroup0ToChildEquips1TestData,
};
