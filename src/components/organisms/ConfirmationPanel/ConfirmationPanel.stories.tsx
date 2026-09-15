import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmationPanel } from './ConfirmationPanel';

const meta = {
  title: 'Organisms/ConfirmationPanel',
  component: ConfirmationPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'What replaces VotePanel after a successful write. It names the person, repeats the choice in words, and offers exactly one way back.',
      },
    },
  },
} satisfies Meta<typeof ConfirmationPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TeamGirl: Story = {
  args: {
    voterName: 'Danna',
    choiceLabel: 'Team Girl',
    variant: 'primary',
    nextStepsMessage: 'Your name now sits in the results below, and the cabinet calls it on December 14.',
    onReset: () => {},
  },
};

export const TeamBoy: Story = {
  args: {
    voterName: 'Alex',
    choiceLabel: 'Team Boy',
    variant: 'secondary',
    onReset: () => {},
  },
};

export const NoNameGiven: Story = {
  args: {
    choiceLabel: 'Team Girl',
    variant: 'primary',
  },
};

export const WriteFailed: Story = {
  args: {
    status: 'failed',
    onRetry: () => {},
  },
};

export const Night: Story = {
  args: {
    voterName: 'Danna',
    choiceLabel: 'Team Girl',
    variant: 'primary',
    onReset: () => {},
  },
  parameters: {
    globals: { theme: 'dark' },
  },
};
