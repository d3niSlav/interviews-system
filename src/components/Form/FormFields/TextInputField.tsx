import React, { FocusEvent, FunctionComponent } from 'react';

import { FormControlElementProps } from '../Form.constants';
import TextInput from '../../TextInput';

type TextInputFieldProps = {
  control: FormControlElementProps;
  inputChangedHandler: (name: string, value: string) => void;
};

const TextInputField: FunctionComponent<TextInputFieldProps> = ({ control, inputChangedHandler }) => {
  const { id, error, fieldType, label, touched, valid, validations, value, ...elementProps } = control;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    inputChangedHandler(name, value);
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    inputChangedHandler(name, value);
  };

  return (
    <div key={`${fieldType}-${id}`}>
      <TextInput
        id={id}
        required={!!validations?.required}
        title={label}
        error={touched && !valid ? error : ''}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={value as string}
        {...elementProps}
      />
    </div>
  );
};

export default TextInputField;
