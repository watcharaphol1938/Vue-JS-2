import lineGroups from '@/mocks/common-backend/common-backend-v0-line-groups';
import header from '@/mocks/customapp/header';
import footer from '@/mocks/customapp/footer';
import cycletime from '@/mocks/customapp/cycletime';

/**
 * Note:
 *   モックのON/OFFはコメントアウトで行える.
 *   表示用のサイクルタイムはバックエンドから取得する.
 */
export const defaultHandlers = [
  ...lineGroups.defaultHandlers,
  ...header.defaultHandlers,
  ...footer.defaultHandlers,
];

/**
 * UnitTest用のdefaultHandlers.
 */
export const defaultHandlersUnitTest = [
  ...lineGroups.testHandlers,
  ...header.defaultHandlers,
  ...footer.defaultHandlers,
  ...cycletime.testHandlers,
];
