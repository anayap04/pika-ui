import { colors, spacing, fontFamilies, fontWeights } from '../../../tokens';
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
    background: colors.light.primaryStrong,
    color: colors.light.primaryForeground,
    border: `1px solid ${colors.light.border}`,
  },
  secondary: {
    background: colors.light.secondaryStrong,
    color: colors.light.secondaryForeground,
    border: `1px solid ${colors.light.border}`,
  },
  accent: {
    background: colors.light.accentStrong,
    color: colors.light.accentForeground,
    border: `1px solid ${colors.light.border}`,
  },
  destructive: {
    background: colors.light.destructiveStrong,
    color: colors.light.destructiveForeground,
    border: `1px solid ${colors.light.border}`,
  },
  muted: {
    background: colors.light.muted,
    color: colors.light.mutedForeground,
    border: `1px solid ${colors.light.border}`,
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
