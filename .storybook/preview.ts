import type { Preview } from '@storybook/vue3-vite';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: {
          name: 'dark',
          value: '#0f172a',
        },

        light: {
          name: 'light',
          value: '#ffffff',
        }
      }
    },
    layout: 'centered',
  },

  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  }
};

export default preview;
