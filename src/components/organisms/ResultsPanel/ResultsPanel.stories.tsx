import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResultsPanel } from './ResultsPanel';

const meta = {
  title: 'Organisms/ResultsPanel',
  component: ResultsPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The live split. Two stepped bars, absolute counts beside percentages, and a leader line that only appears once the sample is big enough to mean anything.',
      },
    },
  },
} satisfies Meta<typeof ResultsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    tallies: [
      { id: 'girl', label: 'Team girl', count: 28, variant: 'primary' },
      { id: 'boy', label: 'Team boy', count: 20, variant: 'secondary' },
    ],
  },
};

export const Empty: Story = {
  args: {
    tallies: [
      { id: 'girl', label: 'Team girl', count: 0, variant: 'primary' },
      { id: 'boy', label: 'Team boy', count: 0, variant: 'secondary' },
    ],
  },
};

export const TooFewToCall: Story = {
  args: {
    tallies: [
      { id: 'girl', label: 'Team girl', count: 1, variant: 'primary' },
      { id: 'boy', label: 'Team boy', count: 1, variant: 'secondary' },
    ],
    minSample: 3,
  },
};

export const Tie: Story = {
  args: {
    tallies: [
      { id: 'girl', label: 'Team girl', count: 5, variant: 'primary' },
      { id: 'boy', label: 'Team boy', count: 5, variant: 'secondary' },
    ],
  },
};

export const Landslide: Story = {
  args: {
    tallies: [
      { id: 'girl', label: 'Team girl', count: 92, variant: 'primary' },
      { id: 'boy', label: 'Team boy', count: 8, variant: 'secondary' },
    ],
  },
};

export const FourWay: Story = {
  args: {
    tallies: [
      { id: 'a', label: 'Round 1', count: 12, variant: 'primary' },
      { id: 'b', label: 'Round 2', count: 9, variant: 'secondary' },
      { id: 'c', label: 'Round 3', count: 6, variant: 'accent' },
      { id: 'd', label: 'Round 4', count: 3, variant: 'destructive' },
    ],
  },
};

export const Night: Story = {
  args: {
    tallies: [
      { id: 'girl', label: 'Team girl', count: 58, variant: 'primary' },
      { id: 'boy', label: 'Team boy', count: 42, variant: 'secondary' },
    ],
  },
  parameters: {
    globals: { theme: 'dark' },
  },
};
