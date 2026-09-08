import { theme, spacing, fontFamilies, fontWeights } from '../../../tokens';
import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  onRemove?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'muted';
  removable?: boolean;
  icon?: React.ReactNode;
}

const variantStyles = {
  primary: {
    background: theme.primaryStrong,
    color: theme.primaryForeground,
    border: `1px solid ${theme.border}`,
  },
  secondary: {
    background: theme.secondaryStrong,
    color: theme.secondaryForeground,
    border: `1px solid ${theme.border}`,
  },
  accent: {
    background: theme.accentStrong,
    color: theme.accentForeground,
    border: `1px solid ${theme.border}`,
  },
  destructive: {
    background: theme.destructiveStrong,
    color: theme.destructiveForeground,
    border: `1px solid ${theme.border}`,
  },
  muted: {
    background: theme.muted,
    color: theme.mutedForeground,
    border: `1px solid ${theme.border}`,
  },
};

export const Tag: React.FC<TagProps> = ({
  label,
  onRemove,
  variant = 'primary',
  removable = false,
  icon,
  style,
  ...props
}) => {
  return (
    <span
      style={{
        fontFamily: fontFamilies.subheading,
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing.xs,
        padding: `${spacing.xs} ${spacing.sm}`,
        fontSize: '12px',
        fontWeight: fontWeights.normal,
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          style={{
            marginLeft: spacing.xs,
            padding: 0,
            border: 'none',
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
          }}
          aria-label={`Remove ${label} tag`}
        >
          ×
        </button>
      )}
    </span>
  );
};
