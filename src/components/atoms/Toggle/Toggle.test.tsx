import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders a switch-role checkbox', () => {
    render(<Toggle />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('links a rendered label via a generated id', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument();
  });

  it('honours an explicit id', () => {
    render(<Toggle id="dm" label="DM" />);
    expect(screen.getByLabelText('DM')).toHaveAttribute('id', 'dm');
  });

  it('omits the trailing label when none is given', () => {
    render(<Toggle />);
    expect(screen.queryByText('Dark mode')).toBeNull();
  });

  it('reflects the checked prop via aria-checked and fires onChange', async () => {
    const onChange = vi.fn();
    render(<Toggle label="On" checked onChange={onChange} />);
    const input = screen.getByRole('switch');
    expect(input).toBeChecked();
    expect(input).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(input);
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('renders an unchecked toggle by default', () => {
    render(<Toggle label="Off" />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('renders the sm size variant', () => {
    render(<Toggle size="sm" label="Small" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders a disabled toggle', () => {
    render(<Toggle label="Locked" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
