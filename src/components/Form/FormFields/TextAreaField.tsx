import React, { FocusEvent, FunctionComponent } from 'react';

import { FormControlElementProps } from '../Form.constants';
import TextArea from '../../TextArea';

type TextAreaFieldProps = {
  control: FormControlElementProps;
  inputChangedHandler: (name: string, value: string) => void;
};

const TextAreaField: FunctionComponent<TextAreaFieldProps> = ({ control, inputChangedHandler }) => {
  const { id, error, fieldType, label, touched, valid, validations, value, ...elementProps } = control;

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    inputChangedHandler(name, value);
  };

  const handleOnBlur = (event: FocusEvent<HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    inputChangedHandler(name, value);
  };

  return (
    <div key={`${fieldType}-${id}`}>
      <TextArea
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

export default TextAreaField;
