import { theme, spacing, fontFamilies } from '../../../tokens';
import React, { useId } from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { gap: spacing.sm },
  md: { gap: spacing.md },
  lg: { gap: spacing.lg },
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  orientation = 'vertical',
  size = 'md',
  style,
  ...props
}) => {
  const generatedId = useId();

  return (
    <div
      role="group"
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {options.map((option) => {
        const radioId = `${generatedId}-${option.value}`;
        return (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              opacity: option.disabled ? 0.6 : 1,
            }}
          >
            <input
              type="radio"
              id={radioId}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={option.disabled}
              style={{
                cursor: option.disabled ? 'not-allowed' : 'pointer',
              }}
            />
            <span
              style={{
                fontFamily: fontFamilies.body,
                fontSize: '14px',
                color: theme.foreground,
              }}
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
