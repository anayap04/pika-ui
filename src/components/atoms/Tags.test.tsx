import { render, screen, userEvent } from 'vitest/browser';
import { expect, it, describe, vi } from 'vitest';
import { Tag } from './Tags';

describe('Tag', () => {
  it('renders with required label prop', () => {
    render(<Tag label="Tag Label" />);
    expect(screen.getByText('Tag Label')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Tag label="Primary" variant="primary" />);
    let tag = screen.getByText('Primary');
    expect(tag).toHaveStyle({ backgroundColor: '#c93870' });

    rerender(<Tag label="Secondary" variant="secondary" />);
    tag = screen.getByText('Secondary');
    expect(tag).toHaveStyle({ backgroundColor: '#2f6fe0' });

    rerender(<Tag label="Destructive" variant="destructive" />);
    tag = screen.getByText('Destructive');
    expect(tag).toHaveStyle({ backgroundColor: '#db1548' });
  });

  it('renders as span with inline-flex', () => {
    render(<Tag label="Test" />);
    const tag = screen.getByText('Test');
    expect(tag.tagName).toBe('SPAN');
    expect(tag.parentElement).toHaveStyle({ display: 'inline-flex' });
  });

  it('displays icon when provided', () => {
    render(<Tag label="Tag" icon="🎉" />);
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('renders remove button when removable is true', () => {
    render(<Tag label="Remove Me" removable onRemove={() => {}} />);
    const removeButton = screen.getByRole('button');
    expect(removeButton).toHaveTextContent('×');
  });

  it('calls onRemove callback when close button is clicked', async () => {
    const handleRemove = vi.fn();
    render(<Tag label="Remove Me" removable onRemove={handleRemove} />);
    const removeButton = screen.getByRole('button');

    await userEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalled();
  });

  it('removes tag button when removable is false', () => {
    render(<Tag label="Not Removable" removable={false} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('supports custom className via style prop', () => {
    render(<Tag label="Custom" style={{ opacity: 0.5 }} />);
    const tag = screen.getByText('Custom');
    expect(tag.parentElement).toHaveStyle({ opacity: '0.5' });
  });

  it('renders multiple children in correct order', () => {
    render(<Tag label="Label" icon="📌" removable onRemove={() => {}} />);
    const tag = screen.getByText('Label').parentElement;
    const children = tag?.textContent;
    expect(children).toContain('📌');
    expect(children).toContain('Label');
    expect(children).toContain('×');
  });

  it('renders without icon when not provided', () => {
    render(<Tag label="No Icon" />);
    const tag = screen.getByText('No Icon');
    expect(tag.textContent).toBe('No Icon');
  });

  it('has aria-label on remove button', () => {
    render(<Tag label="Accessible" removable onRemove={() => {}} />);
    const removeButton = screen.getByRole('button');
    expect(removeButton).toHaveAttribute('aria-label', 'Remove Accessible tag');
  });

  it('applies VT323 font family for retro styling', () => {
    render(<Tag label="Retro" />);
    const tag = screen.getByText('Retro').parentElement;
    const style = window.getComputedStyle(tag!);
    expect(style.fontFamily).toContain("'VT323'");
  });
});
