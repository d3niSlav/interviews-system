import React, { FocusEvent, FunctionComponent, useState } from 'react';

import { InputProps } from './Input.constants';

import styles from './Input.module.scss';

const Input: FunctionComponent<InputProps> = ({
  append,
  disabled,
  error,
  inputComponent = 'input',
  fullWidth = false,
  placeholder,
  size = 'medium',
  value,
  onFocus,
  onBlur,
  ...others
}) => {
  const [focused, setFocused] = useState(false);
  const elementWrapperClasses = [styles.inputWrapper, styles[size]];
  const InputElement = inputComponent;

  if (focused) {
    elementWrapperClasses.push(styles.focused);
  }

  if (disabled) {
    elementWrapperClasses.push(styles.disabled);
  }

  if (error) {
    elementWrapperClasses.push(styles.error);
  }

  if (fullWidth) {
    elementWrapperClasses.push(styles.fullWidth);
  }

  const handleOnFocus = (event: FocusEvent<HTMLElement>) => {
    if (onFocus) {
      onFocus(event);
    }

    setFocused(true);
  };

  const handleOnBlur = (event: FocusEvent<HTMLElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    setFocused(false);
  };

  return (
    <div className={elementWrapperClasses.join(' ')}>
      <InputElement
        className={styles.inputElement}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...others}
      />
      {append && <div className={styles.append}>{append}</div>}
    </div>
  );
};

export default Input;
