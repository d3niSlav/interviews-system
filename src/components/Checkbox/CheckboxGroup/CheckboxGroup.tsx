import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';

import { CheckboxGroupProps } from './CheckboxGroup.constants';
import CheckboxIcon from './CheckboxIcon';
import { CheckboxInputOption } from '../Checkbox.constants';
import Label from '../../Label';

import styles from './CheckboxGroup.module.scss';

interface CheckboxOptionsState {
  [key: string]: boolean;
}

const CheckboxGroup: FunctionComponent<CheckboxGroupProps> = ({
  disabled = false,
  error,
  fullWidth = true,
  inline = false,
  name,
  onChange,
  options = [],
  size,
  title,
}) => {
  const checkboxOptionClasses = [styles.option];
  const [inputsChecked, setInputsChecked] = useState({} as CheckboxOptionsState);

  if (inline) {
    checkboxOptionClasses.push(styles.inline);
  }

  useEffect(() => {
    setInputsChecked(
      options?.reduce(
        (acc, checkboxOption: CheckboxInputOption) => ({
          ...acc,
          [checkboxOption.name]: !!checkboxOption.value,
        }),
        {},
      ),
    );
  }, [options]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setInputsChecked({
      ...inputsChecked,
      [event.target.name]: event.target.checked,
    });
    onChange && onChange(event);
  };

  const content = options.map(({ label = '', name: checkboxName }) => {
    const labelClasses = [styles.label];

    if (inputsChecked[checkboxName]) {
      labelClasses.push(styles.checked);
    }

    return (
      <label key={`${name}-${checkboxName}`} className={checkboxOptionClasses.join(' ')}>
        <input
          hidden
          type="checkbox"
          name={checkboxName}
          checked={!!inputsChecked[checkboxName]}
          aria-label={label}
          disabled={disabled}
          onChange={handleOnChange}
        />
        <CheckboxIcon isChecked={!!inputsChecked[checkboxName]} />
        {label && (
          <span className={labelClasses.join(' ')} aria-hidden="true">
            {label}
          </span>
        )}
      </label>
    );
  });

  return (
    <Label
      title={title}
      error={typeof error === 'string' ? error : ''}
      fullWidth={fullWidth}
      size={size}
      groupedElement={options?.length > 1}
    >
      {content}
    </Label>
  );
};

export default CheckboxGroup;
