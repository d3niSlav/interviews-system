import { ChangeEventHandler, FocusEventHandler } from 'react';

export type InputComponent = 'input' | 'textarea';

export type InputSize = 'small' | 'medium' | 'large';

export type TextAreaSpecificProps = {
  cols?: number;
  rows?: number;
};

export type BaseInputProps = {
  autofocus?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  fullWidth?: boolean;
  id?: string;
  name?: string;
  onBlur?: FocusEventHandler<HTMLElement>;
  onChange?: ChangeEventHandler<HTMLElement>;
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
