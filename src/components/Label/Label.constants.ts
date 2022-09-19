import { InputSize } from '../Input';

export type LabelProps = {
  editable?: boolean;
  error?: string;
  fullWidth?: boolean;
  groupedElement?: boolean;
  required?: boolean;
  showErrors?: boolean;
  size?: InputSize;
  title?: string;
};
