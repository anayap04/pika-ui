import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup, type CheckboxGroupProps } from './CheckboxGroup';
import { useState } from 'react';

const meta = {
  title: 'Molecules/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledCheckboxGroup = (props: CheckboxGroupProps) => {
  const [values, setValues] = useState<string[]>([]);
  return <CheckboxGroup {...props} values={values} onChange={setValues} />;
};

export const Default: Story = {
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const MediumSize: Story = {
  args: {
    size: 'md',
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const WithDisabled: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const GiftSelections: Story = {
  args: {
    options: [
      { value: 'stroller', label: '🛒 Stroller' },
      { value: 'crib', label: '🛏️ Crib' },
      { value: 'clothes', label: '👕 Baby Clothes' },
      { value: 'diapers', label: '🧷 Diapers' },
    ],
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const ActivityChoices: Story = {
  args: {
    options: [
      { value: 'games', label: '🎮 Games' },
      { value: 'prizes', label: '🎁 Prizes' },
      { value: 'food', label: '🍰 Food & Cake' },
      { value: 'music', label: '🎵 Music & Dancing' },
    ],
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const PreferenceSelection: Story = {
  args: {
    options: [
      { value: 'email', label: 'Email notifications' },
      { value: 'sms', label: 'Text message updates' },
      { value: 'reminders', label: 'Event reminders' },
    ],
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

export const Perks: Story = {
  args: {
    values: [],
    options: [
      { value: 'sfx', label: 'Sound effects' },
      { value: 'crt', label: 'CRT overlay' },
    ],
  },
  render: (args) => <ControlledCheckboxGroup {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Fully controlled multi-selection: each change returns the complete next values array.',
      },
    },
  },
};

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Small</h3>
        <ControlledCheckboxGroup
          size="sm"
          options={[
            { value: 'a', label: 'Small A' },
            { value: 'b', label: 'Small B' },
          ]}
        />
      </div>
      <div>
        <h3>Medium</h3>
        <ControlledCheckboxGroup
          size="md"
          options={[
            { value: 'a', label: 'Medium A' },
            { value: 'b', label: 'Medium B' },
          ]}
        />
      </div>
      <div>
        <h3>Large</h3>
        <ControlledCheckboxGroup
          size="lg"
          options={[
            { value: 'a', label: 'Large A' },
            { value: 'b', label: 'Large B' },
          ]}
        />
      </div>
    </div>
  ),
};
