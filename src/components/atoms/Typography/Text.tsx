import React from 'react';
import { fontFamilies, fontSizes, fontWeights, letterSpacings, theme } from '../../../tokens';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'body' | 'subheading';
  size?: 'sm' | 'md' | 'lg';
  color?: 'foreground' | 'muted' | 'primary' | 'secondary' | 'accent' | 'destructive';
  weight?: 'normal' | 'medium' | 'bold';
}

const fontFamilyMap = {
  body: fontFamilies.body,
  subheading: fontFamilies.subheading,
};

const sizeMap = {
  sm: fontSizes.sm,
  md: fontSizes.md,
  lg: fontSizes.lg,
};

const colorMap = {
  foreground: theme.foreground,
  muted: theme.mutedForeground,
  primary: theme.primaryStrong,
  secondary: theme.secondaryStrong,
  accent: theme.accentText,       // not accentForeground — that's for text ON gold, invisible on the dark page
  // was destructiveForeground (#fff) — white text, invisible on light grounds
  destructive: theme.destructiveStrong,
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  size = 'md',
  color = 'foreground',
  weight = 'normal',
  style,
  ...props
}) => {
  return (
    <span
      style={{
        fontFamily: fontFamilyMap[variant],
        fontSize: sizeMap[size],
        fontWeight: variant === 'subheading' ? fontWeights.normal : fontWeights[weight],
        ...(variant === 'subheading' && {
          textTransform: 'uppercase',
          letterSpacing: letterSpacings.caps,
        }),
        color: colorMap[color],
        ...style,
      }}
      {...props}
    />
  );
};
