import { CheckboxInputOption } from '../Checkbox.constants';
import { BaseInputProps } from '../../Input';

type CheckboxGroupSpecificProps = {
  inline?: boolean;
  options?: CheckboxInputOption[];
};

export type CheckboxGroupProps = CheckboxGroupSpecificProps & BaseInputProps;
