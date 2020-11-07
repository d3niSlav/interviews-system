import { BaseInputProps } from '../Input';

export interface RadioButtonOption {
  label: string;
  value: string | number;
}

type RadioButtonsSpecificProps = {
  hasFirstOptionAsDefault?: boolean;
  inline?: boolean;
  options?: RadioButtonOption[];
};

export type RadioButtonsProps = RadioButtonsSpecificProps & BaseInputProps;
