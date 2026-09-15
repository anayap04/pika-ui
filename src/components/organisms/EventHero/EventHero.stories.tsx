import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventHero } from './EventHero';
import { QRBlock } from '../QRBlock';

const meta = {
  title: 'Organisms/EventHero',
  component: EventHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The pixel band at the top of a screen: which level the player is on, what the event is, and up to four fact tags. One per page, always first in the flow.',
      },
    },
  },
  argTypes: {
    ground: { control: { type: 'select' }, options: ['pink', 'paper'] },
  },
} satisfies Meta<typeof EventHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'GENDER\nREVEAL',
    kicker: 'Insert coin',
    tagline: 'A new player is loading. Pick a team before the cabinet calls it.',
    level: 1,
    tags: ['Dec 14', '4:00 PM', 'Valle Dorado'],
  },
};

export const Minimal: Story = {
  args: {
    title: 'BABY\nSHOWER',
  },
};

export const PaperGround: Story = {
  args: {
    title: 'LOCKED',
    kicker: 'Level 2',
    ground: 'paper',
  },
};

export const WithAside: Story = {
  args: {
    title: 'GENDER\nREVEAL',
    kicker: 'Insert coin',
    level: 1,
  },
  render: (args) => (
    <EventHero
      {...args}
      aside={<QRBlock url="https://example.com/live" size="sm" caption="Scan to join live" />}
    />
  ),
};

export const Night: Story = {
  args: {
    title: 'GENDER\nREVEAL',
    kicker: 'Insert coin',
  },
  parameters: {
    globals: { theme: 'dark' },
  },
};
