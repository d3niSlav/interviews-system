import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange, useFieldForErrors } from '../FormFields.helpers';
import { BaseInputProps } from '../../Input';
import InputOption, { InputOptionData, InputOptionProps } from '../../InputOption';
import Label from '../../Label';

type RadioInputProps = InputOptionProps & BaseInputProps & { options: InputOptionData[] };

export type RadioInputFieldProps = Partial<Omit<RadioInputProps, 'type' | 'onChange'>> & {
  name: string;
  fieldProps?: Partial<FieldProps<RadioInputProps, FieldRenderProps<RadioInputProps>>>;
  showError?: ShowErrorFunc;
};

export function RadioInputField(props: RadioInputFieldProps): ReactElement {
  const {
    fullWidth = true,
    name,
    options = [],
    required,
    showError = showErrorOnChange,
    size,
    title,
    ...restRadioInput
  } = props;
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <Label
      error={typeof isError === 'string' ? isError : ''}
      fullWidth={fullWidth}
      groupedElement
      required={required}
      size={size}
      title={title}
    >
      {options.map((item, index) => (
        <Field
          key={`${name}-${index}`}
          name={name}
          type="radio"
          value={item.value}
          render={({ input: { name, value, onChange, checked, ...restInput } }) => (
            <InputOption
              checked={checked}
              disabled={item.disabled}
              inputType="radio"
              label={item.label}
              name={name}
              onChange={onChange}
              value={value}
              {...restInput}
              {...restRadioInput}
            />
          )}
        />
      ))}
    </Label>
  );
}

export default RadioInputField;
