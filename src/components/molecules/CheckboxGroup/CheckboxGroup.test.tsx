import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup } from './CheckboxGroup';

const options = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry', disabled: true },
];

describe('CheckboxGroup', () => {
  it('renders one checkbox per option', () => {
    render(<CheckboxGroup options={options} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('uses a semantic fieldset with a legend for accessible grouping', () => {
    render(<CheckboxGroup options={options} legend="Choose your fruits" />);

    expect(screen.getByRole('group', { name: 'Choose your fruits' })).toBeInTheDocument();
  });

  it('reflects the controlled values as checked', () => {
    render(<CheckboxGroup options={options} values={['a']} />);
    expect(screen.getByLabelText('Apple')).toBeChecked();
    expect(screen.getByLabelText('Banana')).not.toBeChecked();
  });

  it('adds a value on check', async () => {
    const onChange = vi.fn();
    render(<CheckboxGroup options={options} values={[]} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Apple'));
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('emits the complete next values array when adding a selection', async () => {
    const onChange = vi.fn();
    render(<CheckboxGroup options={options} values={['b']} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Apple'));
    expect(onChange).toHaveBeenCalledWith(['b', 'a']);
  });

  it('removes a value on uncheck', async () => {
    const onChange = vi.fn();
    render(<CheckboxGroup options={options} values={['a', 'b']} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Apple'));
    expect(onChange).toHaveBeenCalledWith(['b']);
  });

  it('renders a disabled option that cannot be toggled', async () => {
    const onChange = vi.fn();
    render(<CheckboxGroup options={options} onChange={onChange} />);
    const cherry = screen.getByLabelText('Cherry');
    expect(cherry).toBeDisabled();
    await userEvent.click(cherry);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not throw when onChange is omitted', async () => {
    render(<CheckboxGroup options={options} />);
    await userEvent.click(screen.getByLabelText('Apple'));
    expect(screen.getByLabelText('Apple')).toBeInTheDocument();
  });

  it.each(['vertical', 'horizontal'] as const)('lays out %s', (orientation) => {
    render(<CheckboxGroup options={options} orientation={orientation} />);
    expect(screen.getByRole('group')).toHaveStyle({
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
    });
  });

  it.each(['sm', 'md', 'lg'] as const)('accepts the %s size', (size) => {
    render(<CheckboxGroup options={options} size={size} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});
