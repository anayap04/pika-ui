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
  args: { orientation: 'horizontal', gap: 'md' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="md">
      <Button variant="primary">SAVE</Button>
      <Button variant="secondary">CANCEL</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="primary">SAVE</Button>
      <Button variant="secondary">CANCEL</Button>
      <Button variant="destructive">DELETE</Button>
    </ButtonGroup>
  ),
};

export const SmallGap: Story = {
  args: { gap: 'sm', orientation: 'horizontal' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="sm">
      <Button size="sm" variant="primary">
        SAVE
      </Button>
      <Button size="sm" variant="secondary">
        CANCEL
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
      <Button variant="accent">VOTE NOW</Button>
      <Button variant="secondary">RESULTS</Button>
    </ButtonGroup>
  ),
};

export const MixedSizes: Story = {
  args: { orientation: 'horizontal' },
  render: () => (
    <ButtonGroup orientation="horizontal">
      <Button size="sm" variant="secondary">
        SMALL
      </Button>
      <Button size="md" variant="primary">
        MEDIUM
      </Button>
      <Button size="lg" variant="accent">
        LARGE
      </Button>
    </ButtonGroup>
  ),
};

export const VotingActions: Story = {
  args: { orientation: 'horizontal', gap: 'md' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="md">
      <Button variant="primary">TEAM PINK</Button>
      <Button variant="accent">TEAM BLUE</Button>
    </ButtonGroup>
  ),
};

export const NavigationButtons: Story = {
  args: { orientation: 'horizontal', gap: 'sm' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="sm">
      <Button size="sm" variant="secondary">
        BACK
      </Button>
      <Button size="sm" variant="primary">
        NEXT
      </Button>
    </ButtonGroup>
  ),
};

export const FormActions: Story = {
  args: { orientation: 'horizontal', gap: 'md' },
  render: () => (
    <ButtonGroup orientation="horizontal" gap="md">
      <Button variant="destructive">CLEAR</Button>
      <Button variant="secondary">SAVE DRAFT</Button>
      <Button variant="primary">SUBMIT</Button>
    </ButtonGroup>
  ),
};

export const AllOrientations: Story = {

  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Horizontal</h3>
        <ButtonGroup orientation="horizontal" gap="md">
          <Button variant="primary">ONE</Button>
          <Button variant="secondary">TWO</Button>
          <Button variant="accent">THREE</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3>Vertical</h3>
        <ButtonGroup orientation="vertical" gap="md" style={{ width: '200px' }}>
          <Button variant="primary">ONE</Button>
          <Button variant="secondary">TWO</Button>
          <Button variant="accent">THREE</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};
