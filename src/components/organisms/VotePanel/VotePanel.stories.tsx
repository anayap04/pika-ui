import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VotePanel } from './VotePanel';

const options = [
  { id: 'girl', label: 'TEAM GIRL', variant: 'primary' as const },
  { id: 'boy', label: 'TEAM BOY', variant: 'secondary' as const },
];

const meta = {
  title: 'Organisms/VotePanel',
  component: VotePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A name field and two team choices, where the choice is the submit — one tap casts the vote, no separate submit button.',
      },
    },
  },
} satisfies Meta<typeof VotePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { options, onVote: () => {} },
  render: () => {
    function Demo() {
      const [name, setName] = useState('');
      return (
        <VotePanel
          options={options}
          name={name}
          onNameChange={setName}
          onVote={(id, voter) => alert(`${voter || 'Anonymous'} voted for ${id}`)}
        />
      );
    }
    return <Demo />;
  },
};

export const Locked: Story = {
  args: { options, onVote: () => {} },
};

export const Pending: Story = {
  args: { options, onVote: () => {}, name: 'Danna', pending: true },
};

export const WithError: Story = {
  args: { options, onVote: () => {}, name: 'Danna', error: 'The vote did not save — try again.' },
};

export const NoNameRequired: Story = {
  args: { options, onVote: () => {}, requireName: false },
};
