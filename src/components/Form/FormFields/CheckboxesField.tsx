import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange, useFieldForErrors } from '../Form.helpers';
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
    size,
    fullWidth = true,
    required,
    data,
    name,
    title,
    showError = showErrorOnChange,
    ...restCheckboxes
  } = props;
  const itemsData: InputOptionData[] = data ? (!Array.isArray(data) ? [data] : data) : [{ label: '', value: name }];
  const single = itemsData.length === 1;
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <Label
      title={title}
      error={typeof isError === 'string' ? isError : ''}
      fullWidth={fullWidth}
      size={size}
      groupedElement={!single}
      required={required}
    >
      {itemsData.map((item, index) => (
        <Field
          type="checkbox"
          key={`${name}-${index}`}
          name={name}
          value={single ? undefined : item.value}
          render={({ input: { name, value, onChange, checked, ...restInput } }) => (
            <InputOption
              inputType="checkbox"
              label={item.label}
              name={name}
              value={value}
              onChange={onChange}
              checked={checked}
              disabled={item.disabled}
              {...restInput}
              {...restCheckboxes}
            />
          )}
        />
      ))}
    </Label>
  );
}

export default CheckboxesField;
