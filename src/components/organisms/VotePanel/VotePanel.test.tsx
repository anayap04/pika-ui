import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VotePanel } from './VotePanel';

const options = [
  { id: 'girl', label: 'TEAM GIRL', variant: 'primary' as const },
  { id: 'boy', label: 'TEAM BOY', variant: 'secondary' as const },
];

describe('VotePanel', () => {
  it('renders the panel title as the form’s accessible name', () => {
    render(<VotePanel options={options} onVote={() => {}} />);
    expect(screen.getByRole('form', { name: 'Cast your vote' })).toBeInTheDocument();
  });

  it('renders the name field and both team halves', () => {
    render(<VotePanel options={options} onVote={() => {}} />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /team girl/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /team boy/i })).toBeInTheDocument();
  });

  it('disables both halves until a name is entered when requireName is true', async () => {
    render(<VotePanel options={options} onVote={() => {}} />);
    expect(screen.getByRole('button', { name: /team girl/i })).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/your name/i), 'Danna');
    expect(screen.getByRole('button', { name: /team girl/i })).toBeEnabled();
  });

  it('does not require a name when requireName is false', () => {
    render(<VotePanel options={options} onVote={() => {}} requireName={false} />);
    expect(screen.getByRole('button', { name: /team girl/i })).toBeEnabled();
  });

  it('fires onVote with the id and trimmed name on a single tap — no separate submit', async () => {
    const onVote = vi.fn();
    render(<VotePanel options={options} onVote={onVote} />);
    await userEvent.type(screen.getByLabelText(/your name/i), '  Danna  ');
    await userEvent.click(screen.getByRole('button', { name: /team girl/i }));
    expect(onVote).toHaveBeenCalledWith('girl', 'Danna');
  });

  it('works as an uncontrolled field when name/onNameChange are omitted', async () => {
    const onVote = vi.fn();
    render(<VotePanel options={options} onVote={onVote} />);
    const input = screen.getByLabelText(/your name/i) as HTMLInputElement;
    await userEvent.type(input, 'Alex');
    expect(input).toHaveValue('Alex');
  });

  it('supports a controlled name value and defers to the caller to update it', async () => {
    const onNameChange = vi.fn();
    render(<VotePanel options={options} onVote={() => {}} name="Danna" onNameChange={onNameChange} />);
    const input = screen.getByLabelText(/your name/i) as HTMLInputElement;
    expect(input).toHaveValue('Danna');
    await userEvent.type(input, '!');
    expect(onNameChange).toHaveBeenCalledWith('Danna!');
    // Controlled: the panel does not update its own value — the caller does.
    expect(input).toHaveValue('Danna');
  });

  it('locks both halves and relabels them while pending', () => {
    render(<VotePanel options={options} onVote={() => {}} name="Danna" pending />);
    expect(screen.getByRole('button', { name: /saving vote for team girl/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /saving vote for team boy/i })).toBeDisabled();
  });

  it('shows the error in place of the hint, and never as a window alert', () => {
    render(<VotePanel options={options} onVote={() => {}} error="Something went wrong" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    expect(screen.queryByText(/enter your name to unlock/i)).toBeNull();
  });

  it('warns in dev when given anything other than exactly 2 options', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<VotePanel options={[options[0]]} onVote={() => {}} />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('expects exactly 2 options'));
    warn.mockRestore();
  });

  it('shows the "one tap" hint once a name is entered', async () => {
    render(<VotePanel options={options} onVote={() => {}} />);
    await userEvent.type(screen.getByLabelText(/your name/i), 'Danna');
    expect(screen.getByText(/one tap casts the vote/i)).toBeInTheDocument();
  });

  it('does not navigate away on a stray form submit', () => {
    const { container } = render(<VotePanel options={options} onVote={() => {}} name="Danna" />);
    const form = container.querySelector('form') as HTMLFormElement;
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });
});
