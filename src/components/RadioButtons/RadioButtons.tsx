import React, { ChangeEvent, FunctionComponent, KeyboardEvent, useEffect, useState } from 'react';

import RadioButtonIcon from './RadioButtonIcon';
import { RadioButtonOption, RadioButtonsProps } from './RadioButtons.constants';
import Label from '../Label';

import styles from './RadioButtons.module.scss';

const RadioButtons: FunctionComponent<RadioButtonsProps> = ({
  disabled = false,
  error,
  fullWidth = true,
  hasFirstOptionAsDefault = true,
  inline = false,
  name,
  onBlur,
  onChange,
  options = [] as RadioButtonOption[],
  required,
  size,
  title,
  value,
}) => {
  const radioButtonsOptionClasses = [styles.option];
  const [selectedValue, setSelectedValue] = useState(undefined as string | undefined);

  if (inline) {
    radioButtonsOptionClasses.push(styles.inline);
  }

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else if (hasFirstOptionAsDefault && options && options.length > 0) {
      setSelectedValue(options[0].value.toString());
    }
  }, [hasFirstOptionAsDefault, options, value]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedValue(event.target.value);
    onChange && onChange(event);
  };

  const content = options.map(({ label = '', value: radioValue }, index: number) => {
    const labelClasses = [styles.label];
    const isSelected = selectedValue === radioValue;

    if (isSelected) {
      labelClasses.push(styles.selected);
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLLabelElement>): void => {
      event.preventDefault();
      event.stopPropagation();

      if (event.key === 'Enter') {
        const currentValue = radioValue.toString();
        setSelectedValue(currentValue);
        onChange && onChange({ target: { name, value: currentValue } } as ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <label
        tabIndex={0}
        onKeyPress={handleKeyPress}
        key={`${name}-${index}`}
        className={radioButtonsOptionClasses.join(' ')}
      >
        <input
          hidden
          type="radio"
          name={name}
          value={radioValue}
          aria-label={label}
          disabled={disabled}
          onChange={handleOnChange}
          onBlur={onBlur}
        />
        <RadioButtonIcon isSelected={isSelected} />
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
      required={required}
    >
      {content}
    </Label>
  );
};

export default RadioButtons;
