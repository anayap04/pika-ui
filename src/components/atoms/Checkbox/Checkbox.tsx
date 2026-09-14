import { theme, spacing, accessibility, fontFamilies, fontWeights, transitions } from '../../../tokens';
import React, { useId } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: {
    width: '20px',
    height: '20px',
    minWidth: '20px',
    minHeight: '20px',
  },
  md: {
    width: accessibility.tapTargetMin,
    height: accessibility.tapTargetMin,
    minWidth: accessibility.tapTargetMin,
    minHeight: accessibility.tapTargetMin,
  },
  lg: {
    width: '56px',
    height: '56px',
    minWidth: '56px',
    minHeight: '56px',
  },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  size = 'md',
  id,
  disabled,
  style,
  ...props
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.md,
        ...style,
      }}
    >
      <input
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        style={{
          ...sizeStyles[size],
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          accentColor: theme.primaryStrong,
          border: `2px solid ${theme.border}`,
          backgroundColor: 'transparent',
          borderRadius: 0, // pixel art has no rounded corners (Toggle + Tag are the only exceptions)
          outline: 'none',
          transition: transitions.fast,
        }}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          style={{
            fontFamily: fontFamilies.body,
            fontSize: '14px',
            fontWeight: fontWeights.normal,
            color: theme.foreground,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            userSelect: 'none',
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
};
