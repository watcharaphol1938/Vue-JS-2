const {rest} = require('msw');
const {getLineGroupsDefaultData} = require('../data/lineGroups.js');
const {getLineGroup0DefaultData} = require('../data/lineGroup0.js');
const {getLineGroup1DefaultData} = require('../data/lineGroup1.js');
const {
  getLineGroup0ToChildEquips0DefaultData,
  getLineGroup0ToChildEquips1DefaultData,
  getLineGroup0ToChildEquips2DefaultData,
  getLineGroup0ToChildEquips3DefaultData,
  getLineGroup0ToChildEquips4DefaultData,
  getLineGroup0ToChildEquips5DefaultData,
} = require('../data/lineGroup0Lines.js');
const {
  getLineGroup1ToChildEquips0DefaultData,
} = require('../data/lineGroup1Lines.js');

/**
 * GET /common-backend/api/v0/line-groups のアクセスで
 * 正常なライン群情報を返却するハンドラ.
 */
const getLineGroupsDefaultHandler = rest.get(
  '/common-backend/api/v0/line-groups',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroupsDefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines のアクセスで
 * 正常なライン情報、子設備情報のデータを返却するハンドラ.
 */
const getLineGroup0DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/1/lines のアクセスで
 * 正常なライン情報を返却するハンドラ.
 */
const getLineGroup1DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/1/lines',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup1DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNRA__1695/equips/-/child-equips のアクセスで
 * 正常な子設備情報のデータを返却するハンドラ.
 */
const getLineGroup0ToChildEquips0DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/LNRA__1695/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips0DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNASXX9875/equips/-/child-equips のアクセスで
 * 子設備情報が空配列のデータを返却するハンドラ.
 */
const getLineGroup0ToChildEquips1DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/LNASXX9875/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips1DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNIN000600/equips/-/child-equips のアクセスで
 * 子設備情報が空配列のデータを返却するハンドラ.
 */
const getLineGroup0ToChildEquips2DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/LNIN000600/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips2DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNAS__9386/equips/-/child-equips のアクセスで
 * 子設備情報が空配列のデータを返却するハンドラ.
 */
const getLineGroup0ToChildEquips3DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/LNAS__9386/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips3DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNRAXX1778/equips/-/child-equips のアクセスで
 * 子設備情報が空配列のデータを返却するハンドラ.
 */
const getLineGroup0ToChildEquips4DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/LNRAXX1778/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips4DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/0/lines/LNZE__0682/equips/-/child-equips のアクセスで
 * 子設備情報が空配列のデータを返却するハンドラ.
 */
const getLineGroup0ToChildEquips5DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/0/lines/LNZE__0682/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup0ToChildEquips5DefaultData));
  }
);

/**
 * GET /common-backend/api/v1/line-groups/1/lines/LNZE__0682/equips/-/child-equips のアクセスで
 * 子設備情報が空配列のデータを返却するハンドラ.
 */
const getLineGroup1ToChildEquips0DefaultHandler = rest.get(
  '/common-backend/api/v1/line-groups/1/lines/LNZE__0682/equips/-/child-equips',
  (req, res, ctx) => {
    return res(ctx.json(getLineGroup1ToChildEquips0DefaultData));
  }
);

defaultHandlers = [
  getLineGroupsDefaultHandler,
  getLineGroup0DefaultHandler,
  getLineGroup1DefaultHandler,
  getLineGroup0ToChildEquips0DefaultHandler,
  getLineGroup0ToChildEquips1DefaultHandler,
  getLineGroup0ToChildEquips2DefaultHandler,
  getLineGroup0ToChildEquips3DefaultHandler,
  getLineGroup0ToChildEquips4DefaultHandler,
  getLineGroup0ToChildEquips5DefaultHandler,
  getLineGroup1ToChildEquips0DefaultHandler,
];

module.exports = {
  defaultHandlers,
};
