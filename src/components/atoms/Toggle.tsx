import { colors, spacing, accessibility, fontFamilies, fontWeights, transitions } from '../../../tokens';
import React from 'react';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
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
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
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
          display: 'flex',
          alignItems: 'center',
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
            backgroundColor: checked ? colors.light.primaryStrong : colors.light.switchBackground,
            border: `2px solid ${colors.light.border}`,
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
              backgroundColor: colors.light.card,
              borderRadius: '10px',
              transition: transitions.fast,
              border: `1px solid ${colors.light.border}`,
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
