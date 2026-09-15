import React, { useId } from 'react';
import { ChoiceGroup } from '../ChoiceGroup';
import { theme } from '../../../tokens';

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
          className="pk-radio"
          style={{
            cursor: option.disabled ? 'not-allowed' : 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            backgroundColor: 'transparent',
            backgroundImage: value === option.value
              ? `radial-gradient(circle, ${theme.primaryStrong} 0 35%, transparent 38%)`
              : 'none',
            border: `2px solid ${theme.border}`,
            borderRadius: '50%',
          }}
        />
      )}
    />
  );
};
