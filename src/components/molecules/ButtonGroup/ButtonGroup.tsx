import { spacing } from '../../../tokens';
import React from 'react';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const gapStyles = {
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  orientation = 'horizontal',
  gap = 'sm',
  children,
  style,
  ...props
}) => {
  return (
    <div
      role="group"
      style={{
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        gap: gapStyles[gap],
        flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
