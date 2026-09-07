import { render, screen, userEvent } from 'vitest/browser';
import { expect, it, describe } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Checkbox label="Agree to terms" />);
    expect(screen.getByText('Agree to terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('associates label with checkbox via htmlFor', () => {
    render(<Checkbox label="Test Label" id="test-checkbox" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.id).toBe('test-checkbox');
  });

  it('handles checked state', async () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('handles disabled state', () => {
    render(<Checkbox disabled label="Disabled" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('applies size styles correctly', () => {
    const { rerender } = render(<Checkbox size="sm" />);
    let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveStyle({ width: '20px', height: '20px' });

    rerender(<Checkbox size="md" />);
    checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveStyle({ width: '44px', height: '44px' });

    rerender(<Checkbox size="lg" />);
    checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveStyle({ width: '56px', height: '56px' });
  });

  it('supports custom className via style prop', () => {
    render(<Checkbox style={{ opacity: 0.5 }} />);
    const container = screen.getByRole('checkbox').parentElement;
    expect(container).toHaveStyle({ opacity: '0.5' });
  });

  it('accepts HTML input attributes', () => {
    render(<Checkbox name="test-checkbox" value="test-value" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.name).toBe('test-checkbox');
    expect(checkbox.value).toBe('test-value');
  });

  it('has min tap target size (44px) for md and lg sizes', () => {
    const { rerender } = render(<Checkbox size="md" />);
    let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(parseInt(checkbox.style.width || '0')).toBeGreaterThanOrEqual(44);

    rerender(<Checkbox size="lg" />);
    checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(parseInt(checkbox.style.width || '0')).toBeGreaterThanOrEqual(44);
  });
});
