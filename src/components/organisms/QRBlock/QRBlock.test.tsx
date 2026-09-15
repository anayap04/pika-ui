import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QRBlock } from './QRBlock';

describe('QRBlock', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the caption as the figure caption', () => {
    render(<QRBlock url="https://example.com/live" caption="Watching from abroad?" />);
    expect(screen.getByText('Watching from abroad?')).toBeInTheDocument();
  });

  it('exposes the code as a labelled image, never a bare graphic', () => {
    render(<QRBlock url="https://example.com/live" destination="Opens the livestream." />);
    expect(screen.getByRole('img', { name: /qr code to opens the livestream/i })).toBeInTheDocument();
  });

  it('always ships the fallback link as a real, tappable Button', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<QRBlock url="https://example.com/live" actionLabel="OPEN LINK" />);
    await userEvent.click(screen.getByRole('button', { name: 'OPEN LINK' }));
    expect(openSpy).toHaveBeenCalledWith('https://example.com/live', '_blank', 'noopener,noreferrer');
  });

  it('shows the plain-language destination line', () => {
    render(<QRBlock url="https://example.com/live" destination="Opens the livestream. 7:00 PM Mexico City." />);
    expect(screen.getByText('Opens the livestream. 7:00 PM Mexico City.')).toBeInTheDocument();
  });

  it('dims the code and removes the action when expired', () => {
    render(<QRBlock url="https://example.com/live" expired />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('This code is no longer active.')).toBeInTheDocument();
  });

  it('shows a custom expired message when one is passed', () => {
    render(<QRBlock url="https://example.com/live" expired="The stream has ended." />);
    expect(screen.getByText('The stream has ended.')).toBeInTheDocument();
  });

  it('renders a compact icon + text layout at size="sm" with no fallback button', () => {
    render(<QRBlock url="https://example.com/live" size="sm" caption="Scan to join live" />);
    expect(screen.getByText('Scan to join live')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('shows the expired message instead of the caption at size="sm"', () => {
    render(<QRBlock url="https://example.com/live" size="sm" expired="The stream has ended." />);
    expect(screen.getByText('The stream has ended.')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
