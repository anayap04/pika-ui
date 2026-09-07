import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Heading component with semantic HTML levels (h1-h4) and typography variants (display, subheading, body).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
      description: 'HTML heading level (h1-h4) — determines font size and semantic meaning',
    },
    variant: {
      control: { type: 'select' },
      options: ['display', 'subheading', 'body'],
      description: 'Font family variant — Press Start 2P (display), VT323 (subheading), Nunito (body)',
    },
    color: {
      control: { type: 'select' },
      options: ['foreground', 'muted', 'primary', 'secondary', 'accent', 'destructive'],
      description: 'Text color from design tokens',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1Display: Story = {
  args: {
    level: 1,
    variant: 'display',
    color: 'foreground',
    children: 'Gender Reveal Voting App',
  },
  parameters: {
    docs: {
      description: {
        story: 'H1 with display font (Press Start 2P) — used for hero titles and main CTAs only.',
      },
    },
  },
};

export const H2Subheading: Story = {
  args: {
    level: 2,
    variant: 'subheading',
    color: 'foreground',
    children: 'Make Your Prediction',
  },
};

export const H3Subheading: Story = {
  args: {
    level: 3,
    variant: 'subheading',
    color: 'foreground',
    children: 'Vote for Your Team',
  },
};

export const H4Subheading: Story = {
  args: {
    level: 4,
    variant: 'subheading',
    color: 'foreground',
    children: 'Vote Confirmation',
  },
};

export const HeadingPrimary: Story = {
  args: {
    level: 2,
    variant: 'subheading',
    color: 'primary',
    children: 'Primary Heading',
  },
};

export const HeadingAccent: Story = {
  args: {
    level: 2,
    variant: 'subheading',
    color: 'accent',
    children: 'Accent Heading',
  },
};

export const HeadingDestructive: Story = {
  args: {
    level: 2,
    variant: 'subheading',
    color: 'destructive',
    children: 'Error Heading',
  },
};

export const AllLevels: Story = {
  args: { level: 1 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Heading level={1} variant="display" color="foreground">
        Level 1: Display (Press Start 2P)
      </Heading>
      <Heading level={2} variant="subheading" color="foreground">
        Level 2: Subheading (VT323)
      </Heading>
      <Heading level={3} variant="subheading" color="foreground">
        Level 3: Subheading (VT323)
      </Heading>
      <Heading level={4} variant="subheading" color="foreground">
        Level 4: Subheading (VT323)
      </Heading>
    </div>
  ),
};

export const AllColors: Story = {
  args: { level: 2 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading level={2} color="foreground">
        Foreground
      </Heading>
      <Heading level={2} color="muted">
        Muted
      </Heading>
      <Heading level={2} color="primary">
        Primary
      </Heading>
      <Heading level={2} color="secondary">
        Secondary
      </Heading>
      <Heading level={2} color="accent">
        Accent
      </Heading>
      <Heading level={2} color="destructive">
        Destructive
      </Heading>
    </div>
  ),
};
