import { colors, spacing } from '../../tokens';
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

const variantStyles = {
  default: {
    background: colors.light.card,
    border: `4px solid ${colors.light.border}`,
  },
  elevated: {
    background: colors.light.card,
    border: `4px solid ${colors.light.border}`,
    boxShadow: `0 -4px 0 0 ${colors.light.border}, 4px 0 0 0 ${colors.light.border}, 0 4px 0 0 ${colors.light.border}, -4px 0 0 0 ${colors.light.border}`,
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
