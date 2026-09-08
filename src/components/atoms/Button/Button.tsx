import { theme, spacing, fontFamilies, fontWeights, accessibility } from '../../../tokens';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

// Press Start 2P renders ~1.6x larger than a typical sans face, so the pixel
// button uses a deliberately small type scale to keep labels readable.
const sizeStyles = {
  sm: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: '10px',
    minHeight: accessibility.tapTargetMin,
    minWidth: accessibility.tapTargetMin,
  },
  md: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: '12px',
    minHeight: accessibility.tapTargetMin,
    minWidth: accessibility.tapTargetMin,
  },
  lg: {
    padding: `${spacing.lg} ${spacing.xl}`,
    fontSize: '14px',
    minHeight: accessibility.tapTargetMin,
    minWidth: accessibility.tapTargetMin,
  },
};

const variantStyles = {
  primary: {
    background: theme.primaryStrong,
    color: theme.primaryForeground,
    border: `4px solid ${theme.border}`,
    boxShadow: `0 -4px 0 0 ${theme.border}, 4px 0 0 0 ${theme.border}, 0 4px 0 0 ${theme.border}, -4px 0 0 0 ${theme.border}`,
  },
  secondary: {
    background: theme.secondaryStrong,
    color: theme.secondaryForeground,
    border: `4px solid ${theme.border}`,
    boxShadow: `0 -4px 0 0 ${theme.border}, 4px 0 0 0 ${theme.border}, 0 4px 0 0 ${theme.border}, -4px 0 0 0 ${theme.border}`,
  },
  accent: {
    background: theme.accentStrong,
    color: theme.accentForeground,
    border: `4px solid ${theme.border}`,
    boxShadow: `0 -4px 0 0 ${theme.border}, 4px 0 0 0 ${theme.border}, 0 4px 0 0 ${theme.border}, -4px 0 0 0 ${theme.border}`,
  },
  destructive: {
    background: theme.destructiveStrong,
    color: theme.destructiveForeground,
    border: `4px solid ${theme.border}`,
    boxShadow: `0 -4px 0 0 ${theme.border}, 4px 0 0 0 ${theme.border}, 0 4px 0 0 ${theme.border}, -4px 0 0 0 ${theme.border}`,
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
        fontFamily: fontFamilies.display,
        fontWeight: fontWeights.normal,
        lineHeight: 1.5,
        letterSpacing: '0.05em',
        borderRadius: 0,
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
