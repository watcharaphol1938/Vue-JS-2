module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/unit/setup.js', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['./tests/jest.setup.js'],
  // テスト実行時にcoverage reportを作成する場合は, 下記のコメントアウトを解除すること
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.{js,vue}',
  //   '!src/main.js', // No need to cover bootstrap file
  // ],
};
