import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';
import { FormField } from '../FormField';
import { useState } from 'react';

const meta = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    name: 'choice',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledRadioGroup = (props: RadioGroupProps) => {
  const [value, setValue] = useState<string>('');
  return <RadioGroup {...props} value={value} onChange={setValue} />;
};

const ControlledRadioGroupField = (props: RadioGroupProps) => {
  const [value, setValue] = useState<string>('');
  return (
    <FormField label="Team">
      <RadioGroup {...props} value={value} onChange={setValue} />
    </FormField>
  );
};

export const Default: Story = {
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const MediumSize: Story = {
  args: {
    size: 'md',
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const WithDisabled: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const VotingTeamSelection: Story = {
  args: {
    name: 'team',
    options: [
      { value: 'team-pink', label: '👰 Team: Pink' },
      { value: 'team-blue', label: '🤰 Team: Blue' },
    ],
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const TeamField: Story = {
  args: {
    name: 'team',
    options: [
      { value: 'pink', label: 'Team Pink' },
      { value: 'blue', label: 'Team Blue' },
    ],
  },
  render: (args) => (
    <ControlledRadioGroupField {...args} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Controlled single selection with a visible FormField label; size changes the group gap, not the radio control.',
      },
    },
  },
};

export const GenderGuessSelection: Story = {
  args: {
    name: 'guess',
    options: [
      { value: 'girl', label: '👧 Girl' },
      { value: 'boy', label: '👦 Boy' },
      { value: 'no-guess', label: '❓ Not guessing' },
    ],
  },
  render: (args) => <ControlledRadioGroup {...args} />,
};

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Small</h3>
        <ControlledRadioGroup
          name="size-sm"
          size="sm"
          options={[
            { value: 'a', label: 'Small A' },
            { value: 'b', label: 'Small B' },
          ]}
        />
      </div>
      <div>
        <h3>Medium</h3>
        <ControlledRadioGroup
          name="size-md"
          size="md"
          options={[
            { value: 'a', label: 'Medium A' },
            { value: 'b', label: 'Medium B' },
          ]}
        />
      </div>
      <div>
        <h3>Large</h3>
        <ControlledRadioGroup
          name="size-lg"
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
