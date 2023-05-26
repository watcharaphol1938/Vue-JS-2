const {defaultHandlers} = require('./handler/default.js');
const {
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
} = require('./handler/test.js');

module.exports = {
  defaultHandlers,
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
