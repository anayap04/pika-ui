import { render, screen, userEvent } from 'vitest/browser';
import { expect, it, describe, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with default props', () => {
    render(<Toggle />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Toggle label="Dark Mode" />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('has role="switch" for accessibility', () => {
    render(<Toggle />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('role', 'switch');
  });

  it('has aria-checked attribute reflecting checked state', () => {
    render(<Toggle checked={true} />);
    const toggle = screen.getByRole('switch') as HTMLInputElement;
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('handles checked state', async () => {
    render(<Toggle />);
    const toggle = screen.getByRole('switch') as HTMLInputElement;
    expect(toggle.checked).toBe(false);

    await userEvent.click(toggle);
    expect(toggle.checked).toBe(true);
  });

  it('handles disabled state', () => {
    render(<Toggle disabled label="Unavailable" />);
    const toggle = screen.getByRole('switch') as HTMLInputElement;
    expect(toggle.disabled).toBe(true);
  });

  it('applies size styles correctly', () => {
    const { rerender } = render(<Toggle size="sm" />);
    let toggle = screen.getByRole('switch') as HTMLInputElement;
    let label = toggle.parentElement?.querySelector('label');
    expect(label).toHaveStyle({ width: '40px', height: '24px' });

    rerender(<Toggle size="md" />);
    toggle = screen.getByRole('switch') as HTMLInputElement;
    label = toggle.parentElement?.querySelector('label');
    expect(label).toHaveStyle({ width: '56px', height: '32px' });
  });

  it('has min tap target size (44px) for md size', () => {
    render(<Toggle size="md" />);
    const toggle = screen.getByRole('switch');
    const container = toggle.closest('div[style*="minHeight"]');
    expect(container).toHaveStyle('minHeight: 44px');
  });

  it('animates toggle thumb position on state change', async () => {
    render(<Toggle size="md" />);
    const toggle = screen.getByRole('switch');
    const label = toggle.parentElement?.querySelector('label');

    const initialThumb = label?.querySelector('div');
    const initialLeft = window.getComputedStyle(initialThumb!).left;

    await userEvent.click(toggle);

    const newThumb = label?.querySelector('div');
    const newLeft = window.getComputedStyle(newThumb!).left;

    expect(initialLeft).not.toEqual(newLeft);
  });

  it('calls onChange when toggled', async () => {
    const handleChange = vi.fn();
    render(<Toggle onChange={handleChange} />);
    const toggle = screen.getByRole('switch');

    await userEvent.click(toggle);
    expect(handleChange).toHaveBeenCalled();
  });

  it('accepts HTML input attributes', () => {
    render(<Toggle id="test-toggle" name="test-toggle" />);
    const toggle = screen.getByRole('switch') as HTMLInputElement;
    expect(toggle.id).toBe('test-toggle');
    expect(toggle.name).toBe('test-toggle');
  });

  it('supports custom className via style prop', () => {
    render(<Toggle style={{ opacity: 0.5 }} />);
    const container = screen.getByRole('switch').closest('div[style*="opacity"]');
    expect(container).toHaveStyle({ opacity: '0.5' });
  });
});
