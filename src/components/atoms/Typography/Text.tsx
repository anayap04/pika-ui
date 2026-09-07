import React from 'react';
import { fontFamilies, fontSizes, fontWeights, colors } from '../../../tokens';

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
  foreground: colors.light.foreground,
  muted: colors.light.mutedForeground,
  primary: colors.light.primaryStrong,
  secondary: colors.light.secondaryStrong,
  accent: colors.light.accentForeground,
  destructive: colors.light.destructiveForeground,
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
        fontWeight: fontWeights[weight],
        color: colorMap[color],
        ...style,
      }}
      {...props}
    />
  );
};
