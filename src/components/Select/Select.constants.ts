import { OptionTypeBase, Props, Props as ReactSelectProps, StylesConfig } from 'react-select';
import { CSSProperties } from 'react';

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
  const borderColor = menuIsOpen ? '#27262e' : hasErrors ? '#ff3e3e' : isFocused ? '#1d60ff' : '#6d7381';

  return {
    borderRadius: 0,
    border: 0,
    borderBottom: `2px solid ${borderColor}`,
    borderColor,
    backgroundColor: menuIsOpen || isFocused ? '#27262e' : 'transparent',
    boxShadow: menuIsOpen || isFocused ? '0 4px 11px 0 rgba(0, 0, 0, 0.12)' : 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
    '&:hover': {
      borderColor: menuIsOpen ? '#27262e' : hasErrors ? '#a40000' : '#1f3e8c',
    },
  };
};

export const SELECT_CUSTOM_STYLES: StylesConfig<SelectOptionType, boolean> = {
  singleValue: (provided) => ({
    ...provided,
    color: '#ffffff',
    fontSize: '1rem',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#b4b6bb',
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#ffffff',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#b4b6bb',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#ffffff',
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
    color: '#ffffff',
    fontSize: '1rem',
    border: 'solid 1px #3a3e4f',
    borderRadius: 0,
    boxShadow: '0 2px 15px 0 rgba(25, 22, 32, 0.52), 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: '#28272f',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: '13px',
    backgroundColor: '#515562',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    paddingLeft: '11px',
    color: '#ffffff',
    fontSize: '1rem',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    marginLeft: '2px',
    paddingLeft: '2px',
    paddingRight: '11px',
    borderRadius: '0 13px 13px 0',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#28272f',
      color: '#ffffff',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px 6px',
    backgroundColor: state.isFocused ? '#23232a' : state.isSelected ? '#1a1721' : provided.backgroundColor,
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#7f848c',
    fontSize: '14px',
  }),
};
