import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange } from '../FormFields.helpers';
import { INPUT_TYPE_TEXT, TEXT_FIELD_TYPE } from '../../Input';
import TextInput, { TextInputProps } from '../../TextInput';

type TextInputFieldWrapperProps = FieldRenderProps<TextInputProps>;

export type TextInputFieldProps = Partial<Omit<TextInputProps, 'type' | 'onChange'>> & {
  name: string;
  type?: TEXT_FIELD_TYPE;
  fieldProps?: Partial<FieldProps<TextInputProps, TextInputFieldWrapperProps>>;
  showError?: ShowErrorFunc;
};

export function TextInputField(props: TextInputFieldProps): ReactElement {
  const { name, type, fieldProps, ...rest } = props;

  return (
    <Field
      name={name}
      type={type || INPUT_TYPE_TEXT}
      render={({ input, meta }) => <TextFieldWrapper input={input} meta={meta} name={name} type={type} {...rest} />}
      {...fieldProps}
    />
  );
}

export function TextFieldWrapper(props: TextInputFieldWrapperProps): ReactElement {
  const {
    input: { name, value, onChange, ...inputProps },
    meta,
    showError = showErrorOnChange,
    ...others
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <TextInput
      error={isError ? error || submitError : ''}
      name={name}
      onChange={onChange}
      value={value as string}
      {...inputProps}
      {...others}
    />
  );
}
