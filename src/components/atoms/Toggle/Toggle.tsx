import { theme, spacing, accessibility, fontFamilies, fontWeights, transitions } from '../../../tokens';
import React, { useId } from 'react';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: 'sm' | 'md';
}

const sizeStyles = {
  sm: {
    width: '40px',
    height: '24px',
    toggleWidth: '20px',
    toggleHeight: '20px',
  },
  md: {
    width: '56px',
    height: '32px',
    toggleWidth: '28px',
    toggleHeight: '28px',
  },
};

export const Toggle: React.FC<ToggleProps> = ({
  label,
  size = 'md',
  id,
  disabled,
  checked,
  style,
  ...props
}) => {
  const generatedId = useId();
  const toggleId = id || generatedId;
  const sizeConfig = sizeStyles[size];

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
          display: 'inline-block',
          minHeight: accessibility.tapTargetMin,
          minWidth: '56px',
        }}
      >
        <input
          id={toggleId}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          role="switch"
          aria-checked={checked}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...props}
        />
        <label
          htmlFor={toggleId}
          style={{
            position: 'relative',
            display: 'inline-block',
            width: sizeConfig.width,
            height: sizeConfig.height,
            backgroundColor: checked ? theme.primaryStrong : theme.switchBackground,
            border: `2px solid ${theme.border}`,
            // Documented radius exception: a square switch reads as a checkbox.
            borderRadius: '12px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: transitions.fast,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: checked ? `calc(${sizeConfig.width} - ${sizeConfig.toggleWidth} - 2px)` : '2px',
              width: sizeConfig.toggleWidth,
              height: sizeConfig.toggleHeight,
              backgroundColor: theme.card,
              borderRadius: '10px', // paired exception with the 12px track
              transition: transitions.fast,
              border: `1px solid ${theme.border}`,
            }}
          />
        </label>
      </div>
      {label && (
        <label
          htmlFor={toggleId}
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
