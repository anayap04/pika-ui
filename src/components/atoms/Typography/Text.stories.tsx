import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Inline text component for spans with optional variant, size, color, and weight props. Perfect for inline emphasis, badges, or small text labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['body', 'subheading'],
      description: 'Font family: body (Nunito) or subheading (VT323)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Font size: sm (12px), md (14px), lg (16px)',
    },
    color: {
      control: { type: 'select' },
      options: ['foreground', 'muted', 'primary', 'secondary', 'accent', 'destructive'],
      description: 'Text color from design tokens',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'bold'],
      description: 'Font weight: normal (400), medium (700), bold (800)',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body',
    size: 'md',
    color: 'foreground',
    weight: 'normal',
    children: 'Inline text element',
  },
};

export const SubheadingVariant: Story = {
  args: {
    variant: 'subheading',
    size: 'md',
    color: 'foreground',
    weight: 'normal',
    children: 'VT323 monospace text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with VT323 monospace font — good for labels, badges, or retro styling.',
      },
    },
  },
};

export const InContext: Story = {
  args: { variant: 'body', size: 'md' },
  render: () => (
    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
      This paragraph contains <Text weight="bold">bold inline text</Text>, some{' '}
      <Text color="primary">primary colored text</Text>, and even a{' '}
      <Text variant="subheading" color="accent">
        monospace badge
      </Text>
      .
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component used inline within a paragraph for emphasis and styling.',
      },
    },
  },
};

export const SmallLabel: Story = {
  args: {
    variant: 'subheading',
    size: 'sm',
    color: 'muted',
    weight: 'normal',
    children: 'VOTE COUNT',
  },
};

export const Badge: Story = {
  args: {
    variant: 'subheading',
    size: 'md',
    color: 'primary',
    weight: 'bold',
    children: 'TEAM NIÑA',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text styled as a badge label — bold subheading with primary color.',
      },
    },
  },
};

export const AllColors: Story = {
  args: { color: 'foreground' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text color="foreground">Foreground text</Text>
      <Text color="muted">Muted text</Text>
      <Text color="primary">Primary text</Text>
      <Text color="secondary">Secondary text</Text>
      <Text color="accent">Accent text</Text>
      <Text color="destructive">Destructive text</Text>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text size="sm">Small text (12px)</Text>
      <Text size="md">Medium text (14px)</Text>
      <Text size="lg">Large text (16px)</Text>
    </div>
  ),
};

export const AllVariants: Story = {
  args: { variant: 'body' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text variant="body">Body font (Nunito)</Text>
      <Text variant="subheading">Subheading font (VT323)</Text>
    </div>
  ),
};
