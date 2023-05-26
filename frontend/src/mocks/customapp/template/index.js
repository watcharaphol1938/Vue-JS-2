const {rest} = require('msw');

/**
 * デフォルト返却データの定義
 *
 * RULE: 命名規則
 *   {httpメソッド名}{リソースをcamelCaseで書いたもの}{Default}Data
 * RULE: docstringの記載要否
 *   不要.
 */
const getSampleEndpointSubDefaultData = {value: 'sample'};

/**
 * デフォルトハンドラの定義
 *   このサンプルは, 下記の仕様になっている.
 *     path: /asia-oee/api/sample-endpoint/sub
 *     HTTP method: GET
 *     response: getSampleEndpointSubDefaultData
 *
 * RULE: 命名規則
 *   {httpメソッド名}{リソースをcamelCaseで書いたもの}{Default}Handler
 * RULE: docstringの記載要否
 *   不要.
 */
const getSampleEndpointSubDefaultHandler = rest.get(
  '/asia-oee/api/sample-endpoint/sub',
  (req, res, ctx) => {
    return res(ctx.json(getSampleEndpointSubDefaultData));
  }
);

/**
 * 特定のケース用データの定義
 *
 * RULE: 命名規則
 *   {httpメソッド名}{リソースをcamelCaseで書いたもの}{ケース名}Data
 * RULE: docstringの記載要否
 *   要.
 */
const getSampleEndpointSubSpecificCaseData = {value: 'specific case'};

/**
 * 特定のケース用ハンドラの定義
 *   このサンプルは, 下記の仕様になっている.
 *     path: /asia-oee/api/sample-endpoint/sub
 *     HTTP method: GET
 *     response: getSampleEndpointSubSpecificCaseData
 *
 * RULE: 命名規則
 *   {httpメソッド名}{リソースをcamelCaseで書いたもの}{ケース名}Handler
 * RULE: docstringの記載要否
 *   要.
 */
const getSampleEndpointSubSpecificCaseHandler = rest.get(
  '/asia-oee/api/sample-endpoint/sub',
  (req, res, ctx) => {
    return res(ctx.json(getSampleEndpointSubDefaultData));
  }
);

/**
 * export項目.
 *
 * NOTE: exportする項目についてのルール.
 *   返却データ, ハンドラ共に全項目をexportする.
 *
 * NOTE: exportの方式
 *   暫定で, CommonJS形式を採用.
 *   一部のモック定義は将来的にnpm package化する予定.
 *   ES Module形式では環境差分など発生の恐れがあるため,
 *   安全なCommonJS形式を採用している.
 */
module.exports = {
  defaultHandlers: [getSampleEndpointSubDefaultHandler],
  getSampleEndpointSubDefaultHandler,
  getSampleEndpointSubDefaultData,
  getSampleEndpointSubSpecificCaseData,
  getSampleEndpointSubSpecificCaseHandler,
};
