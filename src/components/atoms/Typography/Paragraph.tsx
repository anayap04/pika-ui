import React from 'react';
import { fontFamilies, fontSizes, fontWeights, lineHeights, theme } from '../../../tokens';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'foreground' | 'muted' | 'primary' | 'secondary';
  weight?: 'normal' | 'medium' | 'bold';
}

const sizeMap = {
  sm: fontSizes.sm,
  md: fontSizes.md,
  lg: fontSizes.lg,
};

const colorMap = {
  foreground: theme.foreground,
  muted: theme.mutedForeground,
  primary: theme.primaryStrong,
  secondary: theme.secondaryStrong,
};

export const Paragraph: React.FC<ParagraphProps> = ({
  size = 'md',
  color = 'foreground',
  weight = 'normal',
  style,
  ...props
}) => {
  return (
    <p
      style={{
        fontFamily: fontFamilies.body,
        fontSize: sizeMap[size],
        fontWeight: fontWeights[weight],
        lineHeight: lineHeights.body,
        color: colorMap[color],
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
};
