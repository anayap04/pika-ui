import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paragraph } from './Paragraph';

const meta = {
  title: 'Atoms/Typography/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Paragraph component for body text with Nunito font family. Supports size, color, and weight variants for readable, accessible long-form content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Font size: sm (12px), md (14px), lg (16px)',
    },
    color: {
      control: { type: 'select' },
      options: ['foreground', 'muted', 'primary', 'secondary'],
      description: 'Text color — uses strong variants for primary/secondary for readability',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'bold'],
      description: 'Font weight: normal (400), medium (600), bold (800)',
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'foreground',
    weight: 'normal',
    children:
      'This is a paragraph with the body font (Nunito). It is designed for readability and should be used for all long-form content, form inputs, and descriptive text throughout the application.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'foreground',
    weight: 'normal',
    children: 'This is a small paragraph (12px). Use for helper text, captions, or secondary information.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'foreground',
    weight: 'normal',
    children: 'Vote once. The result is revealed when the timer hits zero.',
  },
};

export const MutedColor: Story = {
  args: {
    size: 'md',
    color: 'muted',
    weight: 'normal',
    children: 'This paragraph uses the muted color for secondary or disabled content.',
  },
};

export const PrimaryColor: Story = {
  args: {
    size: 'md',
    color: 'primary',
    weight: 'normal',
    children: 'This paragraph uses the primary color for emphasized content.',
  },
};

export const SecondaryColor: Story = {
  args: {
    size: 'md',
    color: 'secondary',
    weight: 'normal',
    children: 'This paragraph uses the secondary color for alternative emphasis.',
  },
};

export const BoldWeight: Story = {
  args: {
    size: 'md',
    color: 'foreground',
    weight: 'bold',
    children: 'This is bold paragraph text for emphasis within body content.',
  },
};

export const MediumWeight: Story = {
  args: {
    size: 'md',
    color: 'foreground',
    weight: 'medium',
    children: 'This is medium-weight paragraph text, between normal and bold.',
  },
};

export const AllSizes: Story = {
  args: { size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Paragraph size="sm">Small (12px) — Use for helper text and captions</Paragraph>
      <Paragraph size="md">Medium (14px) — Default size for body content</Paragraph>
      <Paragraph size="lg">Large (16px) — Use for prominent descriptions</Paragraph>
    </div>
  ),
};

export const AllWeights: Story = {
  args: { weight: 'normal' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Paragraph weight="normal">Normal (400) — Standard body text weight</Paragraph>
      <Paragraph weight="medium">Medium (600) — Emphasized text within content</Paragraph>
      <Paragraph weight="bold">Bold (800) — Strong emphasis for important phrases</Paragraph>
    </div>
  ),
};
