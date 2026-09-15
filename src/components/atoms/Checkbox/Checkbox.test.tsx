import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('uses a transparent background when unchecked', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox').style.backgroundColor).toBe('transparent');
  });

  it('links a rendered label to the input via a generated id', () => {
    render(<Checkbox label="Accept terms" />);
    const input = screen.getByLabelText('Accept terms');
    expect(input).toBeInTheDocument();
    expect(input.id).toBeTruthy();
  });

  it('honours an explicit id', () => {
    render(<Checkbox id="tos" label="TOS" />);
    expect(screen.getByLabelText('TOS')).toHaveAttribute('id', 'tos');
  });

  it('does not render a label element when label is omitted', () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('label')).toBeNull();
  });

  it('toggles on click and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Toggle me" onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders disabled state with not-allowed cursor', () => {
    render(<Checkbox label="Nope" disabled />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeDisabled();
    expect(input).toHaveStyle({ cursor: 'not-allowed', opacity: '0.6' });
  });

  it.each([
    ['sm', '20px'],
    ['md', '44px'],
    ['lg', '56px'],
  ] as const)('sizes the %s control to %s', (size, dimension) => {
    render(<Checkbox size={size} />);
    expect(screen.getByRole('checkbox')).toHaveStyle({ width: dimension, height: dimension });
  });
});
