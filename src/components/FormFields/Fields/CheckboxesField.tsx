import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange, useFieldForErrors } from '../FormFields.helpers';
import { BaseInputProps } from '../../Input';
import InputOption, { InputOptionData, InputOptionProps } from '../../InputOption';
import Label from '../../Label';

type InputOptionsProps = InputOptionProps &
  BaseInputProps & {
    data?: InputOptionData | InputOptionData[];
  };

export type CheckboxesFieldProps = Partial<Omit<InputOptionsProps, 'type' | 'onChange'>> & {
  name: string;
  fieldProps?: Partial<FieldProps<InputOptionsProps, FieldRenderProps<InputOptionsProps>>>;
  showError?: ShowErrorFunc;
};

export function CheckboxesField(props: CheckboxesFieldProps): ReactElement {
  const {
    data,
    fullWidth = true,
    name,
    required,
    showError = showErrorOnChange,
    size,
    title,
    ...restCheckboxes
  } = props;
  const itemsData: InputOptionData[] = data ? (!Array.isArray(data) ? [data] : data) : [{ label: '', value: name }];
  const single = itemsData.length === 1;
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <Label
      error={typeof isError === 'string' ? isError : ''}
      fullWidth={fullWidth}
      groupedElement={!single}
      required={required}
      size={size}
      title={title}
    >
      {itemsData.map((item, index) => (
        <Field
          key={`${name}-${index}`}
          name={name}
          type="checkbox"
          value={single ? undefined : item.value}
          render={({ input: { name, value, onChange, checked, ...restInput } }) => (
            <InputOption
              checked={checked}
              disabled={item.disabled}
              inputType="checkbox"
              label={item.label}
              name={name}
              onChange={onChange}
              value={value}
              {...restCheckboxes}
              {...restInput}
            />
          )}
        />
      ))}
    </Label>
  );
}

export default CheckboxesField;
