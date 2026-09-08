import { colors, spacing } from '../../../tokens';
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
  headerBackground = colors.light.secondary,
  footerBackground = colors.light.secondary,
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
            borderBottom: `1px solid ${colors.light.border}`,
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
            borderTop: `1px solid ${colors.light.border}`,
            marginTop: paddingValue,
          }}
        >
          {footer}
        </div>
      )}
    </Card>
  );
};
