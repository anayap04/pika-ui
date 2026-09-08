import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { Button } from '../Button';
import { theme, fontFamilies } from '../../../tokens';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input component for text entry with 3 size options (sm, md, lg). All inputs meet WCAG 2.2 AAA standards with 44px minimum height tap targets and proper focus outlines.\n\n**Accessibility**: ✓ 44px minimum height for tap target (md/lg sizes; SC 2.5.8) ✓ Visible focus outline with 3px solid ring (SC 2.4.7) ✓ Purple text (#6b2d8f) on white background for 8.8:1 contrast ratio (AAA) ✓ Supports placeholder text without labels ✓ Disabled state clear (opacity 0.6).\n\n**Testing**: Verify all 3 sizes render with correct heights. Confirm tap target compliance (min 44px). Test focus outline visibility. Validate text color contrast using color contrast analyzer. Test disabled state visual feedback. Confirm placeholder text behavior. Test keyboard input and focus navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Input size: sm (compact), md (default), lg (spacious)',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when input is empty',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable input and reduce opacity',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    placeholder: 'Enter your name...',
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input field',
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input field',
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    size: 'md',
    value: 'Miguel Angel Sandoval',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a filled value. In interactive mode, you can edit the value.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    value: 'Read-only value',
    disabled: true,
    placeholder: 'This input is disabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input: not editable, 60% opacity, but still focusable for accessibility.',
      },
    },
  },
};

export const AllSizes: Story = {
  args: { size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="sm" placeholder="Small (12px, 44px height)" />
      <Input size="md" placeholder="Medium (14px, 44px height)" />
      <Input size="lg" placeholder="Large (16px, 44px height)" />
    </div>
  ),
};

export const Focused: Story = {
  args: {
    size: 'md',
    placeholder: 'Tab or click to focus',
    autoFocus: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with focus outline visible. Shows the 3px solid ring with 2px offset (WCAG 2.2 SC 2.4.7).',
      },
    },
  },
};

export const Accessibility: Story = {
  args: { size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Tap Target Size (44px min)</p>
        <Input size="sm" placeholder="Small size (44px height)" />
        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          Minimum 44×44px hit area (WCAG 2.2 SC 2.5.8)
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Focus Outline (Tab to see)</p>
        <Input size="md" placeholder="Tab to see focus outline" autoFocus />
        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          3px solid ring outline with 2px offset (WCAG 2.2 SC 2.4.7 & 2.4.11)
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>Color Contrast</p>
        <Input size="md" placeholder="Purple text on white background (8.8:1 AAA pass)" />
        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          Input text color: #6b2d8f on #ffffff — 8.8:1 (SC 1.4.6 WCAG AAA)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features: 44px minimum height, visible focus outline, high text contrast.',
      },
    },
  },
};

export const FormIntegration: Story = {
  args: { size: 'md' },
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
          Name
        </label>
        <Input size="md" placeholder="Full name" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
          Email
        </label>
        <Input size="md" type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
          Message
        </label>
        <textarea
          placeholder="Your message..."
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '8px 16px',
            border: `4px solid ${theme.border}`,
            borderRadius: '0px',
            fontFamily: fontFamilies.body,
            fontSize: '14px',
            color: theme.input,
            backgroundColor: theme.inputBackground,
            boxSizing: 'border-box',
          }}
        />
      </div>
      <Button type="submit">SUBMIT</Button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example: Inputs integrated into a form layout.',
      },
    },
  },
};
