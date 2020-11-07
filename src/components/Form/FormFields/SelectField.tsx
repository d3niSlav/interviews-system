import React, { FunctionComponent } from 'react';
import { ValueType } from 'react-select';

import { FormControlElementProps } from '../Form.constants';
import Select, { SelectOption } from '../../Select';

type SelectFieldProps = {
  control: FormControlElementProps;
  inputChangedHandler: (name: string, value: string | string[]) => void;
};

const SelectField: FunctionComponent<SelectFieldProps> = ({ control, inputChangedHandler }) => {
  const {
    error,
    fieldType,
    id,
    isMulti,
    label,
    name,
    options = [],
    touched,
    valid,
    validations,
    value,
    ...elementProps
  } = control;

  const selectedOption = isMulti
    ? (options as SelectOption[]).filter((option) => Array.isArray(value) && (value as string[]).includes(option.value))
    : (options as SelectOption[]).filter((option) => option.value === value);

  const handleOnChange = (option: ValueType<SelectOption>): void => {
    let value: string | string[] = isMulti ? [] : '';

    if (option) {
      if (isMulti && Array.isArray(option)) {
        value = (option as SelectOption[]).map((option) => option.value);
      } else {
        value = (option as SelectOption).value;
      }
    }

    inputChangedHandler(name, value);
  };

  return (
    <div key={`${fieldType}-${id}`}>
      <Select
        id={id}
        name={name}
        isMulti={isMulti}
        required={!!validations?.required}
        title={label}
        error={touched && valid ? error : ''}
        value={selectedOption}
        options={options as SelectOption[]}
        onChange={handleOnChange}
        {...elementProps}
      />
    </div>
  );
};

export default SelectField;
