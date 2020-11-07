import React, { FunctionComponent } from 'react';

import { TextAreaProps } from './TextArea.constants';
import Input from '../Input';
import Label from '../Label';

const TextArea: FunctionComponent<TextAreaProps> = ({
  error,
  fullWidth = true,
  rows = 2,
  size,
  title,
  ...inputProps
}) => (
  <Label title={title} error={typeof error === 'string' ? error : ''} fullWidth={fullWidth} size={size}>
    <Input {...inputProps} rows={rows} inputComponent="textarea" error={error} size={size} />
  </Label>
);

export default TextArea;
