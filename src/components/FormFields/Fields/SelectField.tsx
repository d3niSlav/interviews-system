import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';
import { ValueType } from 'react-select';

import { ShowErrorFunc, showErrorOnChange, useFieldForErrors } from '../FormFields.helpers';
import Select, { SelectOptionType, SelectProps } from '../../Select';

export type SelectFieldProps = Partial<Omit<SelectProps, 'type' | 'onChange'>> & {
  name: string;
  fieldProps?: Partial<FieldProps<SelectProps, FieldRenderProps<SelectProps>>>;
  showError?: ShowErrorFunc;
};

export function SelectField(props: SelectFieldProps): ReactElement {
  const { name, isMulti: multiple, showError = showErrorOnChange, fieldProps, ...selectProps } = props;
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <Field
      name={name}
      render={({ input: { name, value, onChange, ...restSelect }, meta }) => {
        const finalValue = multiple && !value ? [] : value;
        const { error, submitError } = meta;

        return (
          <Select
            errorMessage={isError ? error || submitError : ''}
            isMulti={multiple}
            name={name}
            onChange={onChange}
            value={finalValue as ValueType<SelectOptionType, boolean>}
            {...restSelect}
            {...selectProps}
          />
        );
      }}
      {...fieldProps}
    />
  );
}

export default SelectField;
