import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange, useFieldForErrors } from '../Form.helpers';
import Select, { SelectProps } from '../../Select';

export type SelectFieldProps = Partial<Omit<SelectProps, 'type' | 'onChange'>> & {
  name: string;
  fieldProps?: Partial<FieldProps<SelectProps, FieldRenderProps<SelectProps>>>;
  showError?: ShowErrorFunc;
};

export function SelectField(props: SelectFieldProps): ReactElement {
  const { name, isMulti: multiple, showError = showErrorOnChange, ...selectProps } = props;
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <Field
      name={name}
      render={({ input: { name, value, onChange, ...restSelect } }) => {
        const finalValue = multiple && !value ? [] : value;

        return (
          <Select
            name={name}
            error={isError}
            value={finalValue}
            isMulti={multiple}
            onChange={onChange}
            {...restSelect}
            {...selectProps}
          />
        );
      }}
    />
  );
}

export default SelectField;
