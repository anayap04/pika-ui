import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tags';

const meta = {
  title: 'Atoms/Tags',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tag component for displaying labels, categories, or removable items. Supports 5 color variants, optional icons, and removable functionality with close button.\n\n**Accessibility**: ✓ Inline display with flex layout for proper text flow ✓ Color contrast verified for all 5 variants (WCAG AA) ✓ Remove button has aria-label for clarity ✓ Keyboard accessible close button (optional) ✓ Uses VT323 monospace for consistent styling.\n\n**Testing**: Verify all 5 color variants render correctly. Test removable tag with close button interaction. Confirm optional icon rendering. Validate color contrast ratios per variant. Check close button aria-label and accessibility. Test keyboard focus on close button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Tag label text (required)',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'destructive', 'muted'],
      description: 'Tag color variant',
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Show close (×) button for removal',
    },
    icon: {
      control: { type: 'text' },
      description: 'Optional icon/emoji displayed before label',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Tag Label',
    variant: 'primary',
    removable: false,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Team Girl',
    variant: 'primary',
    icon: '👑',
    removable: false,
  },
};

export const Removable: Story = {
  args: {
    label: 'Removable Tag',
    variant: 'primary',
    removable: true,
  },
};

export const RemovableWithIcon: Story = {
  args: {
    label: 'Remove Me',
    variant: 'accent',
    icon: '⚡',
    removable: true,
    onRemove: () => alert('Tag removed!'),
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    removable: false,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    removable: false,
  },
};

export const Accent: Story = {
  args: {
    label: 'Accent',
    variant: 'accent',
    removable: false,
  },
};

export const Destructive: Story = {
  args: {
    label: 'Destructive',
    variant: 'destructive',
    removable: false,
  },
};

export const Muted: Story = {
  args: {
    label: 'Muted',
    variant: 'muted',
    removable: false,
  },
};

export const AllVariants: Story = {
  args: { label: 'Tag', removable: false },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Tag label="Primary" variant="primary" />
      <Tag label="Secondary" variant="secondary" />
      <Tag label="Accent" variant="accent" />
      <Tag label="Destructive" variant="destructive" />
      <Tag label="Muted" variant="muted" />
    </div>
  ),
};

export const AllVariantsRemovable: Story = {
  args: { label: 'Tag', removable: true, onRemove: () => {} },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Tag label="Primary" variant="primary" removable onRemove={() => {}} />
      <Tag label="Secondary" variant="secondary" removable onRemove={() => {}} />
      <Tag label="Accent" variant="accent" removable onRemove={() => {}} />
      <Tag label="Destructive" variant="destructive" removable onRemove={() => {}} />
      <Tag label="Muted" variant="muted" removable onRemove={() => {}} />
    </div>
  ),
};

export const TagCloud: Story = {
  args: { label: 'Tag' },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', width: '400px' }}>
      <Tag label="React" icon="⚛️" />
      <Tag label="TypeScript" icon="📘" />
      <Tag label="Storybook" icon="📚" />
      <Tag label="Testing" icon="✅" />
      <Tag label="Accessibility" icon="♿" />
    </div>
  ),
};

export const VotingAppTags: Story = {
  args: { label: 'Tag' },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tag label="EQUIPO NIÑA" variant="primary" icon="👑" removable onRemove={() => {}} />
      <Tag label="EQUIPO NIÑO" variant="secondary" icon="🎉" removable onRemove={() => {}} />
      <Tag label="PENDING" variant="muted" />
      <Tag label="ERROR" variant="destructive" />
    </div>
  ),
};

export const RemovableList: Story = {
  args: { label: 'Tag', removable: true },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700' }}>
        Click × to remove tags
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tag label="JavaScript" removable onRemove={() => {}} />
        <Tag label="Python" removable onRemove={() => {}} />
        <Tag label="Rust" removable onRemove={() => {}} />
        <Tag label="Go" removable onRemove={() => {}} />
      </div>
    </div>
  ),
};
