import { handlers } from 'api/mocks/handlers';
import { setupWorker } from 'msw';

export const worker = setupWorker(...handlers);
