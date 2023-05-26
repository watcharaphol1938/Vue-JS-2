import {setupServer} from 'msw/node';
import {defaultHandlersUnitTest} from '@/mocks/handlers';

export const server = setupServer(...defaultHandlersUnitTest);
