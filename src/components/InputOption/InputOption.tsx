import React, { FunctionComponent } from 'react';

import CheckboxIcon from './CheckboxIcon';
import { InputOptionProps } from './InputOption.constants';
import RadioButtonIcon from './RadioButtonIcon';

import styles from './InputOption.module.scss';

const InputOption: FunctionComponent<InputOptionProps> = ({
  label,
  inline,
  name,
  onChange,
  checked = false,
  inputType,
  ...rest
}) => {
  const inputOptionClasses = [styles.option];
  const labelClasses = [styles.label];

  if (inline) {
    inputOptionClasses.push(styles.inline);
  }

  if (checked) {
    labelClasses.push(styles.checked);
  }

  return (
    <label className={inputOptionClasses.join(' ')}>
      <input hidden type={inputType} name={name} checked={checked} aria-label={label} onChange={onChange} {...rest} />
      {inputType === 'checkbox' ? <CheckboxIcon isChecked={checked} /> : <RadioButtonIcon isSelected={checked} />}
      {label && (
        <span className={labelClasses.join(' ')} aria-hidden="true">
          {label}
        </span>
      )}
    </label>
  );
};

export default InputOption;
