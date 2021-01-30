import React, { FunctionComponent } from 'react';

import { FormControlElementProps, FormValue } from '../Form.constants';
import Select, { SelectOption, SelectOptionType } from '../../Select';

type SelectFieldProps = {
  control: FormControlElementProps;
  inputChangedHandler: (name: string, value: FormValue) => void;
};

const SelectField: FunctionComponent<SelectFieldProps> = ({ control, inputChangedHandler }) => {
  const {
    error,
    fieldType,
    id,
    label,
    multiple,
    name,
    options = [],
    required,
    searchable,
    touched,
    valid,
    validations,
    value,
    ...elementProps
  } = control;

  const selectedOption = multiple
    ? (options as SelectOption[]).filter(
        (option) => Array.isArray(value) && (value as (number | string)[]).includes(option.value),
      )
    : (options as SelectOption[]).filter((option) => option.value === value);

  const handleOnChange = (name: string, selectedValue: SelectOptionType | SelectOptionType[]): void => {
    let value: FormValue = multiple ? [] : '';

    if (selectedValue) {
      if (multiple && Array.isArray(selectedValue)) {
        value = (selectedValue as SelectOptionType[]).map((option: SelectOptionType) => option.value);
      } else {
        value = (selectedValue as SelectOptionType).value;
      }
    }

    inputChangedHandler(name, value);
  };

  return (
    <div key={`${fieldType}-${id}`}>
      <Select
        id={id}
        name={id || name}
        isSearchable={searchable}
        isMulti={multiple}
        required={required || !!validations?.required}
        title={label}
        error={touched && !valid ? error : ''}
        value={selectedOption}
        options={options as SelectOptionType[]}
        onValueChanged={handleOnChange}
        {...elementProps}
      />
    </div>
  );
};

export default SelectField;
