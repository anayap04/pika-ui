import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
import { Input } from '../../atoms/Input';
import { Checkbox } from '../../atoms/Checkbox';
import { Radio } from '../../atoms/Radio';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof FormField>;

export const BasicInput: Story = {
  render: () => (
    <FormField label="Email Address">
      <Input placeholder="Enter your email" />
    </FormField>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormField label="Password" hint="Must be at least 8 characters">
      <Input type="password" placeholder="Enter password" />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField label="Full Name" required>
      <Input placeholder="Enter your full name" />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField label="Username" error="Username already taken" required>
      <Input placeholder="Choose a username" />
    </FormField>
  ),
};

export const CheckboxField: Story = {
  render: () => (
    <FormField label="Notifications">
      <Checkbox label="Send me email notifications" />
    </FormField>
  ),
};

export const RadioField: Story = {
  render: () => (
    <FormField label="Choose your option">
      <Radio label="Option A" name="choice" />
    </FormField>
  ),
};

export const DisabledField: Story = {
  render: () => (
    <FormField label="Locked Field">
      <Input placeholder="This field is disabled" disabled />
    </FormField>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <FormField label="Email" required>
        <Input placeholder="your@email.com" />
      </FormField>
      <FormField label="Password" required hint="At least 8 characters">
        <Input type="password" placeholder="Enter password" />
      </FormField>
      <FormField label="Accept Terms" required>
        <Checkbox label="I accept the terms and conditions" />
      </FormField>
    </div>
  ),
};

export const LabelVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <FormField label="Simple Label">
        <Input placeholder="Basic field" />
      </FormField>
      <FormField label="Required Field" required>
        <Input placeholder="Must fill this" />
      </FormField>
      <FormField label="With Hint" hint="Enter a valid email address">
        <Input placeholder="email@example.com" />
      </FormField>
      <FormField label="With Error" error="This field has an error">
        <Input placeholder="Something went wrong" />
      </FormField>
    </div>
  ),
};

// Dark theme variants
export const BasicInputDark: Story = {
  render: () => (
    <FormField label="Email Address">
      <Input placeholder="Enter your email" />
    </FormField>
  ),
  parameters: {
    globals: {
      theme: 'dark',
    },
  },
};

export const WithHintDark: Story = {
  render: () => (
    <FormField label="Password" hint="Must be at least 8 characters">
      <Input type="password" placeholder="Enter password" />
    </FormField>
  ),
  parameters: {
    globals: {
      theme: 'dark',
    },
  },
};

export const WithErrorDark: Story = {
  render: () => (
    <FormField label="Username" error="Username already taken" required>
      <Input placeholder="Choose a username" />
    </FormField>
  ),
  parameters: {
    globals: {
      theme: 'dark',
    },
  },
};

export const FormExampleDark: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <FormField label="Email" required>
        <Input placeholder="your@email.com" />
      </FormField>
      <FormField label="Password" required hint="At least 8 characters">
        <Input type="password" placeholder="Enter password" />
      </FormField>
      <FormField label="Accept Terms" required>
        <Checkbox label="I accept the terms and conditions" />
      </FormField>
    </div>
  ),
  parameters: {
    globals: {
      theme: 'dark',
    },
  },
};
