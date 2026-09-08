import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for displaying status labels, tags, or category indicators. Supports 5 color variants and 2 sizes with the VT323 pixel font (single 400 weight — no bold) for retro consistency.\n\n**Accessibility**: Badges use semantic `<span>` elements. Every variant meets WCAG 2.2 AAA text contrast (SC 1.4.6, ≥7:1): primary 7.3:1, secondary 7.5:1, accent 10.2:1, destructive 7.3:1, muted 7.8:1. The 2px border keeps the badge edge above 3:1 non-text contrast (SC 1.4.11). Colour is never the only signal — always include a text label. When used in interactive contexts, wrap with appropriate ARIA roles.\n\n**Testing**: Test badge rendering with different variants and sizes. Verify contrast ratios, confirm the pixel font renders at weight 400 (no faux-bold), and check responsive behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'destructive', 'muted'],
      description: 'Badge color variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Badge size: sm (small) or md (medium)',
    },
    children: {
      control: { type: 'text' },
      description: 'Badge label text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'TEAM GIRL',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'TEAM BOY',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    size: 'md',
    children: 'VOTE CAST',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'md',
    children: 'ERROR',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    size: 'md',
    children: 'LOCKED',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'NEW',
  },
};

export const AllVariants: Story = {
  args: { size: 'md' },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="muted">Muted</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { variant: 'primary' },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

export const TeamVotes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Badge variant="primary">EQUIPO NIÑA</Badge>
        <Badge variant="primary" size="sm">
          31 VOTES
        </Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Badge variant="secondary">EQUIPO NIÑO</Badge>
        <Badge variant="secondary" size="sm">
          20 VOTES
        </Badge>
      </div>
    </div>
  ),
};

export const StatusBadges: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="accent">LIVE NOW</Badge>
      <Badge variant="destructive">ENDED</Badge>
      <Badge variant="muted">LOCKED</Badge>
      <Badge variant="primary">ACTIVE</Badge>
    </div>
  ),
};
