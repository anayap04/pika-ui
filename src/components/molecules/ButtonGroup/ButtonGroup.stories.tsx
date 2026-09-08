import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../../atoms/Button';

const meta = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: () => (
    <ButtonGroup orientation="horizontal">
      <Button variant="primary">Action 1</Button>
      <Button variant="secondary">Action 2</Button>
      <Button variant="accent">Action 3</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
      <Button variant="destructive">Delete</Button>
    </ButtonGroup>
  ),
};

export const SmallGap: Story = {
  args: { gap: 'sm', orientation: 'horizontal' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="sm">
      <Button size="sm" variant="primary">
        Save
      </Button>
      <Button size="sm" variant="secondary">
        Cancel
      </Button>
    </ButtonGroup>
  ),
};

export const MediumGap: Story = {
  args: { gap: 'md', orientation: 'horizontal' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="md">
      <Button variant="primary">Confirm</Button>
      <Button variant="secondary">Skip</Button>
    </ButtonGroup>
  ),
};

export const LargeGap: Story = {
  args: { gap: 'lg', orientation: 'horizontal' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="lg">
      <Button variant="accent">Vote Now</Button>
      <Button variant="secondary">View Results</Button>
    </ButtonGroup>
  ),
};

export const MixedSizes: Story = {
  args: { orientation: 'horizontal' },
  render: () => (
    <ButtonGroup orientation="horizontal">
      <Button size="sm" variant="secondary">
        Small
      </Button>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="lg" variant="accent">
        Large
      </Button>
    </ButtonGroup>
  ),
};

export const VotingActions: Story = {
  args: { orientation: 'horizontal', gap: 'md' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="md">
      <Button variant="primary">👧 Team Pink</Button>
      <Button variant="accent">👦 Team Blue</Button>
    </ButtonGroup>
  ),
};

export const NavigationButtons: Story = {
  args: { orientation: 'horizontal', gap: 'sm' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="sm">
      <Button size="sm" variant="secondary">
        ← Back
      </Button>
      <Button size="sm" variant="primary">
        Next →
      </Button>
    </ButtonGroup>
  ),
};

export const FormActions: Story = {
  args: { orientation: 'horizontal', gap: 'md' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="md">
      <Button variant="destructive">Clear Form</Button>
      <Button variant="secondary">Save Draft</Button>
      <Button variant="primary">Submit</Button>
    </ButtonGroup>
  ),
};

export const AllOrientations: Story = {

  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Horizontal</h3>
        <ButtonGroup orientation="horizontal" gap="md">
          <Button variant="primary">Button 1</Button>
          <Button variant="secondary">Button 2</Button>
          <Button variant="accent">Button 3</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3>Vertical</h3>
        <ButtonGroup orientation="vertical" gap="md" style={{ width: '200px' }}>
          <Button variant="primary">Button 1</Button>
          <Button variant="secondary">Button 2</Button>
          <Button variant="accent">Button 3</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};
