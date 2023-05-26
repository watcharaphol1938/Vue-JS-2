const {rest} = require('msw');

const getHeaderDefaultData = {appName: 'asia-oee', cn: 'example-cn'};
const getHeaderDefaultHandler = rest.get(
  '/asia-oee/api/header',
  (req, res, ctx) => {
    return res(ctx.json(getHeaderDefaultData));
  }
);

module.exports = {
  defaultHandlers: [getHeaderDefaultHandler],
  getHeaderDefaultHandler,
  getHeaderDefaultData,
};
