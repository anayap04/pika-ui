import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventHero } from './EventHero';
import { theme, decorativeTints } from '../../../tokens';

describe('EventHero', () => {
  it('renders the title as the page h1', () => {
    render(<EventHero title="GENDER REVEAL" />);
    expect(screen.getByRole('heading', { level: 1, name: 'GENDER REVEAL' })).toBeInTheDocument();
  });

  it('breaks the title onto multiple lines on "\\n"', () => {
    render(<EventHero title={'GENDER\nREVEAL'} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.querySelector('br')).toBeInTheDocument();
    expect(heading).toHaveTextContent('GENDERREVEAL');
  });

  it('omits the kicker, tagline, level badge and tags when not provided', () => {
    render(<EventHero title="Baby shower" />);
    expect(screen.queryByText(/insert coin/i)).toBeNull();
    expect(screen.queryByText(/level/i)).toBeNull();
  });

  it('renders the level badge only when level is provided', () => {
    const { rerender } = render(<EventHero title="X" level={1} />);
    expect(screen.getByText('LEVEL 1')).toBeInTheDocument();
    rerender(<EventHero title="X" />);
    expect(screen.queryByText(/LEVEL/)).toBeNull();
  });

  it('renders the kicker wrapped in diamond glyphs', () => {
    render(<EventHero title="X" kicker="Insert coin" />);
    expect(screen.getByText('◆ Insert coin ◆')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<EventHero title="X" tagline="Pick a team before the cabinet calls it." />);
    expect(screen.getByText('Pick a team before the cabinet calls it.')).toBeInTheDocument();
  });

  it('renders up to four fact tags', () => {
    render(<EventHero title="X" tags={['Dec 14', '4:00 PM', 'Valle Dorado']} />);
    expect(screen.getByText('Dec 14')).toBeInTheDocument();
    expect(screen.getByText('4:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Valle Dorado')).toBeInTheDocument();
  });

  describe('when more than 4 tags are passed', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('renders only the first 4 and warns in dev', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<EventHero title="X" tags={['a', 'b', 'c', 'd', 'e']} />);
      expect(screen.getByText('a')).toBeInTheDocument();
      expect(screen.getByText('d')).toBeInTheDocument();
      expect(screen.queryByText('e')).toBeNull();
      expect(warn).toHaveBeenCalled();
    });
  });

  it('defaults to the pink ground', () => {
    const { container } = render(<EventHero title="X" />);
    expect(container.firstChild).toHaveStyle({ background: decorativeTints.pixelPink });
  });

  it('switches to the paper ground', () => {
    const { container } = render(<EventHero title="X" ground="paper" />);
    expect(container.firstChild).toHaveStyle({ background: theme.background });
  });

  it('renders the aside slot', () => {
    render(<EventHero title="X" aside={<span>QR here</span>} />);
    expect(screen.getByText('QR here')).toBeInTheDocument();
  });

  it('merges caller style overrides', () => {
    render(<EventHero title="X" style={{ maxWidth: '900px' }} data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveStyle({ maxWidth: '900px' });
  });
});
