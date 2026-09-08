import { theme, spacing, fontFamilies, fontWeights, radii } from '../../../tokens';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'muted';
  size?: 'sm' | 'md';
}

const variantStyles = {
  primary: {
    background: theme.primaryStrong,
    color: theme.primaryForeground,
    border: `2px solid ${theme.border}`,
  },
  secondary: {
    background: theme.secondaryStrong,
    color: theme.secondaryForeground,
    border: `2px solid ${theme.border}`,
  },
  accent: {
    background: theme.accentStrong,
    color: theme.accentForeground,
    border: `2px solid ${theme.border}`,
  },
  destructive: {
    background: theme.destructiveStrong,
    color: theme.destructiveForeground,
    border: `2px solid ${theme.border}`,
  },
  muted: {
    background: theme.muted,
    color: theme.mutedForeground,
    border: `2px solid ${theme.border}`,
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
