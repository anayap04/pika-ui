import { colors, spacing, fontFamilies, fontWeights, radii } from '../../../tokens';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'muted';
  size?: 'sm' | 'md';
}

const variantStyles = {
  primary: {
    background: colors.light.primaryStrong,
    color: colors.light.primaryForeground,
    border: `2px solid ${colors.light.border}`,
  },
  secondary: {
    background: colors.light.secondaryStrong,
    color: colors.light.secondaryForeground,
    border: `2px solid ${colors.light.border}`,
  },
  accent: {
    background: colors.light.accentStrong,
    color: colors.light.accentForeground,
    border: `2px solid ${colors.light.border}`,
  },
  destructive: {
    background: colors.light.destructiveStrong,
    color: colors.light.destructiveForeground,
    border: `2px solid ${colors.light.border}`,
  },
  muted: {
    background: colors.light.muted,
    color: colors.light.mutedForeground,
    border: `2px solid ${colors.light.border}`,
  },
};

// VT323 (the subheading face) ships a single 400 weight only — the design
// tokens note that weight tokens apply to Nunito/body text exclusively. Asking
// for a bold weight here makes the browser synthesise a faux-bold, which smears
// the pixel glyphs and breaks consistency with Button/Tags/Checkbox/Radio/Toggle
// (all of which pin `fontWeights.normal` on the pixel faces).
const sizeStyles = {
  sm: {
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: '11px',
    fontWeight: fontWeights.normal,
    lineHeight: 1.2,
  },
  md: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: '12px',
    fontWeight: fontWeights.normal,
    lineHeight: 1.2,
  },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  style,
  ...props
}) => {
  return (
    <span
      style={{
        fontFamily: fontFamilies.subheading,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        borderRadius: radii.sm,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    />
  );
};
