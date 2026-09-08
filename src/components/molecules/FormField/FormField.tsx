import { theme, spacing, fontFamilies, fontWeights } from '../../../tokens';
import React from 'react';

export interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  hint,
  children,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
        ...style,
      }}
      {...props}
    >
      <label
        style={{
          fontFamily: fontFamilies.subheading,
          fontSize: '14px',
          fontWeight: fontWeights.bold,
          color: error ? theme.destructiveStrong : theme.foreground,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xs,
        }}
      >
        {label}
        {required && (
          <span
            style={{
              color: theme.destructiveStrong,
              fontWeight: fontWeights.bold,
            }}
          >
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontFamily: fontFamilies.body,
            fontSize: '12px',
            color: theme.destructiveStrong,
            marginTop: '-4px',
          }}
        >
          {error}
        </span>
      )}
      {hint && !error && (
        <span
          style={{
            fontFamily: fontFamilies.body,
            fontSize: '12px',
            color: theme.mutedForeground,
            marginTop: '-4px',
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
};
