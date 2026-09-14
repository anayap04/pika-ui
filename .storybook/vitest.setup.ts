import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

// Applies preview annotations (decorators, parameters, etc.) to portable stories
// run under Vitest. Required by @storybook/addon-vitest.
setProjectAnnotations([projectAnnotations]);
