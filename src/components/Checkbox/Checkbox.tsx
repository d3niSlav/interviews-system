import React, { FunctionComponent } from 'react';

import { CheckboxInputOption, CheckboxProps } from './Checkbox.constants';
import CheckboxGroup from './CheckboxGroup';

const Checkbox: FunctionComponent<CheckboxProps> = ({ label, name, value, ...groupProps }) => {
  const options: CheckboxInputOption[] = [{ label, name, value }];

  return <CheckboxGroup name={name} options={options} {...groupProps} />;
};

export default Checkbox;
