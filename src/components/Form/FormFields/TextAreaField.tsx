import React, { ReactElement } from 'react';
import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange } from '../Form.helpers';
import TextArea, { TextAreaProps } from '../../TextArea';

type TextAreaFieldWrapperProps = FieldRenderProps<TextAreaProps>;

export type TextAreaFieldProps = Partial<Omit<TextAreaProps, 'type' | 'onChange'>> & {
  name: string;
  fieldProps?: Partial<FieldProps<TextAreaProps, TextAreaFieldWrapperProps>>;
  showError?: ShowErrorFunc;
};

export function TextAreaField(props: TextAreaFieldProps): ReactElement {
  const { name, fieldProps, ...rest } = props;

  return (
    <Field
      name={name}
      render={({ input, meta }) => <TextAreaFieldWrapper input={input} meta={meta} name={name} {...rest} />}
      {...fieldProps}
    />
  );
}

export function TextAreaFieldWrapper(props: TextAreaFieldWrapperProps): ReactElement {
  const {
    input: { name, value, onChange, ...inputProps },
    meta,
    showError = showErrorOnChange,
    ...others
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <TextArea
      error={isError ? error || submitError : ''}
      name={name}
      onChange={onChange}
      value={(value as unknown) as string}
      {...inputProps}
      {...others}
    />
  );
}
