import React from 'react';
import { theme, spacing, fontFamilies } from '../../tokens';

export interface ChoiceGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type ChoiceGroupOrientation = 'vertical' | 'horizontal';
export type ChoiceGroupSize = 'sm' | 'md' | 'lg';

export interface ChoiceGroupProps<T extends ChoiceGroupOption>
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  options: T[];
  orientation?: ChoiceGroupOrientation;
  size?: ChoiceGroupSize;
  legend?: string;
  renderInput: (option: T, optionId: string) => React.ReactNode;
}

const sizeStyles: Record<ChoiceGroupSize, { gap: string }> = {
  sm: { gap: spacing.sm },
  md: { gap: spacing.md },
  lg: { gap: spacing.lg },
};

export const ChoiceGroup = <T extends ChoiceGroupOption>({
  options,
  orientation = 'vertical',
  size = 'md',
  legend,
  style,
  renderInput,
  ...props
}: ChoiceGroupProps<T>) => {
  return (
    <fieldset
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        ...sizeStyles[size],
        border: 'none',
        margin: 0,
        padding: 0,
        minWidth: 0,
        ...style,
      }}
      {...props}
    >
      {legend && (
        <legend
          style={{
            fontFamily: fontFamilies.body,
            fontSize: '14px',
            color: theme.foreground,
            marginBottom: spacing.sm,
          }}
        >
          {legend}
        </legend>
      )}
      {options.map((option) => {
        const optionId = `${option.value}-option`;
        return (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              opacity: option.disabled ? 0.6 : 1,
              userSelect: 'none',
            }}
          >
            {renderInput(option, optionId)}
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
    </fieldset>
  );
};
