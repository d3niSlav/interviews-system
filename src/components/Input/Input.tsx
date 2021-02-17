import React, { FunctionComponent } from 'react';

import { InputProps } from './Input.constants';

import styles from './Input.module.scss';

const Input: FunctionComponent<InputProps> = ({
  error,
  inputComponent = 'input',
  fullWidth = false,
  placeholder,
  size = 'medium',
  value,
  ...others
}) => {
  const elementClasses = [styles.inputElement];
  const elementWrapperClasses = [styles.inputWrapper, styles[size]];
  const InputElement = inputComponent;

  if (error) {
    elementClasses.push(styles.error);
  }

  if (fullWidth) {
    elementWrapperClasses.push(styles.fullWidth);
  }

  return (
    <div className={elementWrapperClasses.join(' ')}>
      <InputElement className={elementClasses.join(' ')} placeholder={placeholder} value={value} {...others} />
    </div>
  );
};

export default Input;
