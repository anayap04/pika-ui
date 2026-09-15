import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountdownPanel } from './CountdownPanel';
import { Button } from '../../atoms/Button';

const inFuture = (ms: number) => new Date(Date.now() + ms).toISOString();

const meta = {
  title: 'Organisms/CountdownPanel',
  component: CountdownPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Four digit blocks ticking to a target timestamp, and what replaces them when it passes. The only component in the system that updates once a second, so it carries the live-region rules: `aria-live="off"` while running, flipping to `polite` once for the expiry handover.',
      },
    },
  },
} satisfies Meta<typeof CountdownPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    target: inFuture(4 * 86400000 + 11 * 3600000 + 26 * 60000 + 9000),
    caption: 'December 14, 2025 · 4:00 PM, Valle Dorado',
  },
};

export const UnderOneHour: Story = {
  args: {
    target: inFuture(42000),
    units: ['m', 's'],
    urgentAt: 3600,
  },
};

export const Expired: Story = {
  args: {
    target: inFuture(-1000),
    expiredSlot: <Button variant="primary">CAST VOTE</Button>,
  },
};

export const Night: Story = {
  args: {
    target: inFuture(4 * 86400000 + 11 * 3600000),
  },
  parameters: {
    globals: { theme: 'dark' },
  },
};
