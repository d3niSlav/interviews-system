import { ReactDatePickerProps } from 'react-datepicker';

import { BaseInputProps } from '../Input';

export type DatePickerProps = BaseInputProps & ReactDatePickerProps;

export const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';
