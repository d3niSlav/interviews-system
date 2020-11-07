import React, { FunctionComponent } from 'react';

import { FormControlElementProps, FormOption } from '../Form.constants';
import { CheckboxGroup, CheckboxInputOption } from '../../Checkbox';

type CheckboxFieldProps = {
  control: FormControlElementProps;
  inputChangedHandler: (name: string, value: boolean | string[]) => void;
};

const CheckboxField: FunctionComponent<CheckboxFieldProps> = ({ control, inputChangedHandler }) => {
  const { id, error, fieldType, label, name, options, touched, valid, validations, value, ...elementProps } = control;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name: checkboxOptionName, checked } = event.target;
    let checkedValue: boolean | string[] = checked;

    if (options) {
      const currentValues: string[] = value && Array.isArray(value) ? (value as string[]) : [];
      const checkboxOptionIndex = currentValues.indexOf(checkboxOptionName);

      if (checked && checkboxOptionIndex < 0) {
        currentValues.push(checkboxOptionName);
      } else if (checkboxOptionIndex >= 0) {
        currentValues.splice(checkboxOptionIndex, 1);
      }

      checkedValue = currentValues;
    }

    inputChangedHandler(name, checkedValue);
  };

  let checkboxOptions: FormOption[];
  if (options) {
    checkboxOptions = (options as FormOption[]).map((option) => {
      const { value: optionValue } = option;

      return {
        ...option,
        name: optionValue as string,
        value:
          value && Array.isArray(value) && optionValue
            ? (value as string[]).indexOf(optionValue as string) >= 0
            : false,
      };
    });
  } else {
    checkboxOptions = [{ label: label, name, value: value || false }];
  }

  return (
    <div key={`${fieldType}-${id}`}>
      <CheckboxGroup
        id={id}
        name={name}
        required={!!validations?.required}
        title={label}
        error={touched && !valid ? error : ''}
        options={checkboxOptions as CheckboxInputOption[]}
        onChange={handleOnChange}
        {...elementProps}
      />
    </div>
  );
};

export default CheckboxField;
