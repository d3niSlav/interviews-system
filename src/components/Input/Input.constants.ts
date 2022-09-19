import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';

export type InputComponent = 'input' | 'textarea';

export type InputSize = 'small' | 'medium' | 'large';

export const INPUT_TYPE_BUTTON = 'button';
export const INPUT_TYPE_RESET = 'reset';
export const INPUT_TYPE_SUBMIT = 'submit';

export const INPUT_TYPE_CHECKBOX = 'checkbox';

export const INPUT_TYPE_RADIO = 'radio';

export const INPUT_TYPE_COLOR = 'color';

export const INPUT_TYPE_DATE = 'date';
export const INPUT_TYPE_DATETIME_LOCAL = 'datetime-local';
export const INPUT_TYPE_MONTH = 'month';
export const INPUT_TYPE_TIME = 'time';
export const INPUT_TYPE_WEEK = 'week';

export const INPUT_TYPE_EMAIL = 'email';
export const INPUT_TYPE_HIDDEN = 'hidden';
export const INPUT_TYPE_NUMBER = 'number';
export const INPUT_TYPE_PASSWORD = 'password';
export const INPUT_TYPE_TELEPHONE = 'tel';
export const INPUT_TYPE_TEXT = 'text';
export const INPUT_TYPE_URL = 'url';

export const INPUT_TYPE_FILE = 'file';
export const INPUT_TYPE_IMAGE = 'image';

export const INPUT_TYPE_RANGE = 'range';

export type TEXT_FIELD_TYPE =
  | typeof INPUT_TYPE_EMAIL
  | typeof INPUT_TYPE_HIDDEN
  | typeof INPUT_TYPE_NUMBER
  | typeof INPUT_TYPE_PASSWORD
  | typeof INPUT_TYPE_TELEPHONE
  | typeof INPUT_TYPE_TEXT
  | typeof INPUT_TYPE_URL;

export type TextAreaSpecificProps = {
  cols?: number;
  rows?: number;
};

export type BaseInputProps = {
  append?: ReactNode;
  autofocus?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  fullWidth?: boolean;
  id?: string;
  name?: string;
  onBlur?: FocusEventHandler<HTMLElement>;
  onChange?: ChangeEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  placeholder?: string;
  required?: boolean;
  size?: InputSize;
  title?: string;
  value?: string;
};

export type InputProps = BaseInputProps &
  TextAreaSpecificProps & {
    inputComponent: InputComponent;
  };
