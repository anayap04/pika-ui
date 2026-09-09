import { theme, spacing, shadows, transitions } from '../../../tokens';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated';
}

const paddingStyles = {
  sm: {
    padding: spacing.sm,
  },
  md: {
    padding: spacing.md,
  },
  lg: {
    padding: spacing.lg,
  },
};

// Pixel-art cards: hard 4px borders, zero radius. The elevated variant adds the
// stepped "8-bit" depth — a doubled outline plus one 8px corner step — via the
// shared `--pk-shadow-pixel-elevated` token. Never a blur, never a soft ramp.
const variantStyles = {
  default: {
    background: theme.card,
    border: `4px solid ${theme.border}`,
    borderRadius: 0,
  },
  elevated: {
    background: theme.card,
    border: `4px solid ${theme.border}`,
    borderRadius: 0,
    boxShadow: shadows.pixelElevated,
  },
};

export const Card: React.FC<CardProps> = ({
  padding = 'md',
  variant = 'default',
  style,
  ...props
}) => {
  return (
    <div
      style={{
        // Colour-only transition — smooths the border/shadow when the theme
        // flips (black outline ↔ neon gold); no transform, ever.
        transition: transitions.fast,
        ...variantStyles[variant],
        ...paddingStyles[padding],
        ...style,
      }}
      {...props}
    />
  );
};
