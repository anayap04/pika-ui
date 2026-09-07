import { render, screen, userEvent } from 'vitest/browser';
import { expect, it, describe } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with default props', () => {
    render(<Radio />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Radio label="Option 1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('associates label with radio via htmlFor', () => {
    render(<Radio label="Test Option" id="test-radio" />);
    const radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio.id).toBe('test-radio');
  });

  it('handles checked state', async () => {
    render(<Radio />);
    const radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio.checked).toBe(false);

    await userEvent.click(radio);
    expect(radio.checked).toBe(true);
  });

  it('handles disabled state', () => {
    render(<Radio disabled label="Disabled" />);
    const radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio.disabled).toBe(true);
  });

  it('applies size styles correctly', () => {
    const { rerender } = render(<Radio size="sm" />);
    let radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio).toHaveStyle({ width: '20px', height: '20px' });

    rerender(<Radio size="md" />);
    radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio).toHaveStyle({ width: '44px', height: '44px' });

    rerender(<Radio size="lg" />);
    radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio).toHaveStyle({ width: '56px', height: '56px' });
  });

  it('is mutually exclusive with same name', async () => {
    render(
      <>
        <Radio name="choice" value="a" label="Option A" />
        <Radio name="choice" value="b" label="Option B" />
      </>
    );
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios).toHaveLength(2);

    await userEvent.click(radios[0]);
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);

    await userEvent.click(radios[1]);
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
  });

  it('accepts HTML input attributes', () => {
    render(<Radio name="test-radio" value="test-value" />);
    const radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio.name).toBe('test-radio');
    expect(radio.value).toBe('test-value');
  });

  it('has min tap target size (44px) for md and lg sizes', () => {
    const { rerender } = render(<Radio size="md" />);
    let radio = screen.getByRole('radio') as HTMLInputElement;
    expect(parseInt(radio.style.width || '0')).toBeGreaterThanOrEqual(44);

    rerender(<Radio size="lg" />);
    radio = screen.getByRole('radio') as HTMLInputElement;
    expect(parseInt(radio.style.width || '0')).toBeGreaterThanOrEqual(44);
  });

  it('supports custom className via style prop', () => {
    render(<Radio style={{ opacity: 0.5 }} />);
    const container = screen.getByRole('radio').parentElement;
    expect(container).toHaveStyle({ opacity: '0.5' });
  });
});
