import { FieldMetaState, FieldRenderProps, useField } from 'react-final-form';

export type ShowErrorFunc = (props: ShowErrorProps) => boolean;

export interface ShowErrorProps {
  meta: FieldMetaState<unknown>;
}

export interface FormError {
  [key: string]: string | string[];
}

export const showErrorOnChange: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}: ShowErrorProps) => !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified));

export const showErrorOnBlur: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched },
}: ShowErrorProps) => !!(((submitError && !dirtySinceLastSubmit) || error) && touched);

const config = {
  subscription: {
    error: true,
    submitError: true,
    dirtySinceLastSubmit: true,
    touched: true,
    modified: true,
  },
};

export const useFieldForErrors = <FieldValue, T extends HTMLElement = HTMLElement>(
  name: string,
): FieldRenderProps<FieldValue, T> => useField(name, config);
