import { BaseInputProps } from '../Input';

export type CheckboxInputOption = {
  label?: string;
  name: string;
  value?: boolean;
};

export type CheckboxProps = BaseInputProps & CheckboxInputOption;
