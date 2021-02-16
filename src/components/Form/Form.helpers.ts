import { FieldMetaState, FieldRenderProps, useField } from 'react-final-form';

// export const getErrorMessage = (value?: FormValue, validations?: FormControlValidations): string => {
//   let errorMessage = '';
//
//   if (validations) {
//     if (typeof value === 'string') {
//       if (validations.required && !value) {
//         errorMessage = validations.required.errorText;
//       }
//
//       if (value && validations.regex && !validations.regex.rule.test(value)) {
//         errorMessage = validations.regex.errorText;
//       }
//     } else if (Array.isArray(value)) {
//       if (validations.required && value.length === 0) {
//         errorMessage = validations.required.errorText;
//       }
//     } else if (typeof value === 'boolean') {
//       if (validations.required && !value) {
//         errorMessage = validations.required.errorText;
//       }
//     }
//   }
//
//   return errorMessage;
// };

export type ShowErrorFunc = (props: ShowErrorProps) => boolean;

export interface ShowErrorProps {
  meta: FieldMetaState<unknown>;
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
