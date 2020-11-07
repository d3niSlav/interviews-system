import { Props as ReactSelectProps } from 'react-select/src/Select';
import { CheckboxInputOption } from '../Checkbox';
import { SelectOption } from '../Select';
import { RadioButtonOption } from '../RadioButtons';

export interface AdditionalFormAction {
  label: string;
  onClick: () => void;
}

export type FormControlFieldType = 'checkbox' | 'radio' | 'select' | 'text' | 'textarea';

export type FormValue = boolean | string | string[] | number | number[];

export interface FormDataValues {
  [key: string]: FormValue;
}

export interface FormErrors {
  [key: string]: string[];
}

export interface FormControl extends Omit<ReactSelectProps, 'value'> {
  disabled?: boolean;
  error?: string;
  fieldType: FormControlFieldType;
  inline?: boolean;
  label?: string;
  options?: (CheckboxInputOption | FormOption | RadioButtonOption | SelectOption)[];
  placeholder?: string;
  rows?: number;
  validations?: FormControlValidations;
  value?: FormValue;
}

export interface FormConfig {
  [key: string]: FormControl;
}

export interface FormControlProps extends FormControl {
  error?: string;
  touched: boolean;
  valid: boolean;
}

export type FormConfigProps = {
  [key: string]: FormControlProps;
};

export interface FormOption {
  label?: string;
  name: string;
  value: FormValue;
}

export interface FormControlElementProps extends FormControlProps {
  id: string;
  name: string;
  disabled?: boolean;
}

export interface FormControlValidationProps {
  errorText: string;
}

export interface FormControlRegexValidationProps extends FormControlValidationProps {
  rule: RegExp;
}

export interface FormControlValidations {
  required?: FormControlValidationProps;
  regex?: FormControlRegexValidationProps;
}

export type FormProps = {
  actions?: AdditionalFormAction[];
  config: FormConfig;
  errors: FormErrors;
  id: string;
  initialValues?: FormDataValues;
  isLoading?: boolean;
  onSubmit: (data: FormDataValues) => void;
  submitButtonText?: string;
};
