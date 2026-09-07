import { colors, spacing, fontFamilies, fontWeights, accessibility } from '../../tokens';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: {
    padding: `${spacing.sm} ${spacing.md}`,
    minHeight: accessibility.tapTargetMin,
    minWidth: accessibility.tapTargetMin,
  },
  md: {
    padding: `${spacing.md} ${spacing.lg}`,
    minHeight: accessibility.tapTargetMin,
    minWidth: accessibility.tapTargetMin,
  },
  lg: {
    padding: `${spacing.lg} ${spacing.xl}`,
    minHeight: accessibility.tapTargetMin,
    minWidth: accessibility.tapTargetMin,
  },
};

const variantStyles = {
  primary: {
    background: colors.light.primaryStrong,
    color: colors.light.primaryForeground,
    border: `4px solid ${colors.light.border}`,
    boxShadow: `0 -4px 0 0 ${colors.light.border}, 4px 0 0 0 ${colors.light.border}, 0 4px 0 0 ${colors.light.border}, -4px 0 0 0 ${colors.light.border}`,
  },
  secondary: {
    background: colors.light.secondaryStrong,
    color: colors.light.secondaryForeground,
    border: `4px solid ${colors.light.border}`,
    boxShadow: `0 -4px 0 0 ${colors.light.border}, 4px 0 0 0 ${colors.light.border}, 0 4px 0 0 ${colors.light.border}, -4px 0 0 0 ${colors.light.border}`,
  },
  accent: {
    background: colors.light.accentStrong,
    color: colors.light.accentForeground,
    border: `4px solid ${colors.light.border}`,
    boxShadow: `0 -4px 0 0 ${colors.light.border}, 4px 0 0 0 ${colors.light.border}, 0 4px 0 0 ${colors.light.border}, -4px 0 0 0 ${colors.light.border}`,
  },
  destructive: {
    background: colors.light.destructiveStrong,
    color: colors.light.destructiveForeground,
    border: `4px solid ${colors.light.border}`,
    boxShadow: `0 -4px 0 0 ${colors.light.border}, 4px 0 0 0 ${colors.light.border}, 0 4px 0 0 ${colors.light.border}, -4px 0 0 0 ${colors.light.border}`,
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled,
  style,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      style={{
        fontFamily: fontFamilies.subheading,
        fontWeight: fontWeights.normal,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        outline: 'none',
        transition: 'all 150ms ease-out',
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    />
  );
};
