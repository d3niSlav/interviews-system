import React, { FunctionComponent } from 'react';

import { TextInputProps } from './TextInput.constants';
import Input from '../Input';
import Label from '../Label';

const TextInput: FunctionComponent<TextInputProps> = ({
  error,
  fullWidth = true,
  size,
  required,
  title,
  ...inputProps
}) => (
  <Label
    title={title}
    error={typeof error === 'string' ? error : ''}
    fullWidth={fullWidth}
    size={size}
    required={required}
  >
    <Input {...inputProps} inputComponent="input" error={error} size={size} required={required} />
  </Label>
);

export default TextInput;
