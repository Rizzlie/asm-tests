import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { initialize as initializeMsw, mswLoader } from 'msw-storybook-addon';
import docJson from '../documentation.json';
import { handlers } from '../src/mocks/handlers';
setCompodocJson(docJson);

initializeMsw(
  {
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  },
  handlers
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
