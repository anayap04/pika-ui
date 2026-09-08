import { colors, spacing, accessibility, fontFamilies, fontWeights } from '../../../tokens';
import React, { useId } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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

export const Radio: React.FC<RadioProps> = ({
  label,
  size = 'md',
  id,
  disabled,
  style,
  ...props
}) => {
  const generatedId = useId();
  const radioId = id || generatedId;

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
        id={radioId}
        type="radio"
        disabled={disabled}
        style={{
          ...sizeStyles[size],
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          accentColor: colors.light.primaryStrong,
          border: `2px solid ${colors.light.border}`,
          outline: 'none',
        }}
        {...props}
      />
      {label && (
        <label
          htmlFor={radioId}
          style={{
            fontFamily: fontFamilies.body,
            fontSize: '14px',
            fontWeight: fontWeights.normal,
            color: colors.light.foreground,
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
