import React, { CSSProperties, FunctionComponent } from 'react';
import ReactSelect, { StylesConfig } from 'react-select';

import { getSelectCSSPropertiesOverrides, SELECT_CUSTOM_STYLES, SelectProps } from './Select.constants';
import Label from '../Label';

import styles from './Select.module.scss';

const Select: FunctionComponent<SelectProps> = ({
  autoFocus = false,
  className,
  classNamePrefix,
  errorMessage,
  isDisabled = false,
  isMulti = false,
  isSearchable = false,
  name,
  noOptionsMessage,
  noOptionsText,
  onChange,
  options = [],
  placeholder,
  required,
  title,
  value,
}) => {
  const getNoOptionsText = (): string | null => (noOptionsText ? noOptionsText : null);

  const selectStyles: StylesConfig = {
    ...SELECT_CUSTOM_STYLES,
    control: (provided, state) => ({
      ...provided,
      ...(getSelectCSSPropertiesOverrides(state.menuIsOpen, state.isFocused, !!errorMessage) as CSSProperties),
    }),
  };

  return (
    <Label error={errorMessage} title={title} fullWidth required={required}>
      <div className={styles.selectWrapper}>
        <ReactSelect
          styles={selectStyles}
          autoFocus={autoFocus}
          className={className}
          classNamePrefix={classNamePrefix}
          isDisabled={isDisabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
          name={name}
          options={options}
          placeholder={placeholder}
          required={required}
          noOptionsMessage={noOptionsText ? getNoOptionsText : noOptionsMessage}
          value={value}
          onChange={onChange}
          openMenuOnFocus={true}
          tabSelectsValue={false}
        />
      </div>
    </Label>
  );
};

export default Select;
