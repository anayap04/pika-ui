import { theme, spacing, fontFamilies, fontSizes, accessibility, transitions } from '../../../tokens';
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
        // No inline outline reset: it would beat the global `:focus-visible`
        // ring (base.css) on specificity and hide keyboard focus entirely.
        // Focus/hover change colour only, never shape or size.
        transition: transitions.fast,
        opacity: disabled ? 0.6 : 1,
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    />
  );
};
