import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders a native button with its label', () => {
    render(<Button>Start</Button>);
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  it('fires onClick when enabled', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick when disabled and dims itself', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ opacity: '0.6', cursor: 'not-allowed' });
  });

  it.each(['primary', 'secondary', 'accent', 'destructive'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument();
    },
  );

  it.each([
    ['sm', '10px'],
    ['md', '12px'],
    ['lg', '14px'],
  ] as const)('applies the %s size type scale', (size, fontSize) => {
    render(<Button size={size}>{size}</Button>);
    expect(screen.getByRole('button')).toHaveStyle({ fontSize, minHeight: '44px' });
  });

  it('keeps a 44px minimum tap target', () => {
    render(<Button>Tap</Button>);
    expect(screen.getByRole('button')).toHaveStyle({ minWidth: '44px', minHeight: '44px' });
  });

  it('merges caller style overrides', () => {
    render(<Button style={{ letterSpacing: '1px' }}>X</Button>);
    expect(screen.getByRole('button')).toHaveStyle({ letterSpacing: '1px' });
  });
});
