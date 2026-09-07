import { render, screen } from 'vitest/browser';
import { expect, it, describe } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    let badge = screen.getByText('Primary');
    expect(badge).toHaveStyle({ backgroundColor: '#c93870' });

    rerender(<Badge variant="secondary">Secondary</Badge>);
    badge = screen.getByText('Secondary');
    expect(badge).toHaveStyle({ backgroundColor: '#2f6fe0' });

    rerender(<Badge variant="destructive">Destructive</Badge>);
    badge = screen.getByText('Destructive');
    expect(badge).toHaveStyle({ backgroundColor: '#db1548' });
  });

  it('applies size styles correctly', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    let badge = screen.getByText('Small');
    expect(badge).toHaveStyle({ fontSize: '11px' });

    rerender(<Badge size="md">Medium</Badge>);
    badge = screen.getByText('Medium');
    expect(badge).toHaveStyle({ fontSize: '12px' });
  });

  it('renders as inline-block span', () => {
    render(<Badge>Badge</Badge>);
    const badge = screen.getByText('Badge');
    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveStyle({ display: 'inline-block' });
  });

  it('supports custom className via style prop', () => {
    render(<Badge style={{ opacity: 0.5 }}>Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveStyle({ opacity: '0.5' });
  });

  it('renders children correctly', () => {
    render(<Badge>Badge Content</Badge>);
    expect(screen.getByText('Badge Content')).toBeInTheDocument();
  });
});
