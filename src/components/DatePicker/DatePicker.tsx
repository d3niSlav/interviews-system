import moment from 'moment';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { DatePickerProps, DEFAULT_DATE_FORMAT } from './DatePicker.constants';
import Label from '../Label';

import styles from './DatePicker.module.scss';

const DatePicker: FunctionComponent<DatePickerProps> = ({
  disabled = false,
  error,
  fullWidth = true,
  name,
  onChange,
  required,
  size = 'medium',
  title,
  value,
}) => {
  const [dateValue, setDateValue] = useState(moment().toDate());
  const dateInputClasses = [styles.inputElement];
  const wrapperClasses = [styles.inputWrapper, styles[size]];

  useEffect(() => {
    const updatedDateValue = moment(value);

    if (updatedDateValue.isValid()) {
      setDateValue(updatedDateValue.toDate());
    }
  }, [value]);

  if (error) {
    dateInputClasses.push(styles.error);
  }

  const handleDateChange = (value: Date): void => {
    setDateValue(value);
    onChange && onChange(({ target: { name, value: value.getTime() } } as unknown) as ChangeEvent<HTMLInputElement>);
  };

  return (
    <Label
      title={title}
      error={typeof error === 'string' ? error : ''}
      fullWidth={fullWidth}
      size={size}
      required={required}
    >
      <ReactDatePicker
        name={name}
        wrapperClassName={wrapperClasses.join(' ')}
        disabled={disabled}
        className={dateInputClasses.join(' ')}
        dateFormat={DEFAULT_DATE_FORMAT}
        selected={dateValue}
        onChange={handleDateChange}
      />
    </Label>
  );
};

export default DatePicker;
