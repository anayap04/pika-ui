import type { Preview } from '@storybook/react-vite'
import '../src/styles/fonts'
import '../src/tokens/index.css'
import pikaTheme from './theme'
import { withTheme } from './withTheme'

const preview: Preview = {
  decorators: [withTheme],

  globalTypes: {
    theme: {
      description: 'Light / dark theme (both meet WCAG 2.2 AAA)',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark (arcade night)', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

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

    a11y: {
      // 'todo' - surface violations in the test UI without failing CI
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
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
}

export default preview
