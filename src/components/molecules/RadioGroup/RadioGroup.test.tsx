import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'r', label: 'Red' },
  { value: 'g', label: 'Green' },
  { value: 'b', label: 'Blue', disabled: true },
];

describe('RadioGroup', () => {
  it('renders one radio per option sharing the group name', () => {
    render(<RadioGroup name="color" options={options} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(radios.every((r) => r.getAttribute('name') === 'color')).toBe(true);
  });

  it('marks the option matching value as checked', () => {
    render(<RadioGroup name="color" options={options} value="g" />);
    expect(screen.getByLabelText('Green')).toBeChecked();
    expect(screen.getByLabelText('Red')).not.toBeChecked();
  });

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup name="color" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Red'));
    expect(onChange).toHaveBeenCalledWith('r');
  });

  it('renders a disabled option that cannot be selected', async () => {
    const onChange = vi.fn();
    render(<RadioGroup name="color" options={options} onChange={onChange} />);
    const blue = screen.getByLabelText('Blue');
    expect(blue).toBeDisabled();
    await userEvent.click(blue);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not throw when onChange is omitted', async () => {
    render(<RadioGroup name="color" options={options} />);
    await userEvent.click(screen.getByLabelText('Red'));
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
  });

  it.each(['vertical', 'horizontal'] as const)('lays out %s', (orientation) => {
    render(<RadioGroup name="color" options={options} orientation={orientation} />);
    expect(screen.getByRole('group')).toHaveStyle({
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
    });
  });

  it.each(['sm', 'md', 'lg'] as const)('accepts the %s size', (size) => {
    render(<RadioGroup name="color" options={options} size={size} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});
