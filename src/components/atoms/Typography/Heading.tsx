import React from 'react';
import { fontFamilies, fontSizes, fontWeights, lineHeights, theme } from '../../../tokens';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
  variant?: 'display' | 'subheading' | 'body';
  color?: 'foreground' | 'muted' | 'primary' | 'secondary' | 'accent' | 'destructive';
}

const headingLevelMap = {
  1: 'h1' as const,
  2: 'h2' as const,
  3: 'h3' as const,
  4: 'h4' as const,
};

const fontSizeMap = {
  1: fontSizes['3xl'],
  2: fontSizes.xl,
  3: fontSizes.lg,
  4: fontSizes.md,
};

const variantFontFamilyMap = {
  display: fontFamilies.display,
  subheading: fontFamilies.subheading,
  body: fontFamilies.body,
};

// Text colours must come from the AAA-safe `*Strong` / foreground tokens — the
// bare `primary` / `secondary` / `accent` / `destructive` tints are decorative
// (2–4:1) and fail contrast as text.
const colorMap = {
  foreground: theme.foreground,
  muted: theme.mutedForeground,
  primary: theme.primaryStrong,
  secondary: theme.secondaryStrong,
  accent: theme.accentText,       // not accentForeground — that's for text ON gold, invisible on the dark page
  destructive: theme.destructiveStrong,
};

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  variant = level === 1 ? 'display' : 'subheading',
  color = 'foreground',
  style,
  ...props
}) => {
  const Component = headingLevelMap[level];
  
  return React.createElement(Component, {
    style: {
      fontFamily: variantFontFamilyMap[variant],
      fontSize: fontSizeMap[level],
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.heading,
      color: colorMap[color],
      margin: 0,
      ...style,
    },
    ...props,
  });
};
