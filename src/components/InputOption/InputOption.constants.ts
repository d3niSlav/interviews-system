import { BaseInputProps } from '../Input';

export interface InputOptionData {
  label: string;
  value?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export type InputOptionType = 'checkbox' | 'radio';

export type InputOptionProps = Partial<Omit<BaseInputProps, 'size'>> & {
  inline?: boolean;
  label?: string;
  checked?: boolean;
  inputType: InputOptionType;
};
