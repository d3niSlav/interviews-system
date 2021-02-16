import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange, useFieldForErrors } from '../Form.helpers';
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
    size,
    fullWidth = true,
    required,
    options = [],
    name,
    title,
    showError = showErrorOnChange,
    ...restRadioInput
  } = props;
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <Label
      title={title}
      error={typeof isError === 'string' ? isError : ''}
      fullWidth={fullWidth}
      size={size}
      groupedElement
      required={required}
    >
      {options.map((item, index) => (
        <Field
          type="radio"
          key={`${name}-${index}`}
          name={name}
          value={item.value}
          render={({ input: { name, value, onChange, checked, ...restInput } }) => (
            <InputOption
              inputType="radio"
              label={item.label}
              name={name}
              value={value}
              onChange={onChange}
              checked={checked}
              disabled={item.disabled}
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
