import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Heading, Paragraph } from './Typography';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card component for containing content with configurable padding and visual elevation. Features pixel-art borders and supports default and elevated variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Internal padding: sm (8px), md (16px), lg (24px)',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated'],
      description: 'Visual style: default (flat), elevated (with 4px pixel border shadow)',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: 'md',
    variant: 'default',
    children: (
      <div>
        <Heading level={2} color="foreground">
          Card Title
        </Heading>
        <Paragraph size="md" color="foreground">
          This is a default card with standard padding and a simple border.
        </Paragraph>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    padding: 'md',
    variant: 'elevated',
    children: (
      <div>
        <Heading level={2} color="foreground">
          Elevated Card
        </Heading>
        <Paragraph size="md" color="foreground">
          This card has elevation with a 4px pixel-art border shadow effect.
        </Paragraph>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    variant: 'default',
    children: (
      <div>
        <Heading level={3}>Compact Card</Heading>
        <Paragraph size="sm">Tight padding (8px)</Paragraph>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    variant: 'default',
    children: (
      <div>
        <Heading level={2}>Spacious Card</Heading>
        <Paragraph size="md">Generous padding (24px) for breathing room</Paragraph>
      </div>
    ),
  },
};

export const AllPaddings: Story = {
  args: { padding: 'md', variant: 'default' },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Card padding="sm" style={{ width: '200px' }}>
        <Heading level={4}>Small (8px)</Heading>
        <Paragraph size="sm">Compact padding</Paragraph>
      </Card>
      <Card padding="md" style={{ width: '200px' }}>
        <Heading level={4}>Medium (16px)</Heading>
        <Paragraph size="sm">Default padding</Paragraph>
      </Card>
      <Card padding="lg" style={{ width: '200px' }}>
        <Heading level={4}>Large (24px)</Heading>
        <Paragraph size="sm">Spacious padding</Paragraph>
      </Card>
    </div>
  ),
};

export const AllVariants: Story = {
  args: { padding: 'md', variant: 'default' },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Card padding="md" variant="default" style={{ width: '200px' }}>
        <Heading level={4}>Default</Heading>
        <Paragraph size="sm">Flat style with border only</Paragraph>
      </Card>
      <Card padding="md" variant="elevated" style={{ width: '200px' }}>
        <Heading level={4}>Elevated</Heading>
        <Paragraph size="sm">Pixel-art shadow effect</Paragraph>
      </Card>
    </div>
  ),
};

export const VotingTeamCard: Story = {
  args: { padding: 'lg', variant: 'elevated' },
  render: () => (
    <Card padding="lg" variant="elevated" style={{ width: '300px' }}>
      <Heading level={2} color="primary">
        EQUIPO NIÑA 👑
      </Heading>
      <div style={{ margin: '16px 0' }}>
        <Heading level={3} color="primary">
          31 VOTOS
        </Heading>
        <Paragraph size="md" color="muted">
          61% of total votes
        </Paragraph>
      </div>
      <div style={{ height: '16px', backgroundColor: '#e8b4d9', border: '1px solid #000' }}>
        <div
          style={{
            height: '100%',
            width: '61%',
            backgroundColor: '#fc5c94',
          }}
        />
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example: Card used for displaying vote team data in the Gender Reveal Voting App.',
      },
    },
  },
};

export const FormCard: Story = {
  args: { padding: 'lg', variant: 'default' },
  render: () => (
    <Card padding="lg" variant="default" style={{ width: '350px' }}>
      <Heading level={2}>Enter Your Name</Heading>
      <Paragraph size="md" color="muted">
        Make your prediction for the baby's gender
      </Paragraph>
      <div style={{ margin: '24px 0' }}>
        <input
          type="text"
          placeholder="Your name..."
          style={{
            width: '100%',
            padding: '8px 16px',
            border: '1px solid #000',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#c93870',
            color: '#fff',
            border: '4px solid #000',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          TEAM GIRL
        </button>
        <button
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#2f6fe0',
            color: '#fff',
            border: '4px solid #000',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          TEAM BOY
        </button>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example: Card used as a form container for the voting app.',
      },
    },
  },
};
