import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { theme } from '../../../tokens';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible checkbox input with optional label. Supports 3 sizes (sm, md, lg) with 44px minimum tap target (md/lg sizes). Includes proper ARIA attributes and focus handling.\n\n**Accessibility**: ✓ Native HTML checkbox with proper labeling via htmlFor ✓ 44px minimum tap target (md/lg sizes; sc 2.5.8) ✓ Uses useId() for unique label associations ✓ Visible focus outline (SC 2.4.7) ✓ Color contrast verified (primary color on white, WCAG 2.2 AAA).\n\n**Testing**: Test all 3 sizes and tap target compliance. Verify label association using DevTools. Confirm checked/unchecked state changes. Validate disabled state. Check focus outline visibility. Test keyboard navigation (Space to toggle, Tab to focus).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Optional label displayed next to checkbox',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size: sm (20px), md (44px), lg (56px)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable checkbox and label',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Checkbox checked state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    label: 'Agree to terms',
    disabled: false,
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    size: 'md',
    label: 'Agree to terms',
    disabled: false,
    checked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Remember me',
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large checkbox',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    label: 'Disabled checkbox',
    disabled: true,
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    size: 'md',
    label: 'Disabled and checked',
    disabled: true,
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    size: 'md',
    disabled: false,
    checked: false,
  },
};

export const AllSizes: Story = {
  args: { disabled: false },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="sm" label="Small (20px)" />
      <Checkbox size="md" label="Medium (44px) — default" />
      <Checkbox size="lg" label="Large (56px)" />
    </div>
  ),
};

export const CheckboxGroup: Story = {
  args: { size: 'md' },
  render: () => (
    <fieldset style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>
      <legend style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>
        Which team do you think it will be?
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox label="Team Girl" name="team" value="girl" />
        <Checkbox label="Team Boy" name="team" value="boy" />
        <Checkbox label="Surprise me!" name="team" value="surprise" />
      </div>
    </fieldset>
  ),
};

export const Accessibility: Story = {
  args: { size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
          Tap Target Size (44px min)
        </p>
        <Checkbox size="md" label="Click or tap to check" />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          44×44px minimum (WCAG 2.2 SC 2.5.8)
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
          Focus Visible (Tab to see)
        </p>
        <Checkbox size="md" label="Tab to focus" autoFocus />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          Browser default focus ring visible
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
          Label Association
        </p>
        <Checkbox size="md" label="Click label to toggle" id="demo-checkbox" />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          Clicking label toggles checkbox (proper htmlFor association)
        </p>
      </div>
    </div>
  ),
};
