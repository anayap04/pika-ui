import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children inside a span', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge.tagName).toBe('SPAN');
  });

  it('defaults to the primary variant at md size', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveStyle({ fontSize: '12px' });
  });

  it.each(['primary', 'secondary', 'accent', 'destructive', 'muted'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
    },
  );

  it('applies the sm size type scale', () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveStyle({ fontSize: '11px' });
  });

  it('is a non-interactive uppercase status marker', () => {
    render(<Badge variant="accent" size="sm">AAA</Badge>);
    const badge = screen.getByText('AAA');
    expect(badge).toHaveStyle({ textTransform: 'uppercase' });
    expect(badge).not.toHaveAttribute('role');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('merges caller-supplied style and forwards arbitrary props', () => {
    render(
      <Badge style={{ marginTop: '10px' }} data-testid="badge" title="hi">
        Styled
      </Badge>,
    );
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveStyle({ marginTop: '10px' });
    expect(badge).toHaveAttribute('title', 'hi');
  });
});
