import React, { FunctionComponent, MouseEvent } from 'react';

import { ButtonProps } from './Button.constants';

import styles from './Button.module.scss';

const Button: FunctionComponent<ButtonProps> = ({
  disabled = false,
  fullWidth = false,
  onClick,
  outlined = false,
  size = 'medium',
  text,
  type = 'button',
  ...others
}) => {
  const buttonClasses = [styles.button, styles[size]];

  if (outlined) {
    buttonClasses.push(styles.outlined);
  }

  if (fullWidth) {
    buttonClasses.push(styles.fullWidth);
  }

  const onButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (type !== 'submit') {
      event.preventDefault();
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={buttonClasses.join(' ')} disabled={disabled} type={type} onClick={onButtonClick} {...others}>
      {text}
    </button>
  );
};

export default Button;
