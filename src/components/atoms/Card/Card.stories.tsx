import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Heading, Paragraph } from '../Typography';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card component for containing content with configurable padding and visual elevation. Features pixel-art borders and supports default and elevated variants.\n\n**Accessibility**: ✓ Uses semantic `<div>` for content containment ✓ Supports color contrast for child content ✓ No inherent interactive elements; wrapper for accessible child components.\n\n**Testing**: Verify 2 variants (default, elevated) render correctly. Test 3 padding levels (sm 8px, md 16px, lg 24px). Confirm border rendering and shadow effect on elevated variant. Validate child content accessibility and contrast within cards.',
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


