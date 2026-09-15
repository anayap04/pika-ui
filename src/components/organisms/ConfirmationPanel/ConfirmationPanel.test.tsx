import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationPanel } from './ConfirmationPanel';

describe('ConfirmationPanel', () => {
  it('greets the voter by name', () => {
    render(<ConfirmationPanel voterName="Danna" choiceLabel="Team Girl" />);
    expect(screen.getByText('Thanks, Danna')).toBeInTheDocument();
  });

  it('falls back to a nameless line when voterName is empty', () => {
    render(<ConfirmationPanel choiceLabel="Team Girl" />);
    expect(screen.getByText('Vote saved')).toBeInTheDocument();
    expect(screen.queryByText(/^Thanks,/)).toBeNull();
  });

  it('restates the choice in words, not colour alone', () => {
    render(<ConfirmationPanel voterName="Danna" choiceLabel="Team Girl" variant="primary" />);
    expect(screen.getByText('Team Girl')).toBeInTheDocument();
  });

  it('uses a status role for a saved vote', () => {
    render(<ConfirmationPanel voterName="Danna" choiceLabel="Team Girl" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('takes focus on its heading so the outcome is announced without hunting for it', () => {
    render(<ConfirmationPanel voterName="Danna" choiceLabel="Team Girl" />);
    expect(screen.getByText('Thanks, Danna')).toHaveFocus();
  });

  it('omits the reset button when onReset is not provided — never a dead button', () => {
    render(<ConfirmationPanel voterName="Danna" choiceLabel="Team Girl" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('fires onReset from the VOTE AGAIN button when provided', async () => {
    const onReset = vi.fn();
    render(<ConfirmationPanel voterName="Danna" choiceLabel="Team Girl" onReset={onReset} />);
    await userEvent.click(screen.getByRole('button', { name: /vote again/i }));
    expect(onReset).toHaveBeenCalledOnce();
  });

  it('uses an alert role and the NOT SAVED band for a failed write', () => {
    render(<ConfirmationPanel status="failed" onRetry={() => {}} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getAllByText('NOT SAVED').length).toBeGreaterThan(0);
  });

  it('renders the retry button only when onRetry is provided', async () => {
    const onRetry = vi.fn();
    const { rerender } = render(<ConfirmationPanel status="failed" onRetry={onRetry} />);
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledOnce();

    rerender(<ConfirmationPanel status="failed" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('appends the next-steps sentence when provided', () => {
    render(
      <ConfirmationPanel
        voterName="Danna"
        choiceLabel="Team Girl"
        nextStepsMessage="Your name now sits in the results below."
      />,
    );
    expect(screen.getByText(/your name now sits in the results below/i)).toBeInTheDocument();
  });
});
