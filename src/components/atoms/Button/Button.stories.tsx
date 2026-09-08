import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component with pixel-art styling (4px hard-edged borders). Supports 4 variants (primary, secondary, accent, destructive) and 3 sizes (sm, md, lg). All buttons meet WCAG 2.2 AA accessibility standards with 44px minimum tap targets and visible focus outlines.\n\n**Accessibility**: ✓ 44px minimum height for tap target (WCAG 2.2 SC 2.5.8) ✓ Visible focus outline with 3px solid ring (WCAG 2.2 SC 2.4.7) ✓ Color contrast verified (WCAG 2.2 AA) ✓ Disabled state reduces opacity for distinction.\n\n**Testing**: Verify all 4 variants render with correct colors. Test 3 sizes for tap target compliance (min 44px). Confirm disabled state (opacity 0.6). Validate focus outline visibility using Tab key. Check hover/active state visual feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'destructive'],
      description: 'Button color variant — primary (pink), secondary (blue), accent (gold), destructive (red)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size: sm (small padding), md (default), lg (large padding)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable button interaction and reduce opacity',
    },
    children: {
      control: { type: 'text' },
      description: 'Button label text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    children: 'EQUIPO NIÑA',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    children: 'EQUIPO NIÑO',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    size: 'md',
    disabled: false,
    children: 'VOTE NOW',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'md',
    disabled: false,
    children: 'DELETE VOTE',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    disabled: false,
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state: button is not clickable and has reduced opacity (60%). Tab focus still works for accessibility.',
      },
    },
  },
};

export const AllVariants: Story = {
  args: { variant: 'primary', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { variant: 'primary', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllStates: Story = {
  args: { variant: 'primary', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Default</p>
        <Button variant="primary">Enabled</Button>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Disabled</p>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Focus (Tab to see)</p>
        <Button variant="primary" autoFocus>
          Focused
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button states: enabled (default), disabled (60% opacity), and focused (3px outline ring).',
      },
    },
  },
};

export const PixelArtBorders: Story = {
  args: { variant: 'primary', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="primary">Pixel Borders</Button>
      <Button variant="secondary">4px Hard Edges</Button>
      <Button variant="accent">No Radius</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All buttons feature pixel-art styling: 4px hard-edged box-shadow borders with 0px border-radius for the retro arcade aesthetic.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: { variant: 'primary', size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Tap Target Size (44px min)</p>
        <Button variant="primary" size="sm">
          Click me
        </Button>
        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#666' }}>
          Hover or focus: minimum 44×44px hit area (WCAG 2.2 SC 2.5.8)
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Focus Outline (Tab to see)</p>
        <Button variant="primary" autoFocus>
          Focus Outline
        </Button>
        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#666' }}>
          3px solid ring outline with 2px offset (WCAG 2.2 SC 2.4.7 & 2.4.11)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features: 44px tap targets, visible focus outline, high color contrast on all variants.',
      },
    },
  },
};
