import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(<Radio name="g" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('links a rendered label via a generated id', () => {
    render(<Radio name="g" label="Option A" />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('honours an explicit id', () => {
    render(<Radio name="g" id="opt-a" label="A" />);
    expect(screen.getByLabelText('A')).toHaveAttribute('id', 'opt-a');
  });

  it('omits the label element when no label is given', () => {
    const { container } = render(<Radio name="g" />);
    expect(container.querySelector('label')).toBeNull();
  });

  it('selects on click and fires onChange', async () => {
    const onChange = vi.fn();
    render(<Radio name="g" label="Pick" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('renders a disabled radio', () => {
    render(<Radio name="g" label="Nope" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it.each([
    ['sm', '20px'],
    ['md', '44px'],
    ['lg', '56px'],
  ] as const)('sizes the %s control', (size, dimension) => {
    render(<Radio name="g" size={size} />);
    expect(screen.getByRole('radio')).toHaveStyle({ width: dimension });
  });
});
