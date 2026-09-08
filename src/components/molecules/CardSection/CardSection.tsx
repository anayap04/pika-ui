import { theme, spacing } from '../../../tokens';
import React from 'react';
import { Card } from '../../atoms/Card';

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerBackground?: string;
  footerBackground?: string;
  variant?: 'default' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const paddingStyles = {
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
};

export const CardSection: React.FC<CardSectionProps> = ({
  header,
  footer,
  // Default to the muted band, not the decorative `secondary` blue: dark
  // `foreground` header/footer content on #5c94fc is only 3:1 (fails AAA and AA),
  // whereas on #f5f5f5 it clears 7:1. Callers passing light-on-dark content can
  // still override with `secondaryStrong` etc.
  headerBackground = theme.muted,
  footerBackground = theme.muted,
  variant = 'default',
  padding = 'md',
  children,
  style,
  ...props
}) => {
  const paddingValue = paddingStyles[padding];

  return (
    <Card variant={variant} style={style} {...props}>
      {header && (
        <div
          style={{
            padding: paddingValue,
            backgroundColor: headerBackground,
            borderBottom: `1px solid ${theme.border}`,
            marginBottom: paddingValue,
          }}
        >
          {header}
        </div>
      )}

      <div style={{ padding: paddingValue }}>
        {children}
      </div>

      {footer && (
        <div
          style={{
            padding: paddingValue,
            backgroundColor: footerBackground,
            borderTop: `1px solid ${theme.border}`,
            marginTop: paddingValue,
          }}
        >
          {footer}
        </div>
      )}
    </Card>
  );
};
