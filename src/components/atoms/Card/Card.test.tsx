import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children in a div with the default md padding', () => {
    render(<Card>Body</Card>);
    const card = screen.getByText('Body');
    expect(card.tagName).toBe('DIV');
    expect(card).toHaveStyle({ padding: '16px' });
  });

  it.each([
    ['sm', '8px'],
    ['md', '16px'],
    ['lg', '24px'],
  ] as const)('applies %s padding', (padding, value) => {
    render(<Card padding={padding}>{padding}</Card>);
    expect(screen.getByText(padding)).toHaveStyle({ padding: value });
  });

  it('renders the default variant without the stacked shadow', () => {
    render(<Card>Plain</Card>);
    expect(screen.getByText('Plain').style.boxShadow).toBe('');
  });

  it('renders the elevated variant with a stacked box-shadow', () => {
    render(<Card variant="elevated">Raised</Card>);
    expect(screen.getByText('Raised').style.boxShadow).not.toBe('');
  });

  it('merges caller style and forwards props', () => {
    render(
      <Card style={{ width: '200px' }} data-testid="card" role="region">
        C
      </Card>,
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveStyle({ width: '200px' });
    expect(card).toHaveAttribute('role', 'region');
  });
});
