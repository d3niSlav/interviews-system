import { CSSObjectWithLabel, Props as ReactSelectProps, StylesConfig } from 'react-select';
import { CSSProperties } from 'react';

import { LabelProps } from '../Label';
import {
  ACCENT_COLOR,
  ACCENT_COLOR_DARK,
  BACKGROUND_COLOR,
  BACKGROUND_CONTRAST_COLOR,
  BACKGROUND_CONTRAST_DARK_COLOR,
  TEXT_COLOR,
} from '../../shared/constants';

export type SelectOptionValue = number | string;

export interface SelectOption {
  label: string;
  value: SelectOptionValue;
}

export type Option = SelectOption | SelectOption[] | SelectOptionValue | SelectOptionValue[];

export type SelectProps = ReactSelectProps<Option, boolean> &
  LabelProps & {
    errorMessage?: string;
    noOptionsText?: string;
  };

export const getSelectCSSPropertiesOverrides = (
  menuIsOpen = false,
  isFocused = false,
  hasErrors = false,
): CSSObjectWithLabel => {
  const borderColor = menuIsOpen
    ? BACKGROUND_CONTRAST_COLOR
    : hasErrors
    ? '#ff3e3e'
    : isFocused
    ? ACCENT_COLOR
    : '#6d7381';

  return {
    minHeight: '28px',
    borderRadius: 0,
    border: 0,
    borderBottom: `2px solid ${borderColor}`,
    borderColor,
    backgroundColor: menuIsOpen || isFocused ? BACKGROUND_CONTRAST_COLOR : '#e8edff',
    boxShadow: menuIsOpen || isFocused ? '0 4px 11px 0 rgba(0, 0, 0, 0.12)' : 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
    '&:hover': {
      borderColor: menuIsOpen ? ACCENT_COLOR_DARK : hasErrors ? '#a40000' : ACCENT_COLOR_DARK,
    },
  };
};

export const SELECT_CUSTOM_STYLES: StylesConfig<Option> = {
  singleValue: (provided) => ({
    ...provided,
    color: TEXT_COLOR,
    fontSize: '0.8rem',
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
    fontSize: '0.8rem',
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
  input: (provided) => ({
    ...provided,
    fontSize: '0.75rem',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    maxHeight: '30px',
    padding: '8px 0 6px',
  }),
  indicatorSeparator: (provided, state) => {
    if (state.isMulti && state.getValue().length > 0) {
      return {
        ...provided,
        height: '16px',
        margin: 0,
        background: BACKGROUND_CONTRAST_DARK_COLOR,
      };
    } else {
      return { display: 'none' };
    }
  },
  control: (provided, state) => ({
    ...provided,
    ...(getSelectCSSPropertiesOverrides(state.menuIsOpen, state.isFocused) as CSSProperties),
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
    color: TEXT_COLOR,
    fontSize: '0.8rem',
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
    borderRadius: '2px',
    border: '1px solid #6d7381',
    backgroundColor: BACKGROUND_COLOR,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    paddingLeft: '5px',
    color: TEXT_COLOR,
    fontFamily: `'Rubik', sans-serif`,
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'default',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    padding: '0 2px',
    color: TEXT_COLOR,
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'background-color 0.2s, color 0.2s',
    '&:hover': {
      color: TEXT_COLOR,
      backgroundColor: '#dbdde4',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '5px 6px',
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
    color: '#545454',
    fontSize: '0.75rem',
  }),
};
