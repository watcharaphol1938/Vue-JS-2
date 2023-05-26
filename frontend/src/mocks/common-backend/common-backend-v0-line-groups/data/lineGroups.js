/**
 * GET /common-backend/api/v0/line-groups 用のデフォルトデータ.
 */
const getLineGroupsDefaultData = {
  lineGroups: [
    {
      id: '0',
      name: 'LGAS__8477_fake_name',
    },
    {
      id: '1',
      name: 'LGAS__8478_fake_name',
    },
    {
      id: '2',
      name: 'LGAS__8479_fake_name',
    },
  ],
};

/**
 * GET /common-backend/api/v0/line-groups 用のユニットテストで使用するデータ.
 */
const getLineGroupsTestData = {
  lineGroups: [
    {
      id: '0',
      name: 'lineGroup0',
    },
    {
      id: '1',
      name: 'lineGroup1',
    },
    {
      id: '2',
      name: 'lineGroup2',
    },
  ],
};

module.exports = {
  getLineGroupsDefaultData,
  getLineGroupsTestData,
};
