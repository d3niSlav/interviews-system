import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange } from '../FormFields.helpers';
import DatePicker, { DatePickerProps } from '../../DatePicker';

type DatePickerWrapperProps = FieldRenderProps<DatePickerProps>;

export interface DatePickerFieldProps extends Partial<Omit<DatePickerProps, 'onChange'>> {
  name: string;
  fieldProps?: Partial<FieldProps<DatePickerProps, DatePickerWrapperProps>>;
  showError?: ShowErrorFunc;
}

export function DatePickerField(props: DatePickerFieldProps): ReactElement {
  const { name, fieldProps, ...rest } = props;

  return (
    <Field
      name={name}
      render={({ input, meta }) => <DatePickerWrapper input={input} meta={meta} name={name} {...rest} />}
      {...fieldProps}
    />
  );
}

function DatePickerWrapper(props: DatePickerWrapperProps) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    showError = showErrorOnChange,
    ...rest
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <DatePicker
      error={isError ? error || submitError : ''}
      fullWidth={true}
      name={name}
      onChange={onChange}
      value={((value as unknown) as string) || undefined}
      {...restInput}
      {...rest}
    />
  );
}
