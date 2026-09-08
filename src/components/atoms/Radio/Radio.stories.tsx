import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { theme } from '../../../tokens';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible radio button input for mutually exclusive selections. Supports 3 sizes (sm, md, lg) with 44px minimum tap target (md/lg sizes). Includes proper ARIA attributes and label association.\n\n**Accessibility**: ✓ Native HTML radio with proper label association via htmlFor ✓ 44px minimum tap target (md/lg sizes; SC 2.5.8) ✓ Uses useId() for unique associations ✓ Visible focus outline (SC 2.4.7) ✓ Color contrast verified (primary color, WCAG 2.2 AAA) ✓ Proper name grouping for mutually exclusive options.\n\n**Testing**: Test all 3 sizes for tap target compliance. Verify label associations and name grouping. Confirm mutual exclusivity (only one selected per group). Validate disabled state. Check focus outline visibility. Test keyboard navigation (Arrow keys move selection, Space/Enter to select).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Optional label displayed next to radio button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Radio button size: sm (20px), md (44px), lg (56px)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable radio button and label',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Radio button checked state',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    label: 'Option 1',
    disabled: false,
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    size: 'md',
    label: 'Option selected',
    disabled: false,
    checked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small radio',
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large radio',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    label: 'Disabled option',
    disabled: true,
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    size: 'md',
    label: 'Disabled and selected',
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
      <Radio size="sm" label="Small (20px)" />
      <Radio size="md" label="Medium (44px) — default" />
      <Radio size="lg" label="Large (56px)" />
    </div>
  ),
};

export const RadioGroup: Story = {
  args: { size: 'md' },
  render: () => (
    <fieldset style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>
      <legend style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>
        Choose your prediction
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Radio name="prediction" value="girl" label="It will be a girl 👧" />
        <Radio name="prediction" value="boy" label="It will be a boy 👦" />
        <Radio name="prediction" value="surprise" label="Surprise me! 🎉" />
      </div>
    </fieldset>
  ),
};

export const VotingTeamSelection: Story = {
  args: { size: 'md' },
  render: () => (
    <fieldset style={{ border: '1px solid #000', padding: '24px', borderRadius: '0px' }}>
      <legend style={{ fontSize: '14px', fontWeight: '700', fontFamily: "'VT323', monospace", marginBottom: '16px' }}>
        CHOOSE YOUR TEAM
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Radio
          name="team"
          value="girl"
          label="EQUIPO NIÑA 👑 (31 votes, 61%)"
          checked={true}
        />
        <Radio name="team" value="boy" label="EQUIPO NIÑO (20 votes, 39%)" />
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
        <Radio size="md" label="Click or tap to select" />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          44×44px minimum (WCAG 2.2 SC 2.5.8)
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
          Focus Visible (Tab to see)
        </p>
        <Radio size="md" label="Tab to focus" autoFocus />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          Browser default focus ring visible
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
          Mutually Exclusive (name attribute)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Radio name="exclusive-demo" label="Option A" value="a" />
          <Radio name="exclusive-demo" label="Option B" value="b" />
        </div>
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: theme.mutedForeground }}>
          Use same name attribute for radio button groups
        </p>
      </div>
    </div>
  ),
};
