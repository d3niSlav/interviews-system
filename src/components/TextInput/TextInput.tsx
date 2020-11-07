import React, { FunctionComponent } from 'react';

import { TextInputProps } from './TextInput.constants';
import Input from '../Input';
import Label from '../Label';

const TextInput: FunctionComponent<TextInputProps> = ({ error, fullWidth = true, size, title, ...inputProps }) => (
  <Label title={title} error={typeof error === 'string' ? error : ''} fullWidth={fullWidth} size={size}>
    <Input {...inputProps} inputComponent="input" error={error} size={size} />
  </Label>
);

export default TextInput;
