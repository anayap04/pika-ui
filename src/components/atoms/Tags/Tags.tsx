import { theme, spacing, fontFamilies, fontWeights, transitions, glyphs } from '../../../tokens';
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
        // Documented radius exception: 4px, a small softening on the 1px-bordered
        // chip. Everything else in the system is 0.
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          style={{
            marginLeft: spacing.xs,
            padding: 0,
            border: 'none',
            borderRadius: 0,
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
            // Match the tag's VT323 face — the global `button` rule sets Press
            // Start 2P, and its single 400 weight keeps the × glyph crisp
            // (asking for bold makes the browser fake it and smear the pixels).
            fontFamily: fontFamilies.subheading,
            fontSize: '16px',
            fontWeight: fontWeights.normal,
            lineHeight: 1,
            transition: transitions.fast,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
          }}
          aria-label={`Remove ${label} tag`}
        >
          {glyphs.remove}
        </button>
      )}
    </span>
  );
};
