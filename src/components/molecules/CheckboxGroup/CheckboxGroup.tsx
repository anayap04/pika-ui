import React, { useId } from 'react';
import { ChoiceGroup } from '../ChoiceGroup';

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  options: CheckboxOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  legend?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  values = [],
  onChange,
  orientation = 'vertical',
  size = 'md',
  legend,
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
    <ChoiceGroup
      options={options}
      orientation={orientation}
      size={size}
      legend={legend}
      style={style}
      {...props}
      renderInput={(option, optionId) => (
        <input
          type="checkbox"
          id={optionId || `${generatedId}-${option.value}`}
          value={option.value}
          checked={values.includes(option.value)}
          onChange={(e) => handleChange(option.value, e.target.checked)}
          disabled={option.disabled}
          style={{
            cursor: option.disabled ? 'not-allowed' : 'pointer',
          }}
        />
      )}
    />
  );
};
