import type { Preview } from '@storybook/react-vite'
import '../src/styles/fonts'
import pikaTheme from './theme'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    options: {
      // Homepage first, then foundations, then the component library.
      storySort: {
        order: ['Overview', 'Foundations', 'Atoms', 'Molecules', 'Organisms'],
      },
    },

    docs: {
      theme: pikaTheme,
    },

    backgrounds: {
      options: {
        // AAA-safe cream: token `foreground` (#6b2d8f) sits at 7.7:1 here.
        paper: { name: 'Manual paper (AAA)', value: '#faf3e3' },
        pixel: { name: 'Pixel (pink)', value: '#e8b4d9' },
        arcade: { name: 'Arcade (night)', value: '#1a0b2e' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },

    initialGlobals: {
      backgrounds: { value: 'paper' },
    },

    a11y: {
      // 'todo' - surface violations in the test UI without failing CI
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
      // Full WCAG 2.2 rule set + AAA-enhanced contrast check
      // (axe `color-contrast-enhanced`: 7:1 body / 4.5:1 large text).
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        },
      },
      config: {
        rules: [{ id: 'color-contrast-enhanced', enabled: true }],
      },
    },
  },
};

export default preview;
