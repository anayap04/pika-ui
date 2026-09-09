import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import { Text } from './Text';

describe('Heading', () => {
  it.each([
    [1, 'h1'],
    [2, 'h2'],
    [3, 'h3'],
    [4, 'h4'],
  ] as const)('renders level %s as <%s>', (level, tag) => {
    render(<Heading level={level}>Title {level}</Heading>);
    expect(screen.getByText(`Title ${level}`).tagName.toLowerCase()).toBe(tag);
  });

  it('defaults level 1 to the display face and other levels to the subheading face', () => {
    render(
      <>
        <Heading level={1}>Display</Heading>
        <Heading level={2}>Sub</Heading>
      </>,
    );
    expect(screen.getByText('Display')).toHaveStyle({
      fontFamily: "'Press Start 2P', 'VT323', monospace",
    });
    expect(screen.getByText('Sub')).toHaveStyle({
      fontFamily: "'VT323', 'Press Start 2P', monospace",
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    });
  });

  it('honours an explicit variant override', () => {
    render(
      <Heading level={2} variant="body">
        Body face
      </Heading>,
    );
    expect(screen.getByText('Body face')).toHaveStyle({
      fontFamily: "'Nunito', system-ui, -apple-system, sans-serif",
    });
  });

  it.each(['foreground', 'muted', 'primary', 'secondary', 'accent', 'destructive'] as const)(
    'renders the %s colour token',
    (color) => {
      render(
        <Heading level={3} color={color}>
          {color}
        </Heading>,
      );
      expect(screen.getByText(color)).toBeInTheDocument();
    },
  );

  it('uses the AAA-safe accent text token for accent headings', () => {
    render(<Heading level={3} color="accent">VOTE TALLY</Heading>);
    expect(screen.getByText('VOTE TALLY')).toHaveStyle({ color: 'var(--pk-accent-text, #3d1a52)' });
  });

  it('merges caller style overrides', () => {
    render(
      <Heading level={1} style={{ textAlign: 'center' }}>
        Centered
      </Heading>,
    );
    expect(screen.getByText('Centered')).toHaveStyle({ textAlign: 'center' });
  });
});

describe('Paragraph', () => {
  it('renders a <p> with the default md size and normal weight', () => {
    render(<Paragraph>Copy</Paragraph>);
    const p = screen.getByText('Copy');
    expect(p.tagName).toBe('P');
    expect(p).toHaveStyle({ fontSize: '14px', fontWeight: '400' });
  });

  it.each([
    ['sm', '12px'],
    ['md', '14px'],
    ['lg', '16px'],
  ] as const)('applies the %s size', (size, fontSize) => {
    render(<Paragraph size={size}>{size}</Paragraph>);
    expect(screen.getByText(size)).toHaveStyle({ fontSize });
  });

  it.each([
    ['normal', '400'],
    ['medium', '600'],
    ['bold', '800'],
  ] as const)('applies the %s weight', (weight, value) => {
    render(<Paragraph weight={weight}>{weight}</Paragraph>);
    expect(screen.getByText(weight)).toHaveStyle({ fontWeight: value });
  });

  it.each(['foreground', 'muted', 'primary', 'secondary'] as const)(
    'renders the %s colour token',
    (color) => {
      render(<Paragraph color={color}>{color}</Paragraph>);
      expect(screen.getByText(color)).toBeInTheDocument();
    },
  );
});

describe('Text', () => {
  it('renders a <span> with the default body face', () => {
    render(<Text>inline</Text>);
    const span = screen.getByText('inline');
    expect(span.tagName).toBe('SPAN');
    expect(span).toHaveStyle({ fontFamily: "'Nunito', system-ui, -apple-system, sans-serif" });
  });

  it('renders the subheading variant', () => {
    render(<Text variant="subheading">crt</Text>);
    expect(screen.getByText('crt')).toHaveStyle({
      fontFamily: "'VT323', 'Press Start 2P', monospace",
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: '400',
    });
  });

  it.each([
    ['sm', '12px'],
    ['md', '14px'],
    ['lg', '16px'],
  ] as const)('applies the %s size', (size, fontSize) => {
    render(<Text size={size}>{size}</Text>);
    expect(screen.getByText(size)).toHaveStyle({ fontSize });
  });

  it('ignores weight overrides for the single-weight subheading face', () => {
    render(<Text variant="subheading" weight="bold">LABEL</Text>);
    expect(screen.getByText('LABEL')).toHaveStyle({ fontWeight: '400' });
  });

  it.each(['foreground', 'muted', 'primary', 'secondary', 'accent', 'destructive'] as const)(
    'renders the %s colour token',
    (color) => {
      render(<Text color={color}>{color}</Text>);
      expect(screen.getByText(color)).toBeInTheDocument();
    },
  );
});
