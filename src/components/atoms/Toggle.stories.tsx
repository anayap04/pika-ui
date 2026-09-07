import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible toggle switch for binary on/off selections. Supports 2 sizes (sm, md) with 44px minimum tap target (md size). Includes proper role="switch" and aria-checked attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Optional label displayed next to toggle',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Toggle size: sm (compact) or md (default with 44px tap target)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable toggle',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Toggle on/off state',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    size: 'md',
    label: 'Dark mode',
    disabled: false,
    checked: false,
  },
};

export const On: Story = {
  args: {
    size: 'md',
    label: 'Dark mode',
    disabled: false,
    checked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Enable notifications',
    disabled: false,
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    label: 'Unavailable feature',
    disabled: true,
    checked: false,
  },
};

export const DisabledOn: Story = {
  args: {
    size: 'md',
    label: 'Required setting (locked)',
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
      <Toggle size="sm" label="Small toggle" />
      <Toggle size="md" label="Medium toggle (44px tap target)" />
    </div>
  ),
};

export const AllStates: Story = {
  args: { size: 'md' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '700' }}>Off</p>
        <Toggle checked={false} label="Disabled" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '700' }}>On</p>
        <Toggle checked={true} label="Enabled" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '700' }}>Disabled Off</p>
        <Toggle checked={false} disabled label="Locked" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '700' }}>Disabled On</p>
        <Toggle checked={true} disabled label="Locked" />
      </div>
    </div>
  ),
};

export const SettingsPanel: Story = {
  args: { size: 'md' },
  render: () => (
    <div
      style={{
        border: '1px solid #000',
        padding: '24px',
        borderRadius: '0px',
        width: '300px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '700', fontFamily: "'VT323', monospace" }}>
        SETTINGS
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle label="Dark Mode" checked={false} />
        <Toggle label="Sound Effects" checked={true} />
        <Toggle label="Notifications" checked={true} />
        <Toggle label="Analytics" checked={false} />
      </div>
    </div>
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
        <Toggle size="md" label="Click or tap to toggle" />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: '#666' }}>
          44px height minimum (WCAG 2.2 SC 2.5.8)
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
          Focus Visible (Tab to see)
        </p>
        <Toggle size="md" label="Tab to focus" autoFocus />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: '#666' }}>
          Proper focus handling with outline
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
          ARIA Attributes (role="switch", aria-checked)
        </p>
        <Toggle size="md" label="Screen reader friendly" />
        <p style={{ margin: '12px 0 0 0', fontSize: '11px', color: '#666' }}>
          Proper switch role and aria-checked state (WCAG 2.2 SC 4.1.2)
        </p>
      </div>
    </div>
  ),
};
