import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children inside a role="group" container', () => {
    render(
      <ButtonGroup>
        <button>One</button>
        <button>Two</button>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group');
    expect(group).toContainElement(screen.getByText('One'));
    expect(group).toContainElement(screen.getByText('Two'));
  });

  it('defaults to a horizontal row that wraps', () => {
    render(
      <ButtonGroup>
        <button>A</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveStyle({ flexDirection: 'row', flexWrap: 'wrap' });
  });

  it('switches to a non-wrapping column when vertical', () => {
    render(
      <ButtonGroup orientation="vertical">
        <button>A</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveStyle({ flexDirection: 'column', flexWrap: 'nowrap' });
  });

  it.each([
    ['xs', '4px'],
    ['sm', '8px'],
    ['md', '16px'],
    ['lg', '24px'],
    ['xl', '32px'],
  ] as const)('applies the %s gap', (gap, value) => {
    render(
      <ButtonGroup gap={gap}>
        <button>A</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveStyle({ gap: value });
  });

  it('merges caller style overrides', () => {
    render(
      <ButtonGroup style={{ marginTop: '12px' }}>
        <button>A</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveStyle({ marginTop: '12px' });
  });
});
