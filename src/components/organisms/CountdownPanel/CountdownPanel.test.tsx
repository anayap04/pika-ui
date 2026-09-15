import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CountdownPanel } from './CountdownPanel';

describe('CountdownPanel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-12-10T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders zero-padded digit blocks for every unit in the target delta', () => {
    render(<CountdownPanel target="2025-12-14T07:11:26Z" />);
    expect(screen.getByText('04')).toBeInTheDocument();
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('07')).toBeInTheDocument();
    expect(screen.getByText('Hrs')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('26')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders only the requested units', () => {
    render(<CountdownPanel target="2025-12-10T01:00:00Z" units={['h', 'm']} />);
    expect(screen.getByText('Hrs')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.queryByText('Days')).toBeNull();
    expect(screen.queryByText('Sec')).toBeNull();
  });

  it('shows the absolute-date caption', () => {
    render(<CountdownPanel target="2025-12-14T04:00:00Z" caption="December 14, 2025 · 4:00 PM" />);
    expect(screen.getByText('December 14, 2025 · 4:00 PM')).toBeInTheDocument();
  });

  it('ticks the displayed values down every second', () => {
    render(<CountdownPanel target="2025-12-10T00:00:05Z" units={['s']} />);
    expect(screen.getByText('05')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('is aria-live="off" while running and flips to "polite" once expired', () => {
    render(<CountdownPanel target="2025-12-10T00:00:02Z" units={['s']} />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-live', 'off');
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByRole('group')).toHaveAttribute('aria-live', 'polite');
  });

  it('never leaves four zeroes on screen — falls back to a message at expiry', () => {
    render(<CountdownPanel target="2025-12-10T00:00:01Z" />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('00')).toBeNull();
    expect(screen.getByText(/time.?s up/i)).toBeInTheDocument();
  });

  it('renders a custom expiredSlot instead of the default message', () => {
    render(
      <CountdownPanel target="2025-12-10T00:00:01Z" expiredSlot={<span>Voting is open</span>} />,
    );
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Voting is open')).toBeInTheDocument();
  });

  it('calls onExpire exactly once when the countdown reaches zero', () => {
    const onExpire = vi.fn();
    render(<CountdownPanel target="2025-12-10T00:00:01Z" onExpire={onExpire} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onExpire).toHaveBeenCalledOnce();
  });

  it('switches the digit border to destructive once under the urgent threshold', () => {
    render(<CountdownPanel target="2025-12-10T00:00:30Z" units={['s']} urgentAt={60} />);
    const block = screen.getByText('30').parentElement as HTMLElement;
    expect(block).toHaveStyle({ border: '4px solid var(--pk-destructive-strong, #99002a)' });
  });

  it('treats an unparsable target as already-expired rather than showing NaN', () => {
    render(<CountdownPanel target="not-a-date" />);
    expect(screen.queryByText(/nan/i)).toBeNull();
  });

  it('accepts a Date object target, not just an ISO string', () => {
    render(<CountdownPanel target={new Date('2025-12-10T00:00:10Z')} units={['s']} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
