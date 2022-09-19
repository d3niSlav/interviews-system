import React, { CSSProperties, FunctionComponent } from 'react';
import ReactSelect, { ClearIndicatorProps, components, DropdownIndicatorProps, StylesConfig } from 'react-select';

import { ReactComponent as CaretDownIcon } from '../../assets/images/svg/caret-down.svg';
import { ReactComponent as ClearIcon } from '../../assets/images/svg/clear.svg';

import {
  getSelectCSSPropertiesOverrides,
  Option,
  SELECT_CUSTOM_STYLES,
  SelectOption,
  SelectProps,
} from './Select.constants';
import Label from '../Label';

import styles from './Select.module.scss';

const Select: FunctionComponent<SelectProps> = ({
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
  ...rest
}) => {
  let selectedValues: Option = [];
  if (Array.isArray(value)) {
    const selected: SelectOption[] = [];

    (value as string[]).forEach((key) => {
      const selectedOption = options.find((option) => (option as SelectOption).value === key);

      if (selectedOption) {
        selected.push(selectedOption as SelectOption);
      }
    });

    selectedValues = selected;
  } else {
    const selectedOption = options.find((option) => (option as SelectOption).value === value);

    if (selectedOption) {
      selectedValues = selectedOption as SelectOption;
    }
  }

  const getNoOptionsText = (): string | null => (noOptionsText ? noOptionsText : null);

  const selectStyles: StylesConfig<Option> = {
    ...SELECT_CUSTOM_STYLES,
    control: (provided, state) => ({
      ...provided,
      ...(getSelectCSSPropertiesOverrides(state.menuIsOpen, state.isFocused, !!errorMessage) as CSSProperties),
    }),
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => {
    const caretClasses = [styles.caret];

    if (props.selectProps.menuIsOpen) {
      caretClasses.push(styles.open);
    }

    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon className={caretClasses.join(' ')} />
      </components.DropdownIndicator>
    );
  };

  const ClearIndicator = (props: ClearIndicatorProps<Option>) => (
    <components.ClearIndicator {...props}>
      <ClearIcon className={styles.clearIcon} />
    </components.ClearIndicator>
  );

  return (
    <Label error={errorMessage} title={title} fullWidth required={required} editable>
      <div className={styles.selectWrapper}>
        <ReactSelect<Option, boolean>
          styles={selectStyles}
          className={className}
          classNamePrefix={classNamePrefix}
          isDisabled={isDisabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
          name={name}
          options={options}
          placeholder={placeholder}
          noOptionsMessage={noOptionsText ? getNoOptionsText : noOptionsMessage}
          value={selectedValues}
          onChange={(selected, action) => {
            if (onChange && selected) {
              const currentValue = Array.isArray(selected)
                ? selected.map((selectedValue) => (selectedValue as SelectOption).value)
                : (selected as SelectOption).value;

              return onChange(currentValue, action);
            }
          }}
          closeMenuOnSelect={!isMulti}
          openMenuOnFocus={true}
          tabSelectsValue={false}
          components={{ DropdownIndicator, ClearIndicator }}
          {...rest}
        />
      </div>
    </Label>
  );
};

export default Select;
