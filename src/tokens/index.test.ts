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

  describe('getColorVar', () => {
    it('returns the light value by default', () => {
      expect(getColorVar('background')).toBe(colors.light.background);
    });

    it('returns the dark value when isDark is true', () => {
      expect(getColorVar('background', true)).toBe(colors.dark.background);
    });
  });
});
