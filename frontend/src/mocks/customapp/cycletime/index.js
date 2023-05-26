const {rest} = require('msw');
const {getCycleTimeTestData} = require('./data/default.js');
const {getCycleTimeEmptyTestData} = require('./data/empty.js');
const {
  getCycleTimePagingTestData,
  getCycleTimePagingLastTestData,
} = require('./data/paging.js');

/**
 * GET /asia-oee/api/durations のアクセスで
 * 正常なサイクルタイムデータを返すテスト用ハンドラ.
 */
const getCycleTimeTestHandler = rest.get(
  '/asia-oee/api/durations',
  (req, res, ctx) => {
    return res(ctx.json(getCycleTimeTestData));
  }
);

/**
 * GET /asia-oee/api/durations のアクセスで
 * ページングありのサイクルタイムデータを返すテスト用ハンドラ.
 */
const getCycleTimePagingTestHandler = rest.get(
  '/asia-oee/api/durations',
  (req, res, ctx) => {
    // requestのpageToken
    const reqPageToken = req.url.searchParams.get('page_token');
    // 初回(pageTokenありのresponse)
    if (reqPageToken == '') {
      return res(ctx.json(getCycleTimePagingTestData));
    }
    // pageTokenが空のresponse
    return res(ctx.json(getCycleTimePagingLastTestData));
  }
);
/**
 * GET /asia-oee/api/durations のアクセスで
 * 空のサイクルタイムデータと404エラーを返却するテスト用ハンドラ.
 */
const getCycletimeNotFoundErrorTestHandler = rest.get(
  '/asia-oee/api/durations',
  (req, res, ctx) => {
    return res(ctx.status(404), ctx.json(getCycleTimeEmptyTestData));
  }
);

/**
 * 現状ローカル環境でcycletimeの表示用のレスポンスはバックエンドから返しているため、
 * 以下の全てのハンドラはテスト用である.
 */
module.exports = {
  testHandlers: [getCycleTimeTestHandler],
  getCycleTimePagingTestHandler,
  getCycletimeNotFoundErrorTestHandler,
};
