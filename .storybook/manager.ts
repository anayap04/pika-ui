import { addons } from 'storybook/manager-api';
import pikaTheme from './theme';

addons.setConfig({
  theme: pikaTheme,
  sidebar: {
    showRoots: true,
  },
});
