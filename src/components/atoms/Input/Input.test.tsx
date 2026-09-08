import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders a text input and accepts typing', async () => {
    render(<Input placeholder="Name" />);
    const input = screen.getByPlaceholderText('Name');
    await userEvent.type(input, 'Pika');
    expect(input).toHaveValue('Pika');
  });

  it.each([
    ['sm', '12px'],
    ['md', '14px'],
    ['lg', '16px'],
  ] as const)('applies the %s font size and keeps a 44px min height', (size, fontSize) => {
    render(<Input size={size} aria-label={size} />);
    expect(screen.getByLabelText(size)).toHaveStyle({ fontSize, minHeight: '44px' });
  });

  it('dims and blocks a disabled input', async () => {
    render(<Input disabled aria-label="disabled" />);
    const input = screen.getByLabelText('disabled');
    expect(input).toBeDisabled();
    expect(input).toHaveStyle({ opacity: '0.6' });
    await userEvent.type(input, 'x');
    expect(input).toHaveValue('');
  });

  it('merges caller style overrides', () => {
    render(<Input aria-label="styled" style={{ width: '300px' }} />);
    expect(screen.getByLabelText('styled')).toHaveStyle({ width: '300px' });
  });
});
