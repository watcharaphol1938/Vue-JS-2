import {setupWorker} from 'msw';
import {defaultHandlers} from '@/mocks/handlers';

export const worker = setupWorker(...defaultHandlers);
