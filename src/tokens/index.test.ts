import { describe, it, expect } from 'vitest';
import {
  colors,
  theme,
  colorVarName,
  spacing,
  radii,
  fontSizes,
  fontFamilies,
  fontWeights,
  lineHeights,
  accessibility,
  transitions,
  shadows,
  glyphs,
  letterSpacings,
  getColorVar,
} from './index';

describe('tokens', () => {
  it('exposes matching keys for the light and dark palettes', () => {
    expect(Object.keys(colors.dark).sort()).toEqual(Object.keys(colors.light).sort());
  });

  it('derives every theme value as a var() reference with the light hex fallback', () => {
    for (const key of Object.keys(colors.light) as (keyof typeof colors.light)[]) {
      expect(theme[key]).toBe(`var(${colorVarName(key)}, ${colors.light[key]})`);
    }
  });

  it('converts camelCase token names into kebab-case custom properties', () => {
    expect(colorVarName('foreground')).toBe('--pk-foreground');
    expect(colorVarName('primaryStrong')).toBe('--pk-primary-strong');
    expect(colorVarName('inputBackground')).toBe('--pk-input-background');
  });

  it('keeps every radius at 0 for the pixel-art aesthetic', () => {
    expect(Object.values(radii).every((value) => value === '0px')).toBe(true);
  });

  it('exposes the spacing, type and motion scales', () => {
    expect(spacing).toMatchObject({ xs: '4px', md: '16px', xl: '32px' });
    expect(fontSizes.md).toBe('14px');
    expect(fontFamilies.display).toContain('Press Start 2P');
    expect(fontWeights.normal).toBe(400);
    expect(lineHeights.body).toBe(1.6);
    expect(transitions.fast).toBe('150ms ease-out');
  });

  it('pins the tap-target minimum to 44px (WCAG 2.2 SC 2.5.8)', () => {
    expect(accessibility.tapTargetMin).toBe('44px');
  });

  it('exposes the pixel shadows as themeable var() refs with a light fallback', () => {
    expect(shadows.pixel).toBe(
      'var(--pk-shadow-pixel, 0 -4px 0 0 #000000, 4px 0 0 0 #000000, 0 4px 0 0 #000000, -4px 0 0 0 #000000)',
    );
    expect(shadows.pixelElevated).toContain('var(--pk-shadow-pixel-elevated,');
    expect(shadows.pixelElevated).toContain('8px 8px 0 0 #000000');
  });

  it('builds pixel depth from hard offsets only — no blur radius', () => {
    // every layer is "<x> <y> 0 0 <colour>": the third (blur) value is always 0
    expect(shadows.pixel).not.toMatch(/-?\d+px\s+-?\d+px\s+[1-9]/);
    expect(shadows.pixelElevated).not.toMatch(/-?\d+px\s+-?\d+px\s+[1-9]/);
  });

  it('exposes the four brand glyphs as single unicode code points (never emoji)', () => {
    expect(glyphs).toEqual({ diamond: '◆', remove: '×', required: '*', arrow: '→' });
    for (const g of Object.values(glyphs)) {
      expect([...g]).toHaveLength(1);
    }
  });

  it('exposes caps tracking for the pixel faces (0.04–0.2em per the type spec)', () => {
    expect(letterSpacings.button).toBe('0.05em');
    expect(letterSpacings.caps).toBe('0.06em');
  });

  describe('getColorVar', () => {
    it('returns the light value by default', () => {
      expect(getColorVar('background')).toBe(colors.light.background);
    });

    it('returns the dark value when isDark is true', () => {
      expect(getColorVar('background', true)).toBe(colors.dark.background);
    });
  });
});
