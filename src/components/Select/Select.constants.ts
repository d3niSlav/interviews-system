import { Props, Props as ReactSelectProps, StylesConfig } from 'react-select';
import { CSSProperties } from 'react';

export type SelectProps = ReactSelectProps & {
  errorMessage?: string;
  noOptionsText?: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export const getSelectCSSPropertiesOverrides = (menuIsOpen = false, isFocused = false, hasErrors = false): Props => {
  const borderColor = menuIsOpen ? '#1a1721' : hasErrors ? '#ff3e3e' : isFocused ? '#1d60ff' : '#6d7381';

  return {
    borderRadius: 0,
    border: 0,
    borderBottom: `2px solid ${borderColor}`,
    borderColor,
    backgroundColor: menuIsOpen ? '#1a1721' : 'transparent',
    boxShadow: menuIsOpen || isFocused ? '0 4px 11px 0 rgba(0, 0, 0, 0.12)' : 'none',
    transition: 'border-color 0.2s',
    '&:hover': {
      borderColor: menuIsOpen ? '#1a1721' : hasErrors ? '#a40000' : '#1f3e8c',
    },
  };
};

export const SELECT_CUSTOM_STYLES: StylesConfig = {
  singleValue: (provided) => ({
    ...provided,
    color: '#ffffff',
    fontSize: '0.8rem',
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
    fontSize: '0.8rem',
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
    fontSize: '0.8rem',
    border: 'solid 1px #3a3e4f',
    borderRadius: 0,
    boxShadow: '0 2px 14px 0 rgba(25, 22, 32, 0.52), 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: '#28272f',
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: '12px',
    backgroundColor: '#515562',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    paddingLeft: '10px',
    color: '#ffffff',
    fontSize: '0.8rem',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    marginLeft: '2px',
    paddingLeft: '2px',
    paddingRight: '10px',
    borderRadius: '0 12px 12px 0',
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
    backgroundColor: state.isFocused ? '#23232a' : state.isSelected ? '#1a1721' : provided.backgroundColor,
    transition: 'background-color 0.2s',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#7f848c',
    fontSize: '12px',
  }),
};
