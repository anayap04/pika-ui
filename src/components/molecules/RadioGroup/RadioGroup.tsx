import React, { useId } from 'react';
import { ChoiceGroup } from '../ChoiceGroup';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  legend?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  orientation = 'vertical',
  size = 'md',
  legend,
  style,
  ...props
}) => {
  const generatedId = useId();

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
          type="radio"
          id={optionId || `${generatedId}-${option.value}`}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={option.disabled}
          style={{
            cursor: option.disabled ? 'not-allowed' : 'pointer',
          }}
        />
      )}
    />
  );
};
