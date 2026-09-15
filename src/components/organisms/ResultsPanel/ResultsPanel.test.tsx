import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ResultsPanel } from './ResultsPanel';

const tallies = [
  { id: 'girl', label: 'Team girl', count: 28, variant: 'primary' as const },
  { id: 'boy', label: 'Team boy', count: 20, variant: 'secondary' as const },
];

describe('ResultsPanel', () => {
  it('renders the title and total in the header', () => {
    render(<ResultsPanel tallies={tallies} />);
    expect(screen.getByText('Results')).toBeInTheDocument();
    // Also present in a visually-hidden aria-live announcer — see below.
    expect(screen.getAllByText('48 votes cast').length).toBeGreaterThan(0);
  });

  it('shows count and percentage together for each tally — never a bare percentage', () => {
    render(<ResultsPanel tallies={tallies} />);
    expect(screen.getByText(/28.*58%/)).toBeInTheDocument();
    expect(screen.getByText(/20.*42%/)).toBeInTheDocument();
  });

  it('exposes each bar as a labelled native progress element', () => {
    render(<ResultsPanel tallies={tallies} />);
    const girlBar = screen.getByRole('progressbar', { name: 'Team girl' });
    expect(girlBar).toHaveAttribute('value', '58');
    expect(girlBar).toHaveAttribute('max', '100');
  });

  it('shows the empty state and keeps both tracks visible when there are no votes', () => {
    render(
      <ResultsPanel
        tallies={[
          { id: 'girl', label: 'Team girl', count: 0, variant: 'primary' },
          { id: 'boy', label: 'Team boy', count: 0, variant: 'secondary' },
        ]}
      />,
    );
    expect(screen.getByText('No votes yet')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('supports a custom empty label', () => {
    render(
      <ResultsPanel
        tallies={[
          { id: 'a', label: 'A', count: 0, variant: 'primary' },
          { id: 'b', label: 'B', count: 0, variant: 'secondary' },
        ]}
        emptyLabel="Nobody has voted"
      />,
    );
    expect(screen.getByText('Nobody has voted')).toBeInTheDocument();
  });

  it('hides the leader line below minSample', () => {
    render(
      <ResultsPanel
        tallies={[
          { id: 'girl', label: 'Team girl', count: 1, variant: 'primary' },
          { id: 'boy', label: 'Team boy', count: 1, variant: 'secondary' },
        ]}
        minSample={3}
      />,
    );
    expect(screen.queryByText(/leads|tie/i)).toBeNull();
  });

  it('announces the leader once minSample is reached', () => {
    render(<ResultsPanel tallies={tallies} minSample={3} />);
    expect(screen.getByText('Team girl leads')).toBeInTheDocument();
  });

  it('reads "It\'s a tie" when the top tallies are equal', () => {
    render(
      <ResultsPanel
        tallies={[
          { id: 'girl', label: 'Team girl', count: 5, variant: 'primary' },
          { id: 'boy', label: 'Team boy', count: 5, variant: 'secondary' },
        ]}
      />,
    );
    expect(screen.getByText("It's a tie")).toBeInTheDocument();
  });

  it('supports 2 to 4 tallies', () => {
    render(
      <ResultsPanel
        tallies={[
          { id: 'a', label: 'A', count: 10, variant: 'primary' },
          { id: 'b', label: 'B', count: 8, variant: 'secondary' },
          { id: 'c', label: 'C', count: 4, variant: 'accent' },
          { id: 'd', label: 'D', count: 2, variant: 'destructive' },
        ]}
      />,
    );
    expect(screen.getByText('A leads')).toBeInTheDocument();
    expect(screen.getAllByRole('progressbar')).toHaveLength(4);
  });

  it('warns in dev outside the 2-4 tally range', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ResultsPanel tallies={[{ id: 'a', label: 'A', count: 1, variant: 'primary' }]} />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('expects 2 to 4 tallies'));
    warn.mockRestore();
  });

  it('skips the batched announcement entirely when announce is false', () => {
    render(<ResultsPanel tallies={tallies} announce={false} />);
    // Only the visible header total renders — no hidden live-region echo.
    expect(screen.getAllByText('48 votes cast')).toHaveLength(1);
  });

  describe('batched live-region announcements', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('batches a second update inside the 5s window instead of announcing immediately', () => {
      const { rerender } = render(<ResultsPanel tallies={tallies} />);
      expect(screen.getAllByText('48 votes cast')).toHaveLength(2);

      rerender(
        <ResultsPanel
          tallies={[
            { id: 'girl', label: 'Team girl', count: 30, variant: 'primary' },
            { id: 'boy', label: 'Team boy', count: 20, variant: 'secondary' },
          ]}
        />,
      );
      // The visible header total updates immediately; only the hidden
      // live-region echo is still batched — it hasn't fired yet.
      expect(screen.getAllByText('50 votes cast')).toHaveLength(1);

      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(screen.getAllByText('50 votes cast')).toHaveLength(2);
    });
  });
});
