import React, { FunctionComponent } from 'react';

import { FormControlElementProps } from '../Form.constants';
import RadioButtons, { RadioButtonOption } from '../../RadioButtons';

type RadioInputsFieldProps = {
  control: FormControlElementProps;
  inputChangedHandler: (name: string, value: string) => void;
};

const RadioInputsField: FunctionComponent<RadioInputsFieldProps> = ({ control, inputChangedHandler }) => {
  const { id, error, fieldType, label, options, touched, valid, validations, value, ...elementProps } = control;
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    inputChangedHandler(name, value);
  };

  return (
    <div key={`${fieldType}-${id}`}>
      <RadioButtons
        id={id}
        error={touched && !valid ? error : ''}
        hasFirstOptionAsDefault={false}
        onChange={handleOnChange}
        options={options as RadioButtonOption[]}
        required={!!validations?.required}
        title={label}
        value={value as string}
        {...elementProps}
      />
    </div>
  );
};

export default RadioInputsField;
