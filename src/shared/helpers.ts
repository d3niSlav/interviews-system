export interface ErrorResponseDto {
  errorMessage: string;
  errors: {
    [key: string]: string[];
  };
}

export interface FormErrors {
  [key: string]: string;
}

export const mapRequestErrors = (errorResponse: ErrorResponseDto, defaultErrorKey = 'name'): FormErrors => {
  const { errorMessage, errors } = errorResponse;
  const formErrors: FormErrors = {};

  if (errors) {
    Object.keys(errors).forEach((errorKey: string) => {
      formErrors[errorKey] = errors[errorKey][0];
    });
  }

  if (Object.keys(formErrors).length === 0 && errorMessage) {
    formErrors[defaultErrorKey] = errorMessage;
  }

  return formErrors;
};
