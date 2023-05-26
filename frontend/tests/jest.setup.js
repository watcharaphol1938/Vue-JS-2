import '@testing-library/jest-dom';
import {configure} from '@testing-library/dom';
import {server} from '@/mocks/server';

beforeAll(() => {
  server.listen();
  // see: https://testing-library.com/docs/dom-testing-library/api-configuration/#asyncutiltimeout
  configure({asyncUtilTimeout: 30000});
});
beforeEach(() => {
  jest.useFakeTimers();
  server.resetHandlers();
});
afterAll(() => server.close());
