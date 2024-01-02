import { worker } from '../../src/mocks/browser';

Cypress.on('test:before:run:async', async () => {
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
});
