import { colors, spacing } from '../../../tokens';
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

// Pixel-art cards: hard 4px borders, zero radius. The elevated variant stacks
// a second offset border via box-shadow for the stepped "8-bit" depth effect.
const variantStyles = {
  default: {
    background: colors.light.card,
    border: `4px solid ${colors.light.border}`,
    borderRadius: 0,
  },
  elevated: {
    background: colors.light.card,
    border: `4px solid ${colors.light.border}`,
    borderRadius: 0,
    boxShadow: `0 -4px 0 0 ${colors.light.border}, 4px 0 0 0 ${colors.light.border}, 0 4px 0 0 ${colors.light.border}, -4px 0 0 0 ${colors.light.border}, 8px 8px 0 0 ${colors.light.border}`,
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
        ...variantStyles[variant],
        ...paddingStyles[padding],
        ...style,
      }}
      {...props}
    />
  );
};
