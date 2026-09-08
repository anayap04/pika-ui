import { theme, spacing, fontFamilies } from '../../../tokens';
import React, { useId } from 'react';

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: CheckboxOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { gap: spacing.sm },
  md: { gap: spacing.md },
  lg: { gap: spacing.lg },
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  values = [],
  onChange,
  orientation = 'vertical',
  size = 'md',
  style,
  ...props
}) => {
  const generatedId = useId();

  const handleChange = (optionValue: string, checked: boolean) => {
    const newValues = checked
      ? [...values, optionValue]
      : values.filter((v) => v !== optionValue);
    onChange?.(newValues);
  };

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
        const checkboxId = `${generatedId}-${option.value}`;
        const isChecked = values.includes(option.value);
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
              type="checkbox"
              id={checkboxId}
              value={option.value}
              checked={isChecked}
              onChange={(e) => handleChange(option.value, e.target.checked)}
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
