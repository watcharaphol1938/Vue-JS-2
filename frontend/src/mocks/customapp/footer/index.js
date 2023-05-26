const {rest} = require('msw');

const getFooterDefaultData = {appVersion: '0.0.0'};

const getFooterDefaultHandler = rest.get(
  '/asia-oee/api/footer',
  (req, res, ctx) => {
    return res(ctx.json(getFooterDefaultData));
  }
);

module.exports = {
  defaultHandlers: [getFooterDefaultHandler],
  getFooterDefaultHandler,
  getFooterDefaultData,
};
