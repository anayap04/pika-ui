import { theme, spacing, fontFamilies, fontSizes, accessibility } from '../../../tokens';
import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: {
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: fontSizes.sm,
    minHeight: accessibility.tapTargetMin,
  },
  md: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: fontSizes.md,
    minHeight: accessibility.tapTargetMin,
  },
  lg: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: fontSizes.lg,
    minHeight: accessibility.tapTargetMin,
  },
};

export const Input: React.FC<InputProps> = ({ size = 'md', disabled, style, ...props }) => {
  return (
    <input
      disabled={disabled}
      style={{
        fontFamily: fontFamilies.body,
        // Chunky hard-edged border to match the pixel Button/Card treatment.
        border: `4px solid ${theme.border}`,
        borderRadius: '0px',
        backgroundColor: theme.inputBackground,
        color: theme.input,
        outline: 'none',
        transition: 'all 150ms ease-out',
        opacity: disabled ? 0.6 : 1,
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    />
  );
};
