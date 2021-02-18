import { OptionTypeBase, Props, Props as ReactSelectProps, StylesConfig } from 'react-select';
import { CSSProperties } from 'react';

import {
  ACCENT_COLOR,
  ACCENT_COLOR_DARK,
  BACKGROUND_COLOR,
  BACKGROUND_CONTRAST_COLOR,
  BACKGROUND_CONTRAST_DARK_COLOR,
  TEXT_COLOR,
} from '../../shared/constants';

export type SelectProps = ReactSelectProps<SelectOptionType, boolean> & {
  errorMessage?: string;
  noOptionsText?: string;
};

export type SelectOptionValue = number | string;

export interface SelectOption {
  label: string;
  value: SelectOptionValue;
}

export type SelectOptionType = OptionTypeBase & SelectOption;

export const getSelectCSSPropertiesOverrides = (menuIsOpen = false, isFocused = false, hasErrors = false): Props => {
  const borderColor = menuIsOpen
    ? BACKGROUND_CONTRAST_COLOR
    : hasErrors
    ? '#ff3e3e'
    : isFocused
    ? ACCENT_COLOR
    : '#6d7381';

  return {
    borderRadius: 0,
    border: 0,
    borderBottom: `2px solid ${borderColor}`,
    borderColor,
    backgroundColor: menuIsOpen || isFocused ? BACKGROUND_CONTRAST_COLOR : 'transparent',
    boxShadow: menuIsOpen || isFocused ? '0 4px 11px 0 rgba(0, 0, 0, 0.12)' : 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
    '&:hover': {
      borderColor: menuIsOpen ? ACCENT_COLOR_DARK : hasErrors ? '#a40000' : ACCENT_COLOR_DARK,
    },
  };
};

export const SELECT_CUSTOM_STYLES: StylesConfig<SelectOptionType, boolean> = {
  singleValue: (provided) => ({
    ...provided,
    color: TEXT_COLOR,
    fontSize: '1rem',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: TEXT_COLOR,
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover': {
      color: ACCENT_COLOR_DARK,
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: TEXT_COLOR,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover': {
      color: ACCENT_COLOR_DARK,
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: '4px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  control: (provided, state) => ({
    ...provided,
    ...(getSelectCSSPropertiesOverrides(state.menuIsOpen, state.isFocused) as CSSProperties),
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
    color: TEXT_COLOR,
    fontSize: '1rem',
    border: `1px solid ${BACKGROUND_CONTRAST_DARK_COLOR}`,
    borderRadius: 0,
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: BACKGROUND_CONTRAST_COLOR,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: '13px',
    border: `1px solid ${BACKGROUND_CONTRAST_DARK_COLOR}`,
    backgroundColor: BACKGROUND_COLOR,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    paddingLeft: '11px',
    color: TEXT_COLOR,
    fontSize: '1rem',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    marginLeft: '2px',
    paddingLeft: '2px',
    paddingRight: '11px',
    borderRadius: '0 13px 13px 0',
    color: TEXT_COLOR,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: BACKGROUND_CONTRAST_COLOR,
      color: ACCENT_COLOR_DARK,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px 6px',
    backgroundColor: state.isFocused
      ? BACKGROUND_CONTRAST_DARK_COLOR
      : state.isSelected
      ? ACCENT_COLOR
      : provided.backgroundColor,
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#7f848c',
    fontSize: '14px',
  }),
};
