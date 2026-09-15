import { theme, spacing, accessibility, fontFamilies, fontWeights, transitions } from '../../../tokens';
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
  className,
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
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeStyles[size].width,
          height: sizeStyles[size].height,
          minWidth: sizeStyles[size].minWidth,
          minHeight: sizeStyles[size].minHeight,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <input
          id={radioId}
          type="radio"
          disabled={disabled}
          className={['pk-radio', className].filter(Boolean).join(' ')}
          style={{
            ...sizeStyles[size],
            position: 'absolute',
            inset: 0,
            margin: 0,
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            backgroundColor: 'transparent',
            border: `2px solid ${theme.border}`,
            borderRadius: '50%',
            outline: 'none',
            transition: transitions.fast,
          }}
          {...props}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: `calc(${sizeStyles[size].width} / 2)`,
            height: `calc(${sizeStyles[size].height} / 2)`,
            borderRadius: '50%',
            transition: transitions.fast,
          }}
        />
      </div>
      {label && (
        <label
          htmlFor={radioId}
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
