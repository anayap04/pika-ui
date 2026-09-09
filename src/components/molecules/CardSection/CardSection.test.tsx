import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardSection } from './CardSection';
import { theme } from '../../../tokens';

describe('CardSection', () => {
  it('always renders its children', () => {
    render(<CardSection>Content</CardSection>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('omits header and footer bands when not provided', () => {
    render(<CardSection>Body</CardSection>);
    expect(screen.queryByText('Head')).toBeNull();
    expect(screen.queryByText('Foot')).toBeNull();
  });

  it('renders the header band when a header node is passed', () => {
    render(<CardSection header={<span>Head</span>}>Body</CardSection>);
    expect(screen.getByText('Head')).toBeInTheDocument();
  });

  it('renders the footer band when a footer node is passed', () => {
    render(<CardSection footer={<span>Foot</span>}>Body</CardSection>);
    expect(screen.getByText('Foot')).toBeInTheDocument();
  });

  it('uses the muted token for default header and footer bands', () => {
    render(
      <CardSection header={<span>Head</span>} footer={<span>Foot</span>}>
        Body
      </CardSection>,
    );
    expect(screen.getByText('Head').parentElement).toHaveStyle({ backgroundColor: theme.muted });
    expect(screen.getByText('Foot').parentElement).toHaveStyle({ backgroundColor: theme.muted });
  });

  it('applies a custom header background colour', () => {
    render(
      <CardSection header={<span>Head</span>} headerBackground="rgb(255, 0, 0)">
        Body
      </CardSection>,
    );
    expect(screen.getByText('Head').parentElement).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it.each(['sm', 'md', 'lg'] as const)('accepts the %s padding scale', (padding) => {
    render(
      <CardSection padding={padding} header={<span>Head</span>}>
        Body
      </CardSection>,
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('passes the elevated variant through to the underlying Card', () => {
    const { container } = render(<CardSection variant="elevated">Body</CardSection>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.boxShadow).not.toBe('');
  });
});
