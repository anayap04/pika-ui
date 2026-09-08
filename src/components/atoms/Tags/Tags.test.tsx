import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from './Tags';

describe('Tag', () => {
  it('renders its label', () => {
    render(<Tag label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('does not render a remove button by default', () => {
    render(<Tag label="Static" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders a labelled remove button and calls onRemove when removable', async () => {
    const onRemove = vi.fn();
    render(<Tag label="Vite" removable onRemove={onRemove} />);
    const button = screen.getByRole('button', { name: 'Remove Vite tag' });
    await userEvent.click(button);
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('renders a leading icon node when provided', () => {
    render(<Tag label="Star" icon={<span data-testid="icon">★</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it.each(['primary', 'secondary', 'accent', 'destructive', 'muted'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<Tag label={variant} variant={variant} />);
      expect(screen.getByText(variant)).toBeInTheDocument();
    },
  );

  it('tolerates a removable tag with no onRemove handler', async () => {
    render(<Tag label="Safe" removable />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Safe')).toBeInTheDocument();
  });
});
